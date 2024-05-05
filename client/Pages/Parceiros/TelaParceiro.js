import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../../Components/NavbarParceiro';
import { useFocusEffect } from '@react-navigation/native';
import User from '../../img/User.png';
import { ip } from "@env";


export default function TelaParceiro({ navigation, route }) {
  const [expertises, setExpertises] = useState([]);
  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
  const [expanded, setExpanded] = useState(false);
  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium
  });

  useEffect(() => {
    setPartnerData(route.params?.partnerToSee || {});
  }, [route.params?.partnerToSee]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const editarPartner = (partner) => {
    navigation.navigate('EditarParceiro', { partnerToEdit: partner });
  };


  useEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${ip}:3001/api/expertise/expertisesList`);
          if (!response.ok) {
            throw new Error('Erro ao buscar partners');
          }
          const data = await response.json();
          setExpertises(data);
        } catch (error) {
          console.error('Erro ao buscar partners:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de parceiros');
        }
      }

      fetchData();
   

    }, [])
  );
  

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
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
          <View>
            <Text style={{ width: 60, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Tarefas</Text>
          </View>
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
        </View>
        {expertises.map((expertise) => (
          <TouchableOpacity key={expertise._id} onPress={() => vizualizar(expertise)}>
            <View style={styles.tarefa}>
              <View style={styles.TextName}>
                <Text style={{ fontSize: 18, color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>
                  {expertise.title}
                </Text>
                
              </View>
             
            </View>
          </TouchableOpacity>
        ))}
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


  TitleExpertise: {
    width: "100%",
    height: 20,
    alignItems: 'center',
    display: "flex",
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
    height: 170,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'

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


  ProgressBar: {
    width:'100%',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'center',
    alignItems:'center'
  },

  Info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins_300Light',
  },

  tarefa: {
    backgroundColor: '#584848',
    width: 350,
    height: 75,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-evenly'

  },
});
