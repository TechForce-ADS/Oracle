import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking } from 'react-native';

import Login from '../Pages/Login'; // Verifique o caminho
import ResetarSenhaPartner from '../Pages/Parceiros/resetarSenhaPartner'; // Verifique o caminho

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://', 'http://localhost:8081'],
  config: {
    screens: {
      ResetarSenhaPartner: 'resetarSenhaPartner',
    },
  },
};

const AppNavigator = () => {
  useEffect(() => {
    const handleOpenURL = (event) => {
      console.log('URL recebida:', event.url);
      // Aqui você pode adicionar a lógica para manipular a URL recebida
      // Por exemplo, você pode analisar a URL para determinar a tela a ser exibida
      // e navegar para essa tela usando o NavigationContainer
    };

    Linking.addEventListener('url', handleOpenURL);

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetarSenhaPartner" component={ResetarSenhaPartner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
