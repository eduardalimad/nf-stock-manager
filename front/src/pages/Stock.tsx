import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProductCard } from '../components/CardProduct';
import colors from '../styles/colors';
import Modal from '../components/Modal';
import { useState } from 'react';


export default function StockScreen() {
  const [viseble, setVisible] = useState(false);
  const openModal =() => {
    setVisible(true);
  } 
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text> Em desenvolvimento</Text>
      <Modal visible={viseble} onClose={closeModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

});