import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import Navbar from '../../Components/NavbarConsultor';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import {IP} from "@env";


export default function InformacoesCurso({ navigation, route }) {
  const [expertiseData, setExpertiseData] = useState(route.params?.trackToSee || {});
  const [taskData, setTaskData] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [Message, setMessage] = useState('');
  const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {})
 
  
  useEffect(() => {
    fetchTaskExpertises(expertiseData._id); 
  }, []);
  
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
      setMessage('Error fetching partner tasks');
      toggleModal();
    }
  };

  const registerExpertise = async () => {
    const partnerId = partnerData._id; 
    try {
      console.log("id parceiro: " + partnerId)
      console.log("id expertise: " + expertiseData._id)
      const response = await fetch(`http://${IP}:3001/api/partners/registerExpertise`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          partnerId,
          expertiseId: expertiseData._id
        })
      });

      if (response.ok) {
        setMessage('Parceiro cadastrado na expertise');
        toggleModal();
      } else {
        throw new Error('Erro ao ingressar na expertise');
        setMessage('Já cadastrado na expertise');
        toggleModal();
      }
    } catch (error) {
      console.error('Error registering track:', error);
      setMessage('Já cadastrado na expertise');
      toggleModal();
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

  const toggleModal = () => {
    setModalVisible(!ModalVisible);
  };

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}><Text style={styles.Info}></Text></Text>
        <View style={styles.ProgressBar}>
          <Text>{expertiseData.title}</Text>
        </View>
        {taskData.length > 0 ? (
          renderExpertises()
        ) : (
          <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>
        )}

        <View style={styles.Botao}>  
          <TouchableOpacity style={styles.EditarBTN} onPress={registerExpertise}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Ingressar na Expertise</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={ModalVisible} onBackdropPress={toggleModal} style={styles.Modal}>
        <View style={styles.ModalContent}>
          <Text style={styles.ModalMessage}>{Message}</Text>
          <TouchableOpacity style={styles.ModalCloseButton} onPress={toggleModal}>
            <Text style={styles.ModalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    height: 45,
    width: "75%",
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
    height: 50,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },

  ModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300,
    marginTop: -30
  },

  ModalMessage: {
    color: 'black' //
  },

  ModalCloseButton: {
    backgroundColor: '#B70D0D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },

  ModalCloseButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  Modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

});