import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import Pen from '../img/pen.png';
import MenuIcon from '../img/menu.png';
import Trash from '../img/trash.png';
import Search from '../img/search.png';

const TelaLista = ({ navigation }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#312D2A', alignItems: 'center' }}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={MenuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.menu}>

          <Text style={styles.MenuText} onPress={() => navigation.navigate('Cadastro') }>Cadastrar novo Parceiro</Text>
          <Text style={styles.MenuText}>Menu Item 2</Text>
          <Text style={styles.MenuText}>Menu Item 3</Text>
          <Text style={styles.MenuText}>Menu Item 4</Text>

        </View>
      )}

      <View style={{ width: 350, height: 70, paddingTop: 20, justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
        <Image source={Search} style={styles.SearchIcon} />
        <TextInput style={styles.searchBar} placeholder='Pesquisar'></TextInput>


        <TouchableOpacity style={styles.FilterBTN}>
          <Text>A - Z</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ width: 200, height: '100%' }}>
          <Text style={{ fontSize: 18, }}>Cristiano Ronaldo</Text>
          <Text style={{ fontSize: 10, }}>Parceiro nivel - Avançado</Text>
        </View>




        <View style={{ width: 125, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

          <TouchableOpacity style={styles.editarBTN}>
            <Image source={Pen} style={styles.Icons} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deletarBTN}>
            <Image source={Trash} style={styles.Icons} />
          </TouchableOpacity>

        </View>
      </View>



    </View>
  );
};

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

  MenuText: {
    color: 'white'
  },


  container: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#DCDCDC',
    borderWidth: 3,
    borderColor: '#B1ABAB',
    width: 350,
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },

  editarBTN: {
    backgroundColor: '#F0E68C',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#D4CB79',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },


  deletarBTN: {
    backgroundColor: '#E5B7B7',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#D6A4A4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  FilterBTN: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 40,
    borderWidth: 2,
    borderColor: '#E3DDDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },


  Icons: {

    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  SearchIcon: {

    width: 100,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    top: 25,
    left: -25,
    zIndex: 1,

  },


  searchBar: {
    width: 250,
    height: 40,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 20,
    color: 'black',
    paddingLeft: 50,
    
  },

});

export default TelaLista;
