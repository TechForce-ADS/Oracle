import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Pages/Login';
import TelaLista from './Pages/TelaLista';
import Cadastro from './Pages/Cadastro';
import EditarParceiro from './Pages/EditarParceiro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaLista" component={TelaLista} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EditarParceiro" component={EditarParceiro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

