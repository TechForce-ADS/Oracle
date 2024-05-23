import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../../Components/NavbarParceiro';
import User from '../../img/User.png';
import {IP} from "@env";
import { useFocusEffect } from '@react-navigation/native';


export default function InformacoesParceiro({ navigation, route }) {
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

 

  const renderExpertises = () => {
    return partnerExpertises.map((expertise, index) => (
      <View key={index} style={styles.expertise}>
        <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16 }}>{expertise.title}</Text>
      
      </View>
    ));
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
            style={ styles.content}
            onPress={toggleExpand}
          >

            <Text style={styles.heading}>Nome Empresa: <Text style={styles.Info}>{partnerData.nameFantasia} </Text></Text>

            <Text style={styles.heading}>Nome Responsavel: <Text style={styles.Info}>{partnerData.nameResponsavel} </Text></Text>
            <Text style={styles.heading}>Email: <Text style={styles.Info}> {partnerData.email}</Text></Text>
            <Text style={styles.heading}>CNPJ: : <Text style={styles.Info}>{partnerData.cnpj}</Text></Text>

         

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


  botoes: {
    width: '100%',
    height: 300,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
   
    flexDirection: 'column',
    marginTop:50
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
