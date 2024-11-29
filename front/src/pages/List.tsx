import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InfoCard } from '../components/CardInform';
import colors from '../styles/colors';


export default function  SettingsScreen() {
  return (
    <View style={styles.container}>
   
      <InfoCard title='teste'/>
      <InfoCard title='teste'/>
      <InfoCard title='teste'/>
      <InfoCard title='teste'/>
      <InfoCard title='teste'/>
      <InfoCard title='teste'/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

});