import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';;
import Ver from '../../img/click.png';
import Search from '../../img/search.png';
import User from '../../img/User.png';
import { ip } from "@env";
import NavbarAdmin from '../../Components/NavbarMaster';



const Admin = ({ navigation }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleCloseMenu = () => {
    setMenuAberto(false);
  };

  const editarAdmin = (admin) => {
    navigation.navigate('EditarAdmin', { adminToEdit: admin });
  };

  const vizualizar = (admin) => {
    navigation.navigate('InformacoesConsultorMaster', { adminToSee: admin });
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${ip}:3001/api/admin/adminList`);
          if (!response.ok) {
            throw new Error('Erro ao buscar admins');
          }
          const data = await response.json();
          setAdmins(data);
        } catch (error) {
          console.error('Erro ao buscar partners:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de parceiros');
        }
      }

      fetchData();
      handleCloseMenu();

    }, [])
  );
  const filteredAdmins = admins
    .filter(admin => !admin.isAdminMain)
    .filter(admin => admin.isConsultant)
    .filter(admin => {
      const fullName = `${admin.name}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    });

  const sortedAdmins = filteredAdmins.slice().sort((a, b) => {
    const nameA = `${a.name}`.toLowerCase();
    const nameB = `${b.name}`.toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center' }}>
      <NavbarAdmin />


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

      <ScrollView>
        {sortedAdmins.map((admin) => (
          <TouchableOpacity key={admin._id} onPress={() => vizualizar(admin)}>
            <View style={styles.container}>
              <View style={styles.UserPhoto}>
                <Image source={User} />
              </View>
              <View style={styles.TextName}>
                <Text style={{ fontSize: 16, textTransform: 'uppercase', color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>{admin.name}</Text>
                <Text style={{ fontSize: 12, color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_700Bold' }}>
                  {admin.isConsultant ? 'Consultor' : 'Adminstrador'}
                </Text>


              </View>
              <View style={{ width: 30, height: '100%', marginTop: 10 }}>
                <TouchableOpacity key={admin._id} onPress={() => editarAdmin(admin)}>
                  <Image source={Ver} style={styles.Icons} />
                </TouchableOpacity>
              </View>
            </View>
            
          </TouchableOpacity>
          
        ))}
        <View style={styles.Botao}>
              <TouchableOpacity style={styles.EditarBTN} onPress={() => navigation.navigate('AdicionarConsultor')}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}> + Adicionar Consultor</Text>
              </TouchableOpacity>
            </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  UserPhoto: {
    width: 105,
    height: 100,
    borderRadius: 15,
    resizeMode: 'cover'
  },

  Botao:{
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
   
  },

  content: {
    backgroundColor: '#584848',
    width: 350,
    height: 350,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    overflow: 'hidden'

  },

 

  EditarBTN: {
    height: 45,
    width: "80%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },


  TextName: {
    width: 200,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    fontFamily: 'Poppins_700Bold'

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

export default Admin;
