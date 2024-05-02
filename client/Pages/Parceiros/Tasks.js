import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Checkbox from '../../Components/checkboxList';
import Navbar from '../../Components/NavbarParceiro';
import * as Progress from 'react-native-progress';


const Tasks = ({ }) => {
  const handleCheckboxChange = (isChecked) => {
    console.log('Checkbox marcado:', isChecked);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center' }}>
      <Navbar />
      <ScrollView>
        <View style={styles.titulo}>
          <Text style={{ fontFamily: 'Poppins_300Light', color: '#fff', fontSize: 16 }}>Oracle Build</Text>
          <View style={styles.ProgressBar}>
            <Progress.Bar progress={0.3} width={250} color='#FF4700' backgroundColor='#FFF' /><Text style={{ fontFamily: 'Poppins_300Light', color: '#fff', fontSize: 16 }}>  50 %</Text>
          </View>
        </View>
        <View style={styles.tarefas}>
          <View style={styles.tarefa} >
            <Text style={styles.tituloTask}>Titulo da Task 1</Text>
            <Checkbox  onChange={handleCheckboxChange} />
          </View>
          <View style={styles.tarefa} >
            <Text style={styles.tituloTask}>Titulo da Task 2</Text>
            <Checkbox  onChange={handleCheckboxChange} />
          </View>
          <View style={styles.tarefa} >
            <Text style={styles.tituloTask}>Titulo da Task 3</Text>
            <Checkbox  onChange={handleCheckboxChange} />
          </View>
          <View style={styles.tarefa} >
            <Text style={styles.tituloTask}>Titulo da Task 4</Text>
            <Checkbox  onChange={handleCheckboxChange} />
          </View>
        </View>
        <View style={{ width: 350, height: 2, backgroundColor: '#fff', marginTop: 40, marginBottom: 40 }}></View>
        <View style={styles.tarefa} ></View>
        <View style={styles.tarefa} ></View>
        <View style={styles.tarefa} ></View>
        <View style={styles.tarefa} ></View>
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
