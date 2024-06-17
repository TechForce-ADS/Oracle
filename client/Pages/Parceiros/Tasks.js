import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../Components/NavbarParceiro';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import { IP} from "@env";
import { loggedPartner, setLoggedPartner } from './Partner';
import Checkbox from '../../Components/checkboxList'; // Atualize o caminho conforme necessário

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
    console.log('completed', completionStatus)
    setTaskCompletionStatus(completionStatus);
  }, [taskData, loggedPartner]);

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
  const handleCheckboxChange = async (taskId, newChecked) => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/completeTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId: loggedPartner.id,
          taskId: taskId,
          completed: newChecked
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Atualiza o status da tarefa localmente
      setTaskCompletionStatus(prevStatus => ({
        ...prevStatus,
        [taskId]: newChecked
      }));
  
      // Atualiza as informações do parceiro
      const updatedPartnerData = {
        ...loggedPartner,
        completedTasks: newChecked ? [...loggedPartner.completedTasks, taskId] : loggedPartner.completedTasks.filter(task => task !== taskId)
      };
      setLoggedPartner(updatedPartnerData);
  
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
        const dataValue = taskCompletionStatus[task._id]
        return (
          <View key={index} style={styles.expertise}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16, marginRight: 10 }}>{task.name}</Text>
              <Checkbox
                label=""
                onChange={(newChecked) => handleCheckboxChange(task._id, newChecked)}
                defaultValue={dataValue}
                containerStyle={{ marginRight: 10 }}
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
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.expertiseName}>{expertiseData.expertiseName}</Text>
      <Progress.Bar
        progress={calculateProgress()}
        width={350}
        color="#720404"
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>{(calculateProgress() * 100).toFixed(2)}%</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.separator} />
        {taskData.length > 0 ? (
          renderExpertises()
        ) : (
          <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light' }}>Nenhuma task encontrada.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2120',
    alignItems: 'center',
  },
  expertiseName: {
    color: '#FFF',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    marginTop: 12,
  },
  progressBar: {
    marginTop: 20,
  },
  progressText: {
    color: '#FFF',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  separator: {
    width: 350,
    height: 2,
    backgroundColor: '#fff',
    marginVertical: 40,
  },
  expertise: {
    backgroundColor: '#584848',
    width: 350,
    height: 50,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tasks;
