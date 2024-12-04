import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../../Components/NavbarMaster';
import User from '../../img/User.png';
import{IP}from "@env";
import { useFocusEffect } from '@react-navigation/native';


export default function Informacoes({ navigation, route }) {
  const [adminData, setAdminData] = useState(route.params?.adminToSee || {});

  const [expanded, setExpanded] = useState(false);
  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const editarAdmin = (admin) => {
    navigation.navigate('EditarAdminMaster', { adminToEdit: admin });
  };


  const excluirAdmin = (_id) => {
    Alert.alert(
      'Você tem certeza?',
      'Esta ação não poderá ser revertida!',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar') },
        { text: 'Excluir', onPress: () => excluirConfirmed(_id)  },
      ],
      { cancelable: true }
    );
  };

  const excluirConfirmed = async (_id) => {
    try {
      await fetch(`http://${IP}:3001/api/admin/delete/${_id}`, {
        method: 'DELETE',
      });
      
      navigation.navigate('Administradores');
      setAdminData({});
  
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      Alert.alert("Erro", "Algo deu errado ao tentar excluir o parceiro.");
    }
  };

  





  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.User}>
          <Image source={User} />
          <Text style={styles.NomePrincipal}> {adminData.name} </Text>

        </View>

        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 2, fontFamily: 'Poppins_300Light' }}>Informações</Text>
          <TouchableOpacity
            style={expanded ? styles.expandedContent : styles.content}
            onPress={toggleExpand}
          >

            <Text style={styles.heading}>Nome: <Text style={styles.Info}>{adminData.name} </Text></Text>
            <Text style={styles.heading}>Email: <Text style={styles.Info}> {adminData.email}</Text></Text>


            <View style={styles.botoes}>
              <TouchableOpacity style={styles.EditarBTN} onPress={() => editarAdmin(adminData)}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.DeletarBTN} onPress={() => excluirAdmin(adminData._id)}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Deletar</Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <View style={{ width: 120, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
          <View>
            <Text style={{ width: 70, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Expertises</Text>
          </View>
          <View style={{ width: 120, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
        </View>
        
        
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  
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

  container: {
    flex: 1,
    backgroundColor: '#1c2120',
    alignItems: 'center',
  },



  content: {
    backgroundColor: '#584848',
    width: 350,
    height: 100,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    overflow: 'hidden'

  },


  expandedContent: {
    backgroundColor: '#584848',
    width: 350,
    height: 200,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.3,
    borderColor: '#7b7574',
  },

  botoes: {
    width: '100%',
    height: 10,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    marginTop:50
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

  expertiseBTN:{
    height: 35,
    width: "70%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 50,
  
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

  expertise: {
    backgroundColor: '#584848',
    width: 350,
    height: 50,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
});
