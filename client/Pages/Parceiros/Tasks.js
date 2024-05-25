import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet,  CheckBox, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../Components/NavbarParceiro';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import { ip } from "@env";
import { loggedPartner } from './Partner';

const Tasks = ({ route }) => {
  const [expertiseData, setExpertiseData] = useState(route.params?.expertiseToSee || {});
  const [taskData, setTaskData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [taskCompletionStatus, setTaskCompletionStatus] = useState({});

  useEffect(() => {
    const fetchTaskCompletionStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('taskCompletionStatus');
        if (storedStatus !== null) {
          setTaskCompletionStatus(JSON.parse(storedStatus));
        }
      } catch (error) {
        console.error('Error fetching task completion status:', error);
      }
    };

    fetchTaskCompletionStatus();
  }, []);

  useEffect(() => {
    const saveTaskCompletionStatus = async () => {
      try {
        await AsyncStorage.setItem('taskCompletionStatus', JSON.stringify(taskCompletionStatus));
      } catch (error) {
        console.error('Error saving task completion status:', error);
      }
    };

    saveTaskCompletionStatus();
  }, [taskCompletionStatus]);

  useEffect(() => {
    const completionStatus = {};
    taskData.forEach(task => {
      completionStatus[task._id] = loggedPartner.completedTasks.includes(task._id);
    });
    setTaskCompletionStatus(completionStatus);
  }, [taskData]);

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

  const handleCheckboxChange = async (taskId) => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/completeTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId: loggedPartner.id,
          taskId: taskId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update task completion status locally
      setTaskCompletionStatus(prevStatus => ({
        ...prevStatus,
        [taskId]: true
      }));

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'There was an error updating the task status.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (expertiseData && expertiseData._id) {
        fetchTaskExpertises(expertiseData._id);
      }
    }, [expertiseData])
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const calculateProgress = () => {
    const totalTasks = taskData.length;
    const completedTasks = Object.values(taskCompletionStatus).filter(status => status).length;
    return totalTasks === 0 ? 0 : completedTasks / totalTasks;
  };

  const renderExpertises = () => {
    if (Array.isArray(taskData) && taskData.length > 0) {
      return taskData.map((task, index) => {
        return (
          <View key={index} style={styles.expertise}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16, marginRight: 10 }}>{task.name}</Text>
              <CheckBox
                value={taskCompletionStatus[task._id] || false} // Use completion status from state
                onValueChange={() => handleCheckboxChange(task._id)}
              />
            </View>
          </View>
        );
      });
    } else {
      return <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center' }}>
      <Navbar />
      <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize:16, marginTop:12 }}>{expertiseData.expertiseName}</Text>
      <Progress.Bar
        progress={calculateProgress()}
        width={350}
        color="#720404"
        style={{ marginTop: 20 }}
      />
      <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize:16}}>{(calculateProgress() * 100).toFixed(2)}%</Text>
      <ScrollView>
        <View style={{ width: 350, height: 2, backgroundColor: '#fff', marginTop: 40, marginBottom: 40 }}>
          {taskData.length > 0 ? (
            renderExpertises()
          ) : (
            <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>
          )}
        </View>
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