import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { baseUrl } from '../api';
import { useEffect, useState } from 'react';
import { InfoCard } from '../components/CardInform';
import { useNavigation } from '@react-navigation/native';


export default function  SettingsScreen() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getItems();
  }, []);
  async function getItems() {
    try {
      setLoad(true)
      const response = await baseUrl.get(`api/compras/`);
      
      
      setData(response.data.compras);

    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }finally {
      setLoad(false)
    }
  };
  const handlePress = (id :number) => {
    setSelectedId(id);
    navigation.navigate('Itens', { itemId: id });
    console.log("ID selecionado:", id); // Aqui você pode fazer o que for necessário com o ID
  };
  return (
    
    <View style={styles.container}>
      {load &&  <ActivityIndicator color={colors.green} size={45} />}
      <View style={styles.main}>
        <FlatList
              data={data}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item, index }) => (
                <InfoCard data={item} onPress={handlePress} />
              )}
              contentContainerStyle={{ gap: 5 }}
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
  main:{
    height: '95%'
  },

});