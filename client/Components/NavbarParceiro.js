import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';

const Navbar = () => {

const [menuAberto, setMenuAberto] = useState(false);
const navigation = useNavigation();

const toggleMenu = () => {
  setMenuAberto(!menuAberto);
};



useFocusEffect(
  React.useCallback(() => {
    handleCloseMenu();

  }, [])
);


const handleCloseMenu = () => {
  setMenuAberto(false);
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
          <Text style={styles.menuText} onPress={() => navigation.navigate('TelaListaParceiro')}>Parceiros</Text>
          <Text style={styles.menuText} onPress={() => navigation.navigate('CursosParceiro')}>Cursos</Text>
          <Text style={styles.menuText} onPress={() => navigation.navigate('TelaParceiro')}>Perfil</Text>
        
        
        </View>
      )}
    </View>
  );
}
  



const styles = StyleSheet.create({
  header: {
    backgroundColor: '#50100c',
    width: 420,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    zIndex: 2000,
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

});

export default Navbar;