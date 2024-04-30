import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet, Text } from 'react-native';

import Navbar from '../Components/Navbar';



export default function Cursos() {


  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Navbar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>


        <TouchableOpacity style={expanded ? styles.expandedCurso : styles.Curso}
          onPress={toggleExpand}>
          <View style={styles.Titulo}>
            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Poppins_300Light' }}>Introduction to MongoDB</Text>
          </View>

          <View style={styles.Descricao}>
            <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins_300Light' }}>The Introduction to MongoDB course guides you through the foundational skills and knowledge you need to get started with MongoDB. This includes connecting to a MongoDB database, how to conduct simple CRUD operations, and key topics such as aggregation, indexing, data modeling, and transactions.</Text>
          </View>
          <View style={styles.Botoes}>
            <TouchableOpacity style={styles.VerMaisBTN}>
              <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Ver mais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.EngressarBTN}>
              <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={expanded ? styles.expandedCurso : styles.Curso}
          onPress={toggleExpand}>
          <View style={styles.Titulo}>
            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Poppins_300Light' }}>Introduction to MongoDB 2 </Text>
          </View>

          <View style={styles.Descricao}>
            <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins_300Light' }}>The Introduction to MongoDB course guides you through the foundational skills and knowledge you need to get started with MongoDB. This includes connecting to a MongoDB database, how to conduct simple CRUD operations, and key topics such as aggregation, indexing, data modeling, and transactions.</Text>
          </View>
          <View style={styles.Botoes}>
            <TouchableOpacity style={styles.VerMaisBTN}>
              <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Ver mais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.EngressarBTN}>
              <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>



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
