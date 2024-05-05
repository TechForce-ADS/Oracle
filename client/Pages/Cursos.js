import React, { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IP } from "@env";

import Navbar from '../Components/Navbar';



export default function Cursos({ navigation }) {


  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  const vizualizar = (course) => {
    navigation.navigate('InformacoesCurso', { courseToSee: course });
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://${IP}:3001/api/courses/coursesList`);
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
   

    }, [])
  );

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {courses.map((course) => (
          <TouchableOpacity key={course._id} onPress={() => vizualizar(course)}>
            <View style={styles.containerA}>
              <View style={styles.TextName}>
                <Text style={{ fontSize: 18, color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>
                  {course.name}
                </Text>
                <View style={styles.TextDescription}>
                <Text style={{  textAlign:'justify',fontSize: 12, color: '#FFF',  fontFamily: 'Poppins_300Light' }}>
                {course.description}
                </Text>
                
              </View>
              </View>
             
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.Botão}>
          <TouchableOpacity style={styles.VerMaisBTN}  onPress={() => navigation.navigate('CadastroCurso')}>
          <Text style={{  textAlign:'center',fontSize: 16, color: '#000',  fontFamily: 'Poppins_700Bold' }} >
                + Adicionar Curso
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
    height: 100,
    display: 'flex',
    flexDirection:'column',
    marginTop: 20,
    alignItems:'center',
    
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
