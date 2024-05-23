import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../Components/Navbar';
import User from '../img/User.png';
import {IP} from "@env";
import { useFocusEffect } from '@react-navigation/native';


export default function Informacoes({ navigation, route }) {
  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
  const [partnerExpertises, setPartnerExpertises] = useState([]);
  const idPartner = partnerData._id;
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

  const editarPartner = (partner) => {
    navigation.navigate('EditarParceiro', { partnerToEdit: partner });
  };

  const registerExpertise = (partner) => {
    navigation.navigate('Expertises', { partnerExpertise: partner });
    
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchPartnerExpertises(idPartner);
    }, [idPartner])
  );


  const fetchPartnerExpertises = async (partnerId) => {
    try {
      const response = await fetch(`http://${IP}:3001/api/expertise/partnerExpertises/${partnerId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar expertises do parceiro');
      }
      const data = await response.json();
      setPartnerExpertises(data);
    } catch (error) {
      console.error('Erro ao buscar expertises do parceiro:', error);
      Alert.alert('Erro', 'Não foi possível carregar as expertises do parceiro');
    }
  };

  const excluirPartner = (_id) => {
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
      await fetch(`http://${IP}:3001/api/partners/delete/${_id}`, {
        method: 'DELETE',
      });
      
      navigation.navigate('TelaLista');
      setPartnerData({});
  
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      Alert.alert("Erro", "Algo deu errado ao tentar excluir o parceiro.");
    }
  };

  const renderExpertises = () => {
    return partnerExpertises.map((expertise, index) => (
      <View key={index} style={styles.expertise}>
        <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16 }}>{expertise.title}</Text>
        {/* <TouchableOpacity onPress={() => excluirExpertise(expertise._id)}>
          <Text style={{ color: '#FF0000', fontFamily: 'Poppins_300Light', fontSize: 16, marginLeft: 10 }}>Excluir</Text>
        </TouchableOpacity> */}
      </View>
    ));
  };

  const excluirExpertise = (_id) => {
    Alert.alert(
      'Você tem certeza?',
      'Esta ação não poderá ser revertida!',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar') },
        { text: 'Excluir', onPress: () => excluirExpertiseConfirmed(_id)  },
      ],
      { cancelable: true }
    );
  };
  

  const excluirExpertiseConfirmed = async (_id) => {
    try {
        console.log('Confirmando exclusão da expertise com ID:', _id);
        await fetch(`http://${IP}:3001/api/expertiseRegistration/deleteExpertiseRegister/${_id}`, {
            method: 'DELETE',
        });
        console.log('Exclusão bem-sucedida.');
        navigation.navigate('TelaLista');
    } catch (error) {
        console.error('Erro ao excluir expertise:', error);
        Alert.alert("Erro", "Algo deu errado ao tentar excluir a expertise.");
    }
};


  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.User}>
          <Image source={User} />
          <Text style={styles.NomePrincipal}> {partnerData.nameFantasia} </Text>
          <Text style={styles.SubTitulo}> {partnerData.nivel}</Text>
        </View>

        <View>
          <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 2, fontFamily: 'Poppins_300Light' }}>Informações</Text>
          <TouchableOpacity
            style={expanded ? styles.expandedContent : styles.content}
            onPress={toggleExpand}
          >

            <Text style={styles.heading}>Nome Empresa: <Text style={styles.Info}>{partnerData.nameFantasia} </Text></Text>

            <Text style={styles.heading}>Nome Responsavel: <Text style={styles.Info}>{partnerData.nameResponsavel} </Text></Text>
            <Text style={styles.heading}>Email: <Text style={styles.Info}> {partnerData.email}</Text></Text>
            <Text style={styles.heading}>CNPJ: : <Text style={styles.Info}>{partnerData.cnpj}</Text></Text>

            <View style={styles.botoes}>
              <TouchableOpacity style={styles.EditarBTN} onPress={() => editarPartner(partnerData)}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.DeletarBTN} onPress={() => excluirPartner(partnerData._id)}>
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
        <View style={styles.botoes}>
          {partnerExpertises.length > 0 ? (
            renderExpertises()
          ) : (
            <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma expertise encontrada.</Text>
          )}
         
        </View>
        <TouchableOpacity style={styles.expertiseBTN} onPress={() => registerExpertise(partnerData)}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>+ Adicionar Expertise</Text>
          </TouchableOpacity>
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
    height: 150,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    overflow: 'hidden'

  },


  expandedContent: {
    backgroundColor: '#584848',
    width: 350,
    height: 400,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.3,
    borderColor: '#7b7574',
  },

  botoes: {
    width: '100%',
    height: 200,
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
