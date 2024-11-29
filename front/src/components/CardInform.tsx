
import React from "react";
import colors from "../styles/colors";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";

interface Props {
  title: string,
  onPress?: () => void,
}

export function InfoCard({ title, onPress }: Props) {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <Text style={styles.cardTitle}>ATACADAO S.A.</Text>
        <View style={styles.infoRow}>
          <Text style={styles.dateText}>10/11/2024</Text>
          <Text style={styles.invoiceValue}>Valor da NF R$ 1.000</Text>
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