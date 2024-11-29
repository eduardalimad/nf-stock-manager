import datetime
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .webscraper import scrap
from .models import Compra, Item
from django.utils.dateparse import parse_date
from decimal import Decimal, InvalidOperation

def hello_world(request):
    return JsonResponse({'message': 'Hello, world!'})

@csrf_exempt # type: ignore
def requestScrape(request):
    if request.method == 'POST':
        try:
            # Recebe a URL do corpo da requisição
            data = json.loads(request.body)
            url = data.get('url')

            # Verifica se a URL foi fornecida
            if not url:
                return JsonResponse({"error": "URL não fornecida"}, status=400)

            # Realiza o scraping da URL
            result = scrap(url)

            # Verifica se o resultado contém um erro
            if 'error' in result:
                return JsonResponse(result, status=500)

            # Retorna os dados de scraping (header e items) em formato JSON
            return JsonResponse(result, status=200)

        except Exception as e:
            return JsonResponse({"error": f"Ocorreu um erro: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Método não permitido"}, status=405)

@csrf_exempt # type: ignore
def post_create_view(request):    
    if request.method == 'POST':
        try:
            # Decodificar os dados JSON da requisição
            data = json.loads(request.body)

            # Acessar os dados do header
            vendedor = data['header'].get('vendedor', '')
            valor_total = data['header'].get('valorTotal', '0.0')  # Valor padrão '0.0' caso esteja ausente
            data_compra = data['header'].get('dataCompra', '')  # Valor vazio por padrão

            # Garantir que o valor_total seja uma string antes de fazer o replace
            valor_total = str(valor_total).replace('.', '').replace(',', '.')

            # Verificar se o valorTotal pode ser convertido para Decimal
            try:
                valor_total = Decimal(valor_total)
            except InvalidOperation:
                return JsonResponse({'error': f'Valor inválido para valorTotal: {valor_total}'}, status=400)

            # Verificar se a dataCompra está no formato correto (com hora ou sem hora)
            if data_compra:
                try:
                    # Tentar converter a data para datetime, considerando a parte de hora
                    data_compra = datetime.datetime.fromisoformat(data_compra).date()
                except ValueError:
                    return JsonResponse({'error': f'Formato de data inválido: {data_compra}'}, status=400)
            else:
                data_compra = None

            # Criar a instância de Compra
            compra = Compra.objects.create(
                vendedor=vendedor,
                valorTotal=valor_total,  # Usando Decimal para valores monetários
                dataCompra=data_compra  # Usando Date para a data
            )

            # Criar os itens associados a essa compra
            for item_data in data.get('items', []):
                titulo = item_data.get('titulo', '')
                quantidade = item_data.get('quantidade', '0')  # Valor padrão '0' caso ausente
                unidade = item_data.get('unidade', '')
                valor_unitario = item_data.get('valor_unitario', '0.0')  # Valor padrão '0.0'
                valor_total_item = item_data.get('valor_total', '0.0')  # Valor padrão '0.0'

                # Garantir que os valores sejam strings antes de fazer o replace
                valor_unitario = str(valor_unitario).replace('.', '').replace(',', '.')
                valor_total_item = str(valor_total_item).replace('.', '').replace(',', '.')

                # Verificar se valor_unitario e valor_total_item podem ser convertidos para Decimal
                try:
                    valor_unitario = Decimal(valor_unitario)
                    valor_total_item = Decimal(valor_total_item)
                except InvalidOperation:
                    return JsonResponse({'error': f'Valor inválido para valores monetários: {valor_unitario}, {valor_total_item}'}, status=400)

                # Verificar se quantidade pode ser convertida para inteiro
                try:
                    quantidade = int(quantidade)
                except ValueError:
                    return JsonResponse({'error': f'Quantidade inválida: {quantidade}'}, status=400)

                # Criar a instância de Item
                Item.objects.create(
                    compra=compra,  # Associar o item à compra criada
                    titulo=titulo,
                    quantidade=quantidade,
                    unidade=unidade,
                    valor_unitario=valor_unitario,
                    valor_total=valor_total_item
                )

            return JsonResponse({'message': 'Compra criada com sucesso!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Erro ao processar JSON.'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Campo ausente: {str(e)}'}, status=400)
        except ValueError as e:
            return JsonResponse({'error': f'Erro de valor: {str(e)}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)

def get_compras(request):
    if request.method == 'GET':
        try:
            # Buscar todas as compras e seus itens relacionados
            compras = Compra.objects.all()
            compras_data = []

            # Iterar sobre cada compra
            for compra in compras:
                # Obter os itens relacionados à compra
                itens = Item.objects.filter(compra=compra)
                
                # Criar um dicionário para armazenar as informações
                compra_info = {
                    'vendedor': compra.vendedor,
                    'valorTotal': str(compra.valorTotal),
                    'dataCompra': compra.dataCompra.strftime('%Y-%m-%d'),  # Converter a data para string
                    'itens': []
                }

                # Adicionar os itens associados à compra
                for item in itens:
                    item_info = {
                        'titulo': item.titulo,
                        'quantidade': item.quantidade,
                        'unidade': item.unidade,
                        'valor_unitario': str(item.valor_unitario),
                        'valor_total': str(item.valor_total)
                    }
                    compra_info['itens'].append(item_info)

                # Adicionar a compra à lista de dados
                compras_data.append(compra_info)

            return JsonResponse({'compras': compras_data}, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)