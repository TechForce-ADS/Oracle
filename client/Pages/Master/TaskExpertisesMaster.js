import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import Navbar from '../../Components/NavbarMaster';
import { useFocusEffect } from '@react-navigation/native';

import{IP}from "@env";

export default function InformacoesCurso({ navigation, route }) {


  const [expertiseData, setExpertiseData] = useState(route.params?.trackToSee || {});
  const [taskData, setTaskData] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (expertiseData._id) {
        fetchTaskExpertises(expertiseData._id.trim()); 
      } else {
        console.error('Expertise ID not available');
      }
    }, [expertiseData])
  );
  
  const fetchTaskExpertises = async (expertiseId) => {
    try {
      const response = await fetch(`http://${IP}:3001/api/task/tasksExpertises/${expertiseId}`);
      if (!response.ok) {
        throw new Error('Error fetching partner tasks');
      }
      const data = await response.json();
      setTaskData(data);
    } catch (error) {
      console.error('Error fetching partner tasks:', error);
      Alert.alert('Error', 'Unable to load partner tasks');
    }
  };
const renderExpertises = () => {
  if (Array.isArray(taskData)) {
    return taskData.map((task, index) => (
      <TouchableOpacity key={index} style={styles.expertise}>
        <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16 }}>{task.name}</Text>
      </TouchableOpacity>
    ));
  } else {
    return <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>;
  }
};

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.Info}>{expertiseData.expertiseName}</Text>
    
        {taskData.length > 0 ? (
          renderExpertises()
        ) : (
          <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>
        )}

        <View style={styles.Botao}>  
          <TouchableOpacity style={styles.EditarBTN} onPress={() => navigation.navigate('AdicionarTaskMaster', { expertiseToSee: expertiseData })}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}> + Adicionar Task</Text>
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
    marginBottom: 18,
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


  expertise: {
    backgroundColor: '#584848',
    width: 350,
    padding:8,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },

});
