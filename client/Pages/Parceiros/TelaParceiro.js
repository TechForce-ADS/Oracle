import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../../Components/NavbarParceiro';
import User from '../../img/User.png';
import { ip } from "@env";
import * as Progress from 'react-native-progress';

export default function TelaParceiro({ navigation, route }) {

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

  const excluirPartner = (_id) => {
    Alert.alert(
      'Você tem certeza?',
      'Esta ação não poderá ser revertida!',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar') },
        { text: 'Excluir', onPress: () => excluirConfirmed(_id) },
      ],
      { cancelable: true }
    );
  };

  const excluirConfirmed = async (_id) => {
    try {
      await fetch(`http://${ip}:3001/api/partners/delete/${_id}`, {
        method: 'DELETE',
      });
      
      setPartnerData({});
      navigation.navigate('LoginParceiro');
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      Alert.alert("Erro", "Algo deu errado ao tentar excluir o parceiro.");
    }
  };

  const adquirirExpertise = (expertiseKey) => {
    Alert.alert(
      'Adquirir Expertise',
      `Deseja adquirir a expertise ${expertiseKey}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Adquirir',
          onPress: () => adquirirExpertiseConfirmado(expertiseKey),
        },
      ],
      { cancelable: false }
    );
  };

  const adquirirExpertiseConfirmado = async (expertiseKey) => {
    try {
      await updateExpertise(partnerData._id, expertiseKey, true);
      // Atualiza o estado local do parceiro
      setPartnerData(prevData => ({
        ...prevData,
        [expertiseKey]: true
      }));
      Alert.alert(
        'Sucesso',
        `A expertise ${expertiseKey} foi adquirida com sucesso!`
      );
    } catch (error) {
      console.error('Erro ao adquirir expertise:', error);
      Alert.alert(
        'Erro',
        'Houve um erro ao tentar adquirir a expertise. Por favor, tente novamente.'
      );
    }
  };

  const updateExpertise = async (partnerId, expertiseKey, value) => {
    try {
      const response = await fetch(`http://${ip}:3001/api/partners/updateExpertise/${partnerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertise: expertiseKey,
          value: value
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar expertise');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const renderExpertise = (key, label, progress) => {
    const isAcquired = partnerData[key];
    return (
      <TouchableOpacity style={styles.tarefa} onPress={() => navigation.navigate('Tasks')}>
        <View style={styles.TitleExpertise}><Text style={{ fontFamily: 'Poppins_300Light', color: '#fff' }}>{label}</Text></View>
        <View style={styles.ProgressBar}>
          {isAcquired ? (
            <>
              <Text style={{ color: 'white', marginLeft: 12, fontFamily: 'Poppins_300Light' }}>{progress} %</Text>
              <Progress.Bar progress={progress / 100} width={200} color='#FF4700' backgroundColor='#FFF' />
            </>
          ) : (
            <TouchableOpacity onPress={() => adquirirExpertise(key)}>
              <Text style={{ color: 'white', marginLeft: 12, fontFamily: 'Poppins_300Light' }}>Adquirir</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
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
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
          <View>
            <Text style={{ width: 60, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Tarefas</Text>
          </View>
          <View style={{ width: 150, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
        </View>
        {renderExpertise('Expertise1', 'Cloud Build', 0)}
        {renderExpertise('Expertise2', 'Cloud Sell', 0)}
        {renderExpertise('Expertise3', 'Service Expertise', 0)}
        {renderExpertise('Expertise4', 'Industry Healthcare Expertise', 0)}
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