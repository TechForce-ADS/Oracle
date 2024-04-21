import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import User from '../img/User.png';



export default function PerfilCompleto({ navigation, route }) {
  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
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

        <View style={styles.content}>
         
        <Text style={styles.heading}>Nome: <Text style={styles.Info}>{partnerData.name} {partnerData.lastName}</Text></Text>
            <Text style={styles.heading}>Email: <Text style={styles.Info}> {partnerData.email}</Text></Text>
            <Text style={styles.heading}>Número: <Text style={styles.Info}>{partnerData.number}</Text></Text>
            <Text style={styles.heading}>CPF: <Text style={styles.Info}> {partnerData.cpf}</Text></Text>
        </View>

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
    height: 450,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',

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
