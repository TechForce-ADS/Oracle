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
      <TouchableOpacity onPress={toggleMenu} style={styles.menuIconContainer}>
        <Image source={MenuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.menu}>
        {menuAberto && (
          <>
            <Text style={styles.menuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar Parceiro</Text>
            <Text style={styles.menuText} onPress={() => navigation.navigate('TelaLista')}>Parceiros</Text>
            <Text style={styles.menuText} onPress={() => navigation.navigate('Cursos')}>Cursos</Text>
            <Text style={styles.menuText}>Menu Item 4</Text>
          </>
        )}
      </View>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50100c',
    zIndex: 2,
    paddingHorizontal: 20,
    height: 70
  },
  menuIconContainer: {
    marginRight: 20,
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 110,
    height: 25,
    resizeMode: 'contain',
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 70,
    bottom: 0,
    backgroundColor: '#50100c',
    width: 200,
    zIndex: 2024,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  menuText: {
    color: 'white',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Navbar;