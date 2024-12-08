
import React from "react";
import colors from "../styles/colors";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";

interface Props {
  title?: string,
  onPress?: (id: number) => void;
  data: {
    id: number;
    vendedor: string;
    dataCompra: string;
    valorTotal: number;
  };
}

export function InfoCard({ data, title, onPress }: Props) {
  
  function handleId() {
    if (onPress) { 
      onPress(data.id);
    }
  }
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={handleId}>
        <Text style={styles.cardTitle}>{data.vendedor}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.dateText}>{data.dataCompra}</Text>
          <Text style={styles.invoiceValue}>Valor da NF R$ {data.valorTotal}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#34A853',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      width: '100%',
      alignSelf: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    dateText: {
      fontSize: 14,
      color: '#333', 
    },
    invoiceValue: {
      fontSize: 14,
      fontWeight: '500',
      color: '#000', 
    },
  });