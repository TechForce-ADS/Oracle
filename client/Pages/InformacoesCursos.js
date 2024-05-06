import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../Components/Navbar';
import * as Progress from 'react-native-progress';

import { ip } from "@env";

export default function InformacoesCurso({ navigation, route }) {


  const [trackData, setTrackData] = useState(route.params?.courseToSee || {});
  const track_id = trackData._id

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




  const adicionarTask = (trackData) => {
    navigation.navigate('AdicionarExpertise', { courseToSee: trackData });
  };



  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>



      
      
          <Text style={styles.heading}><Text style={styles.Info}>{trackData.name} </Text></Text>
          <View style={styles.ProgressBar}>
            <Progress.Bar progress={0.5} width={250} color='#FF4700' backgroundColor='#FFF' /><Text style={{ fontFamily: 'Poppins_300Light', color: '#fff', fontSize: 16 }}>  50 %</Text>
          </View>



          <View style={styles.Botao}>  
             <TouchableOpacity style={styles.EditarBTN}  onPress={() => adicionarTask(trackData)} >
              <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}> + Adicionar Expertise</Text>
            </TouchableOpacity> 
         
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
    paddingVertical:30
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
    fontSize: 18,
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
    marginBottom: 8,
    fontFamily: 'Poppins_300Light'
  },


  ProgressBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },




});
