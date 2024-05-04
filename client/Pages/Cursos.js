import React, { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ip } from "@env";

import Navbar from '../Components/Navbar';



export default function Cursos() {


  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${ip}:3001/api/courses/coursesList`);
          if (!response.ok) {
            throw new Error('Erro ao buscar cursos');
          }
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error('Erro ao buscar cursos:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de cursos');
        }
      }

      fetchData();
      // handleCloseMenu(); // Ensure this function is defined or necessary

    }, [])
  );

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {courses.map((course) => (
          <TouchableOpacity key={course._id} onPress={() => console.log('Course selected', course.name)}>
            <View style={styles.containerA}>
              <View style={styles.TextName}>
                <Text style={{ fontSize: 16, textTransform: 'uppercase', color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>
                  {course.name}
                </Text>
              </View>
              <View style={{ width: 30, height: '100%', marginTop: 10 }}>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    height: '100%',
    display:'flex',
    justifyContent:'space-evenly',
    fontFamily:'Poppins_700Bold'
  
  },


  containerA: {
    borderRadius: 15,
    backgroundColor: '#584848',
    borderWidth: 1.3,
    borderColor: '#7b7574',
    width: 350,
    height: 100,
    display: 'flex',
   
    marginTop: 20,
  },



  Curso: {
    backgroundColor: '#584848',
    width: 350,
    height: 120,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },


  expandedCurso: {
    backgroundColor: '#584848',
    width: 350,
    height: 300,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: '#7b7574',
    marginTop: 20
  },

  Titulo: {

    width: 350,
    height: 35,
    paddingLeft: 30,
    paddingTop: 10,
    display: 'flex',

  },


  Descricao: {
    width: 350,
    height: 65,
    paddingLeft: 30,
    paddingTop: 10,
    display: 'flex',
  },

  Botoes: {
    width: 350,
    height: 65,
    marginTop: 40,
    display: 'flex',
    alignItems: 'center'
  },


  VerMaisBTN: {
    height: 35,
    width: "40%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },
  EngressarBTN: {
    height: 35,
    width: "40%",
    backgroundColor: '#56a1d3',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },


});
