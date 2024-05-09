import React, { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ip } from "@env";

import Navbar from '../Components/Navbar';



export default function Tracks({ navigation }) {


  const [expanded, setExpanded] = useState(false);
  const [tracks, setTracks] = useState([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  const vizualizar = (course) => {
    navigation.navigate('InformacoesTracks', { courseToSee: course });
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${ip}:3001/api/tracks/tracksList`);
          if (!response.ok) {
            throw new Error('Erro ao buscar cursos');
          }
          const data = await response.json();
          setTracks(data);
        } catch (error) {
          console.error('Erro ao buscar cursos:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de cursos');
        }
      }

      fetchData();
   

    }, [])
  );

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tracks.map((track) => (
          <TouchableOpacity key={track._id} onPress={() => vizualizar(track)}>
            <View style={styles.containerA}>
              <View style={styles.TextName}>
                <Text style={{ fontSize: 18, color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>
                  {track.name}
                </Text>
               
                
                
              </View>
             
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.Botão}>
          <TouchableOpacity style={styles.VerMaisBTN}  onPress={() => navigation.navigate('CadastroTrack')}>
          <Text style={{  textAlign:'center',fontSize: 16, color: '#000',  fontFamily: 'Poppins_700Bold' }} >
                + Adicionar Track
                </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({



  container: {
    flex: 1,
    backgroundColor: '#1c2120',
    alignItems: 'center',
  },


  TextName:{
    width: 200,
    height: 25,
    display:'flex',
    textAlign:'center',
    alignItems:'center',
  
  },

  TextDescription:{
    width: 340,
    height: 70,
    alignItems:'center',
  },

  containerA: {
    borderRadius: 15,
    backgroundColor: '#584848',
    borderWidth: 1.3,
    borderColor: '#7b7574',
    width: 350,
    height: 50,
    display: 'flex',
    flexDirection:'column',
    marginTop: 20,
    alignItems:'center',
    justifyContent:'center'
    
  },

  

  VerMaisBTN: {
    height: 35,
    width: "70%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },
 
  Botão:{
    width:'100%',
    height:50,
    marginTop:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'



  },
  
});
