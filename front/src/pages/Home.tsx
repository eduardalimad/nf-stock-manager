import * as React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import { ButtonApp } from '../components/Button';
import colors from '../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function  HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
    <View style={styles.container}>
      <Text style={styles.title}>Realize a leitura!</Text>
      <Image source={require("../../assets/iconQrCode.png")} style={styles.img} />
      <ButtonApp title='Add Produtos' />
    </View>
       </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  title:{
    fontSize: 25,
    color: '#4A7C59'
  },
  img: {
    height: 150,
    width: 150,
    margin: 30


},
});