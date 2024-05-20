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
import Tracks from './Pages/Tracks';
import TracksMaster from './Pages/Master/TracksMaster';
import Dashboard from './Pages/Dashboard';
import Administradores from './Pages/Master/Administradores';
import Consultores from './Pages/Master/Consultores';
import Parceiros from './Pages/Master/Parceiros';
import CadastroTrackMaster from './Pages/Master/CadastroTrackMaster';
import InformacoesTracksMaster from './Pages/Master/InformacoesTracksMaster';
import AdicionarExpertiseMaster from './Pages/Master/AdicionarExpertiseMaster';
import TaskExpertisesMaster from './Pages/Master/TaskExpertisesMaster';
import AdicionarTaskMaster from './Pages/Master/AdicionarTaskMaster';
import LoginParceiro from './Pages/Parceiros/LoginParceiro';
import CadastroContaParceiro from './Pages/Parceiros/CadastroContaParceiro'
import TelaParceiro from './Pages/Parceiros/TelaParceiro'
import Tasks from './Pages/Parceiros/Tasks'
import CadastrarAdmin from './Pages/CadastrarAdmin';
import EditarAdminMaster from './Pages/Master/EditarAdminMaster';
import CadastroTrack from './Pages/CadastroTrack';
import InformacoesTracks from './Pages/InformacoesTracks';
import InformacoesTracksParceiros from './Pages/Parceiros/InformacoesTracksParceiros';
import AdicionarTask from './Pages/AdicionarTask'
import TelaListaParceiro from './Pages/Parceiros/TelaListaParceiro';
import Expertises from './Pages/Expertises';
import InformacoesParceiros from './Pages/Parceiros/InformacoesParceiros';
import AdicionarExpertise from './Pages/AdicionarExpertise';
import TaskExpertises from './Pages/TaskExpertises';
import TracksParceiro from './Pages/Parceiros/TracksParceiro';
import TaskExpertisesParceiros from './Pages/Parceiros/TaskExpertisesParceiros';
import ConsultorLista from './Pages/Consultor/ConsultorLista'
import AdicionarConsultor from './Pages/Master/AdicionarConsultor'
import AdicionarAdministrador from './Pages/Master/AdicionarAdministrador'
import InformacoesParceiroMaster from './Pages/Master/InformacoesParceiroMaster'
import InformacoesAdminMaster from './Pages/Master/InformacoesAdminMaster'
import InformacoesConsultorMaster from './Pages/Master/InformacoesConsultorMaster'
import InformacoesParceiroConsultor from './Pages/Consultor/InformacoesParceiroConsultor'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaLista" component={TelaLista} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EditarParceiro" component={EditarParceiro} />
        <Stack.Screen name="EditarAdminMaster" component={EditarAdminMaster} />
        <Stack.Screen name="Informacoes" component={Informacoes} />
        <Stack.Screen name="CadastroConta" component={CadastroConta} />
        <Stack.Screen name="Tracks" component={Tracks} />
        <Stack.Screen name="TracksMaster" component={TracksMaster} />
        <Stack.Screen name="CadastrarAdmin" component={CadastrarAdmin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PerfilCompleto" component={PerfilCompleto} />
        <Stack.Screen name="Administradores" component={Administradores} />
        <Stack.Screen name="LoginParceiro" component={LoginParceiro} />
        <Stack.Screen name="CadastroContaParceiro" component={CadastroContaParceiro} />
        <Stack.Screen name="TelaParceiro" component={TelaParceiro} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="CadastroTrack" component={CadastroTrack} />
        <Stack.Screen name="CadastroTrackMaster" component={CadastroTrackMaster} />
        <Stack.Screen name="InformacoesTracks" component={InformacoesTracks} />
        <Stack.Screen name="AdicionarTask" component={AdicionarTask} />
        <Stack.Screen name="TelaListaParceiro" component={TelaListaParceiro} />
        <Stack.Screen name="InformacoesParceiros" component={InformacoesParceiros} />
        <Stack.Screen name="Expertises" component={Expertises} />
        <Stack.Screen name="AdicionarExpertise" component={AdicionarExpertise} />
        <Stack.Screen name="TaskExpertises" component={TaskExpertises} />
        <Stack.Screen name="TracksParceiro" component={TracksParceiro} />
        <Stack.Screen name="InformacoesTracksParceiros" component={InformacoesTracksParceiros} />
        <Stack.Screen name="TaskExpertisesParceiros" component={TaskExpertisesParceiros} />
        <Stack.Screen name="ConsultorLista" component={ConsultorLista} />
        <Stack.Screen name="Consultores" component={Consultores} />
        <Stack.Screen name="Parceiros" component={Parceiros} />
        <Stack.Screen name="InformacoesTracksMaster" component={InformacoesTracksMaster} />
        <Stack.Screen name="AdicionarExpertiseMaster" component={AdicionarExpertiseMaster} />
        <Stack.Screen name="TaskExpertisesMaster" component={TaskExpertisesMaster} />
        <Stack.Screen name="AdicionarTaskMaster" component={AdicionarTaskMaster} />
        <Stack.Screen name="AdicionarConsultor" component={AdicionarConsultor} />
        <Stack.Screen name="AdicionarAdministrador" component={AdicionarAdministrador} />
        <Stack.Screen name="InformacoesParceiroMaster" component={InformacoesParceiroMaster} />
        <Stack.Screen name="InformacoesAdminMaster" component={InformacoesAdminMaster} />
        <Stack.Screen name="InformacoesConsultorMaster" component={InformacoesConsultorMaster} />
        <Stack.Screen name="InformacoesParceiroConsultor" component={InformacoesParceiroConsultor} />
        
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
