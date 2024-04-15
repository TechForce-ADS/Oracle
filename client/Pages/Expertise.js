import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';

export default function Expertises({ navigation, route }) {
  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={MenuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.menu}>
          <Text style={styles.menuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
          <Text style={styles.menuText} onPress={() => navigation.navigate('TelaLista')}>Lista de Parceiros</Text>
          <Text style={styles.menuText}>Menu Item 3</Text>
          <Text style={styles.menuText}>Menu Item 4</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text  style={{ color: "#FFFFFF", fontSize: 26, marginBottom:20 }}>Informações do usuario</Text>
        <Text style={styles.heading}>Nome:   {partnerData.name} {partnerData.lastName}</Text>
        <Text style={styles.heading}>Email:   {partnerData.email}</Text>
        <Text style={styles.heading}>Número:   {partnerData.number}</Text>
        <Text style={styles.heading}>CPF:   {partnerData.cpf}</Text>
        <Text style={styles.heading}>Endereço:   {partnerData.address}</Text>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E32124',
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 25,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  menu: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#E32124',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2024,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#404040',
    alignItems: 'center',
  },
  content: {
    padding:25,
    width: '90%',
  },

  heading: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  checkboxes: {
    marginTop: 20,
    alignItems: 'center',
  },
});
