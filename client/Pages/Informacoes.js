import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'

import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import User from '../img/User.png';
import {ip} from "@env";

export default function Informacoes({ navigation, route }) {


  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
  const [menuAberto, setMenuAberto] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fonteLoaded) {
    return null;
  }

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const editarPartner = (partner) => {
    navigation.navigate('EditarParceiro', { partnerToEdit: partner });
  };

  const excluirPartner = (_id) => {
    Alert.alert(
      'Você tem certeza?',
      'Esta ação não poderá ser revertida!',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar') },
        { text: 'Excluir', onPress: () => excluirConfirmed(_id) },
      ],
      { cancelable: true }
    );
  };

  const excluirConfirmed = async (_id) => {
    try {
      await fetch(`http://${ip}:3001/api/partners/delete/${_id}`, {
        method: 'DELETE',
      });
      // Após a exclusão, limpe os dados do parceiro
      setPartnerData({});
      navigation.navigate('TelaLista');
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      Alert.alert("Erro", "Algo deu errado ao tentar excluir o parceiro.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={MenuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>

      {menuAberto && (
        <View style={styles.menu}>
          <Text style={styles.menuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
          <Text style={styles.menuText} onPress={() => navigation.navigate('TelaLista')}>Lista de Parceiros</Text>
          <Text style={styles.menuText}>Menu Item 3</Text>
          <Text style={styles.menuText}>Menu Item 4</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.User}>
          <Image source={User} />
          <Text style={styles.NomePrincipal}> {partnerData.name} {partnerData.lastName}</Text>
          <Text style={styles.SubTitulo}> Iniciante</Text>
        </View>

        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 2, fontFamily: 'Poppins_300Light' }}>Informações</Text>
          <TouchableOpacity
            style={expanded ? styles.expandedContent : styles.content}
            onPress={toggleExpand}
          >

            <Text style={styles.heading}>Nome: <Text style={styles.Info}>{partnerData.name} {partnerData.lastName}</Text></Text>
            <Text style={styles.heading}>Email: <Text style={styles.Info}> {partnerData.email}</Text></Text>
            <Text style={styles.heading}>Número: <Text style={styles.Info}>{partnerData.number}</Text></Text>
            <Text style={styles.heading}>CPF: <Text style={styles.Info}> {partnerData.cpf}</Text></Text>
            <Text style={styles.heading}>Endereço: <Text style={styles.Info}> {partnerData.address}</Text></Text>
            <View style={styles.botoes}>
              <TouchableOpacity style={styles.EditarBTN} onPress={() => editarPartner(partnerData)}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.DeletarBTN} onPress={() => excluirPartner(partnerData._id)}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Deletar</Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
          <View>
            <Text style={{ width: 60, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Tarefas</Text>
          </View>
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
        </View>
        <View style={styles.tarefa}></View>
        <View style={styles.tarefa}></View>
        <View style={styles.tarefa}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#50100c',
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  logo: {
    width: 110,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 85
  },

  menuIcon: {
    width: 50,
    height: 50,
  },

  User: {
    width: '90%',
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#50100c',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2024,


  },

  menuText: {
    color: 'white',
    fontFamily: 'Poppins_300Light',
    fontSize: 16
  },



  container: {
    flex: 1,
    backgroundColor: '#1c2120',
    alignItems: 'center',
  },



  content: {
    backgroundColor: '#584848',
    width: 350,
    height: 150,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    overflow: 'hidden'

  },


  expandedContent: {
    backgroundColor: '#584848',
    width: 350,
    height: 400,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.3,
    borderColor: '#7b7574',
  },

  botoes: {
    width: '100%',
    height: 170,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'

  },

  DeletarBTN: {
    height: 35,
    width: "70%",
    backgroundColor: '#6b0600',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },

  EditarBTN: {
    height: 35,
    width: "70%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },




  NomePrincipal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900'
  },

  SubTitulo: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_300Light'
  },



  heading: {
    color: '#000',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins_300Light'
  },




  Info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins_300Light',
  },

  tarefa: {
    backgroundColor: '#584848',
    width: 350,
    height: 75,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20
  },
});
