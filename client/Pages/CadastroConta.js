import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Logo from '../img/LogoN.png';
import {
  useFonts, Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light, Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'




const CadastroConta = ({ navigation }) => {
 


  const ip = "192.168.15.99"


  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })


  if (!fonteLoaded) {
    return null;
  } 

  

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1C2120', padding: 20 }}>
      
      <View style={styles.LogoContainer}>

        <Image source={Logo} style={{ width: 175, height: 160, }} />
      </View>
      <View style={styles.ContainerLogin}>
        <View style={styles.Textos}>
          <Text style={{ fontSize: 26, color: '#fff', fontFamily:'Poppins_700Bold', textAlign:'center' }}>Crie sua nova conta</Text>
          <Text style={{ fontSize: 12, color: '#fff', fontFamily:'Poppins_300Light', }}>Já possui uma conta? <Text onPress={() => navigation.navigate('Login')}>Clique aqui</Text></Text>
        </View>
        <View style={styles.Labels}>
          <Text style={{ fontSize: 12, color: '#fff',  fontFamily:'Poppins_300Light', letterSpacing: 2 }}>NOME</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          placeholderTextColor={'#fff'}
        />


        <View style={styles.Labels}>
          <Text style={{ fontSize: 12, color: '#fff',  fontFamily:'Poppins_300Light', letterSpacing: 2 }}>EMAIL</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Email'
          placeholderTextColor={'#fff'}
        />

        <View style={styles.Labels}>
          <Text style={{ fontSize: 12, color: '#fff',  fontFamily:'Poppins_300Light', letterSpacing: 2 }}>SENHA</Text>
        </View>

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Senha'
          
         
          placeholderTextColor={'#fff'}

        />

        <TouchableOpacity style={styles.LogarBTN} >
          <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily:'Poppins_700Bold'}}>Criar</Text>
        </TouchableOpacity>

        
      </View>
      
    </View>
    </ScrollView>
  );
};

CadastroConta.navigationOptions = {
  title: 'CadastroConta',
}


const styles = StyleSheet.create({

  ContainerLogin: {

    width: "80%",
    height: 600,
    marginTop: 70,
    display: 'flex',
    alignItems: 'center',



  },


  Textos: {
    height: 85,
    width: "100%",
    display: 'flex',
    alignItems: 'center'

  },

  Labels: {
    height: 20,
    width: "83%",
    display: 'flex',
  },




  input: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(147, 113, 112, 0.3)', 
    color: '#fff',
    paddingLeft: 15,
    borderRadius: 18,
    marginBottom: 10,
    fontFamily: 'Poppins_300Light'
  },
  


  LogarBTN: {
    height: 45,
    width: "83%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 10,
    borderRadius: 5,
  },

  LogoContainer: {
    width: "100%",
    height: 122,
    display: 'flex',
    alignItems: 'center',
  },


  errorModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300,
    marginTop: -30
  },

  errorModalMessage: {
    color: 'black' //
  },

  errorModalCloseButton: {
    backgroundColor: '#B70D0D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },

  errorModalCloseButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  errorModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

})

export default CadastroConta;