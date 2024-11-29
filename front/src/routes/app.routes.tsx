import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Home';
import SettingsScreen from '../pages/List';
import StockScreen from '../pages/Stock';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{headerShown: false }} name="Home" component={HomeScreen} />
        <Tab.Screen name="Lista de produtos" component={SettingsScreen} />
        <Tab.Screen name="Estoque" component={StockScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}