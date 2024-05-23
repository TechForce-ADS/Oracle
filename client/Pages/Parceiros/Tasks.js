import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from '../../Components/checkboxList';
import Navbar from '../../Components/NavbarParceiro';
import * as Progress from 'react-native-progress';

const Tasks = ({ route }) => {

   const handleCheckboxChange = (isChecked) => {
     console.log('Checkbox marcado:', isChecked);
   }
  const [expertiseData, setExpertiseData] = useState(route.params?.expertiseToSee || {});
  const [taskData, setTaskData] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [Message, setMessage] = useState('');

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

  useEffect(() => {
    fetchTaskExpertises(expertiseData._id); 
    console.log(taskData)
    console.log(expertiseData._id)
  }, []);





  const toggleModal = () => {
    setModalVisible(!ModalVisible);
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
    <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center' }}>
      <Navbar />
      <ScrollView>
        
        <View style={{ width: 350, height: 2, backgroundColor: '#fff', marginTop: 40, marginBottom: 40 }}> 
        {taskData.length > 0 ? (
          renderExpertises()
        ) : (
          <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>
        )}</View>
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  tarefas: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',


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

  titulo: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },

  ProgressBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  tarefa: {
    backgroundColor: '#584848',
    width: 350,
    height: 60,
    borderRadius: 22,
    padding: 12,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
  },

  tituloTask: {
    fontFamily: 'Poppins_300Light',
    color: '#fff',
    fontSize: 16
  },

});

export default Tasks;
