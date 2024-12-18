import json
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrap(url):
    headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"}

    # Requisição GET
    site = requests.get(url, headers=headers)
    if site.status_code == 200:
        soup = BeautifulSoup(site.content, 'html.parser')

        txt_topo = soup.find('div', class_='txtTopo', id='u20').get_text(strip=True) if soup.find('div', class_='txtTopo', id='u20') else None
        total_value = soup.find('span', class_='totalNumb txtMax').get_text(strip=True) if soup.find('span', class_='totalNumb txtMax') else None
        emissao_tag = soup.find('strong', string=' Emissão: ')

        if emissao_tag:
            emissao_text = emissao_tag.find_next('br').previous_sibling.strip()
            emissao_data = re.search(r'\d{2}/\d{2}/\d{4}', emissao_text)
            emissao_data = emissao_data.group(0) if emissao_data else None
        else:
            emissao_data = None
        if emissao_data:
            try:
                
                emissao_data = datetime.strptime(emissao_data, "%d/%m/%Y")
            except ValueError:
                emissao_data = None  
        header = {
            "vendedor": txt_topo,
            "valorTotal": total_value,
            "dataCompra": emissao_data,
        }

        items = []
        tr_elements = soup.find_all('tr', id=re.compile('^Item'))
        
        for row in tr_elements:
            item = {
                "titulo": row.find('span', class_='txtTit').get_text(strip=True) if row.find('span', class_='txtTit') else None,
                "quantidade": row.find('span', class_='Rqtd').get_text(strip=True).replace("Qtde.:", "").strip() if row.find('span', class_='Rqtd') else None,
                "unidade": row.find('span', class_='RUN').get_text(strip=True).replace("UN:", "").strip() if row.find('span', class_='RUN') else None,
                "valor_unitario": row.find('span', class_='RvlUnit').get_text(strip=True).replace("Vl. Unit.:", "").strip() if row.find('span', class_='RvlUnit') else None,
                "valor_total": row.find('span', class_='valor').get_text(strip=True) if row.find('span', class_='valor') else None
            }

            # Tratando os valores para converter de string com vírgula para float
            # if item["valor_total"]:
            #     item["valor_total"] = item["valor_total"].replace(",", ".")  # Substitui a vírgula por ponto
            #     item["valor_total"] = float(item["valor_total"])  # Converte para float

            items.append(item)

            if item["quantidade"]:
                item["quantidade"] = item["quantidade"].replace(",", ".")  
                item["quantidade"] = float(item["quantidade"])  

            items.append(item)
        
        return {
            "header": header,
            "items": items
        }

    else:
        return {"error": f"Erro ao acessar o site: {site.status_code}"}