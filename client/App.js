import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Pages/Login';
import TelaLista from './Pages/TelaLista';
import Cadastro from './Pages/Cadastro';
import EditarParceiro from './Pages/EditarParceiro';
import CadastroConta from './Pages/CadastroConta';
import Informacoes from './Pages/Informacoes';
import PerfilCompleto from './Pages/PerfilCompleto';
import Cursos from './Pages/Cursos';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import LoginParceiro from './Pages/Parceiros/LoginParceiro';
import CadastroContaParceiro from './Pages/Parceiros/CadastroContaParceiro'
import TelaParceiro from './Pages/Parceiros/TelaParceiro'
import Tasks from './Pages/Parceiros/Tasks'
import CadastrarAdmin from './Pages/CadastrarAdmin';
import EditarAdmin from './Pages/EditarAdmin';
import CadastroCurso from './Pages/CadastroCurso';
import InformacoesCurso from './Pages/InformacoesCursos';
import CursosParceiro from './Pages/Parceiros/CursosParceiro';
import InformacoesCursoParceiro from './Pages/Parceiros/InformacoesCursosParceiro';
import TelaListaParceiro from './Pages/Parceiros/TelaListaParceiro';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaLista" component={TelaLista} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EditarParceiro" component={EditarParceiro} />
        <Stack.Screen name="EditarAdmin" component={EditarAdmin} />
        <Stack.Screen name="Informacoes" component={Informacoes} />
        <Stack.Screen name="CadastroConta" component={CadastroConta} />
        <Stack.Screen name="Cursos" component={Cursos} />
        <Stack.Screen name="CadastrarAdmin" component={CadastrarAdmin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PerfilCompleto" component={PerfilCompleto} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="LoginParceiro" component={LoginParceiro} />
        <Stack.Screen name="CadastroContaParceiro" component={CadastroContaParceiro} />
        <Stack.Screen name="TelaParceiro" component={TelaParceiro} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="CadastroCurso" component={CadastroCurso} />
        <Stack.Screen name="InformacoesCurso" component={InformacoesCurso} />
        <Stack.Screen name="CursosParceiro" component={CursosParceiro} />
        <Stack.Screen name="InformacoesCursoParceiro" component={InformacoesCursoParceiro} />
        <Stack.Screen name="TelaListaParceiro" component={TelaListaParceiro} />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
