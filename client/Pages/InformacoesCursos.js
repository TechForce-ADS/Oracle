import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../Components/Navbar';

import { IP } from "@env";

export default function InformacoesCurso({ navigation, route }) {


  const [courseData, setCourseData] = useState(route.params?.courseToSee || {});

  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fonteLoaded) {
    return null;
  }





  const excluirCourse = (_id) => {
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
      await fetch(`http://${IP}:3001/api/courses/delete/${_id}`, {
        method: 'DELETE',
      });

      setCourseData({});
      navigation.navigate('Cursos');
    } catch (error) {
      console.error('Erro ao excluir parceiro:', error);
      Alert.alert("Erro", "Algo deu errado ao tentar excluir o parceiro.");
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>



        <Text style={{ color: "#FFFFFF", fontSize: 16, marginLeft: 2, fontFamily: 'Poppins_300Light' }}>Informações do curso</Text>

        <View style={styles.content}>
          <Text style={styles.heading}>Nome: <Text style={styles.Info}>{courseData.name} </Text></Text>
          <Text style={styles.heading}>Descrição: <Text style={styles.Info}>{courseData.description} </Text></Text>
          <Text style={styles.heading}>Tempo de duração: <Text style={styles.Info}> {courseData.time}</Text></Text>



          <View style={styles.Botao}>  
            <TouchableOpacity style={styles.DeletarBTN} onPress={() => excluirCourse(courseData._id)}>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.EditarBTN} >
              <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Ingressar</Text>
            </TouchableOpacity>
          </View>


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



  Info: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins_300Light',
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



  heading: {
    color: '#000',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Poppins_300Light'
  },




});
