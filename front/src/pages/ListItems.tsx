import * as React from 'react';
import { ActivityIndicator, FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { baseUrl } from '../api';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

type Item = {
  quantidade: number;
  titulo: string;
  unidade: string;
  valor_total: string;
};

type SectionData = {
  title: string;
  data: Item[];
};

export default function ItemsScreen() {
  const [data, setData] = useState<SectionData[]>([]);
  const route = useRoute();
  const [load, setLoad] = useState(false);
  const { itemId } = route.params;
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      setLoad(true)
      const response = await baseUrl.get(`api/compras/${itemId}/itens/`);
      setData([{
        title: "Itens",
        data: response.data.itens
      }]);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }finally {
      setLoad(false)
    }
  };
  const calcularValor = (item: { quantidade: number, unidade: string, valor_unitario: string }) => {

    const valorUnitario = parseFloat(item.valor_unitario);
    const valorComAcrescimo = valorUnitario * 1.30;

    return valorComAcrescimo;

  };
  const renderItem = ({ item, index }) => {
    const rowStyle = index % 2 === 0 ? styles.rowEven : styles.rowOdd;
    const valorCalculado = calcularValor(item);
    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.cellTitle]}>{item.titulo}</Text>
        <Text style={[styles.headerQtd]}>{item.quantidade} {item.unidade}</Text>
        <Text style={[styles.cell]}>R${item.valor_total}</Text>
        <Text style={[styles.cellValorUnitario]}>R$ {item.valor_unitario}</Text>
        <Text style={[styles.cellValorRevenda]}>R${valorCalculado.toFixed(2)}</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Lista de Itens</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, styles.headerCell]}>Título</Text>
        <Text style={[styles.headerQtd, styles.headerCell]}>Qtd.</Text>
        <Text style={[styles.cell, styles.headerCell]}>Total</Text>
        <Text style={[styles.cell, styles.headerCell]}>Valor</Text>
        <Text style={[styles.cell, styles.headerCell]}>Valor Revenda</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      {load &&  <ActivityIndicator color={colors.green} size={45} />}
        <SectionList
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  main: {
    flex: 1, // Usar flex: 1 para garantir que ocupe toda a altura disponível
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  rowEven: {
    backgroundColor: '#f0f0f0',
  },
  rowOdd: {
    backgroundColor: '#ffffff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 2,
    paddingVertical: 5,
    fontSize: 12,
  },
  cellTitle: {
    width: 110,
    
  },
  header: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
  },
  headerTitle: {
    width: 110,
    marginVertical: 2,
    paddingVertical: 5,
    fontSize: 12,
  },
  headerQtd: {
    width: 45,
    fontSize: 12,
    marginVertical: 2,
    paddingVertical: 5,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  cellValorUnitario: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  cellValorRevenda: {
    color: 'green',
    fontSize: 12,
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
});