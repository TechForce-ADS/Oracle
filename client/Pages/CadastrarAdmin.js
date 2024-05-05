import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import {
  useFonts, Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light, Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { ip } from "@env";




const CadastrarAdmin = ({ navigation }) => {


  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };


  const handleRegister = async () => {
    try {
      const response = await fetch(`http://${ip}:3001/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Admin');
      } else {
       
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Error', 'Internal server error');
    }
  };




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

      
        <View style={styles.ContainerLogin}>
          <View style={styles.Textos}>
            <Text style={{ fontSize: 26, color: '#fff', fontFamily: 'Poppins_700Bold', textAlign: 'center' }}>Crie conta parceiro</Text>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', }}>Já possui uma conta? <Text onPress={() => navigation.navigate('LoginParceiro')}>Clique aqui</Text></Text>
          </View>
          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>NOME</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Nome'
            placeholderTextColor={'#fff'}
            value={name}
            onChangeText={handleNameChange}
          />

          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>EMAIL</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={'#fff'}
            value={email}
            onChangeText={handleEmailChange}
          />
          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>SENHA</Text>
          </View>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Senha'
            value={password}
            onChangeText={handlePasswordChange}
            placeholderTextColor={'#fff'}

          />

          <TouchableOpacity style={styles.LogarBTN} onPress={handleRegister} >
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Criar</Text>
          </TouchableOpacity>


        </View>

      </View>
    </ScrollView>
  );
};

CadastrarAdmin.navigationOptions = {
  title: 'CadastrarAdmin',
}


const styles = StyleSheet.create({

  ContainerLogin: {
    width: "80%",
    height: 600,
    marginTop: 20,
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

export default CadastrarAdmin;