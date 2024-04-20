import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground,  TouchableOpacity, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Logo from '../img/LogoSemFundo.png';
import Ver from '../img/click.png';
import MenuIcon from '../img/menu.png';
import Search from '../img/search.png';
import User from '../img/User.png';

const ip = "192.168.15.99";

const TelaLista = ({ navigation }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [partners, setPartners] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleCloseMenu = () => {
    setMenuAberto(false);
  };




  const editarPartner = (partner) => {
    navigation.navigate('EditarParceiro', { partnerToEdit: partner });
  };

  const vizualizar = (partner) => {
    navigation.navigate('Informacoes', { partnerToSee: partner });
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${ip}:3001/api/partners/partnerList`);
          if (!response.ok) {
            throw new Error('Erro ao buscar partners');
          }
          const data = await response.json();
          setPartners(data);
        } catch (error) {
          console.error('Erro ao buscar partners:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de parceiros');
        }
      }

      fetchData();
      handleCloseMenu();

    }, [])
  );

  const filteredPartners = partners.filter(partner => {
    const fullName = `${partner.name} ${partner.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  const sortedPartners = filteredPartners.slice().sort((a, b) => {
    const nameA = `${a.name} ${a.lastName}`.toLowerCase();
    const nameB = `${b.name} ${b.lastName}`.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center'}}>

      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={MenuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.menu}>
          <Text style={styles.MenuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
          <Text style={styles.MenuText} onPress={() => navigation.navigate('TelaLista')}>Lista de Parceiros</Text>
          <Text style={styles.MenuText}>Menu Item 3</Text>
          <Text style={styles.MenuText}>Menu Item 4</Text>
        </View>
      )}

      {/* Search Bar */}
      <View style={{ width: 350, height: 70, paddingTop: 20, justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
        <Image source={Search} style={styles.SearchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.FilterBTN} onPress={toggleSortOrder}>
          <Text>A - Z</Text>
        </TouchableOpacity>
      </View>

      {/* Partner List */}
      {sortedPartners.map((partner) => (
        <TouchableOpacity key={partner._id} onPress={() => vizualizar(partner)}>
          <View style={styles.container}>
            <View style={styles.UserPhoto}>
            <Image source={User}  />
            </View>
            <View style={styles.TextName}>
              <Text style={{ fontSize: 16, textTransform:'uppercase',color:'#FFF', letterSpacing:1 }}>{partner.name} {partner.lastName}</Text>
              <Text style={{ fontSize: 16, color:'#FFF', letterSpacing:1 }}>Nivel - </Text>
            </View>
            <View style={{width: 30, height: '100%', marginTop:10 }}>
            <TouchableOpacity key={partner._id} onPress={() => vizualizar(partner)}>
                <Image source={Ver} style={styles.Icons} />
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};




const styles = StyleSheet.create({
  header: {
    backgroundColor: '#50100c',
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
    backgroundColor: '#50100c',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2024,


  },

  MenuText: {
    color: 'white'
  },

  UserPhoto: {
    width: 105,
    height: 100,
    borderRadius: 15,
    resizeMode:'cover'
  },


  TextName:{
    width: 200,
    height: '100%',
    display:'flex',
    justifyContent:'space-evenly',
  
  },


  container: {
    borderRadius: 15,
    backgroundColor: '#584848',
    borderWidth: 1.3,
    borderColor: '#7b7574',
    width: 350,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    filter: 'blur(8px)',
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
  
    width: 35,
    height: 35,
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
