import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../pages/Home';
import SettingsScreen from '../pages/List';
import StockScreen from '../pages/Stock';
import ItemsScreen from '../pages/ListItems';  
import Icon from 'react-native-vector-icons/MaterialIcons'; 
// Criando os Navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ItemsTab() {
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Listagem"
      component={SettingsScreen}
      options={{
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Icon name="list" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Estoque"
      component={StockScreen}
      options={{
        headerShown: true,
        tabBarIcon: ({ color, size }) => (
          <Icon name="inventory" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lista de produtos"
          component={ItemsTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Itens"
          component={ItemsScreen}
          options={{ title: 'Página de Itens', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>



  );
}
