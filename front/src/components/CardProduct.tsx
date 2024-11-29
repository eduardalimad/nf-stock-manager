
import React from "react";
import colors from "../styles/colors";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";

interface Props {
  title: string,
  onPress?: () => void,
}

export function ProductCard({ title, onPress }: Props) {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.companyName}>ATACADAO S.A.</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Qtd. 100</Text>
          </View>
        </View>
  
        <View style={styles.priceRow}>
          <Text style={styles.unitPriceLabel}>Vl. UN. R$ 7,00</Text>
          <Text style={styles.totalPricePrimary}>Vl. Total R$ 100,00</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.resalePriceLabel}>Vl. Revenda R$ 10,00</Text>
          <Text style={styles.totalPriceSecondary}>Vl. Total R$ 110,00</Text>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "center",
      marginBottom: 5,
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    quantityContainer: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      fontWeight: '500',
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4, 
    },
    unitPriceLabel: {
      fontWeight: '300',
      fontSize: 14,
    },
    totalPricePrimary: {
      fontWeight: '300',
      fontSize: 14,
      color: '#FBBC05',
    },
    resalePriceLabel: {
      fontWeight: '300',
      fontSize: 14,
    },
    totalPriceSecondary: {
      fontWeight: '300',
      fontSize: 14,
      color: '#34A853',
    },
  });
  
