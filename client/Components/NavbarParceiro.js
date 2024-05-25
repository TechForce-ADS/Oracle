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



  useFocusEffect(
    React.useCallback(() => {
      handleCloseMenu();
    }, [])
  );

  const handleCloseMenu = () => {
    Animated.timing(menuOffset, {
      toValue: -350, // Mudar para a esquerda da tela
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMenuAberto(false);
    });
  };



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



  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.header}>
      <Image source={Logo} style={styles.logo} />

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Image source={MenuIcon} style={styles.menuIcon} />
      </TouchableOpacity>

      <Animated.View style={[styles.menu, { transform: [{ translateX: menuOffset }], height: menuAberto ? screenHeight : 50 }]}>
        <Image source={Logo} style={styles.logo} />

        <Text style={styles.menuText} onPress={() => navigation.navigate('TracksParceiro')}>Tracks</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('TelaParceiro')}>Perfil</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('TelaListaParceiro')}>Parceiros</Text>
        <Text style={styles.menuText} onPress={() => navigation.navigate('LoginParceiro')}>Log out</Text>
      

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


  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    backgroundColor: '#50100c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 1,
  },

  menuText: {
    color: 'white',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    paddingVertical: 10,
    marginTop: 12,
  },



  logo: {
    width: 100,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 20,
  },

  menuButton: {
    backgroundColor: '#50100c',
    width: 70,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    zIndex: 2001,
  },

  menuIcon: {
    width: 30,
    height: 30,
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

});

export default Navbar;