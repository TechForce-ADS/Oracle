import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Animated, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import SearchIcon from '../img/search.png';

const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuOffset] = useState(new Animated.Value(-300));
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const toggleMenu = () => {
    if (menuAberto) {
      handleCloseMenu();
    } else {
      Animated.timing(menuOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setMenuAberto(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleCloseMenu();
    }, [])
  );

  const handleCloseMenu = () => {
    Animated.timing(menuOffset, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuAberto(false);
    });
  };

  const handleOrderByAlphabetical = () => {
    
    alert('Ordenar por ordem alfabética');
  };

  const handleSearch = () => {

    alert('Pesquisar: ' + searchQuery);
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.header}>
      
    
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Image source={MenuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      
      <Animated.View style={[styles.menu, { transform: [{ translateY: menuOffset }], height: menuAberto ? screenHeight : 50 }]}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.menuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('TelaLista')}>Parceiros</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('Cursos')}>Cursos</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('Dashboard')}>Dashboard</Text>

      </Animated.View>
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
    marginLeft: 20,
  },

  menuButton: {
    backgroundColor: '#50100c',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:330,
    zIndex: 2001,
  },

  menuIcon: {
    width: 30,
    height: 30,
  },

  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    backgroundColor: '#50100c',
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 1,
  },

  menuText: {
    color: 'white',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    paddingVertical: 10,
  },

  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
    marginLeft: 16,
    marginRight: 5,
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
  },

  searchButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#50100c',
  },

  filterButton: {
    backgroundColor: '#50100c',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  filterButtonText: {
    color: 'white',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
  },
});

export default Navbar;
