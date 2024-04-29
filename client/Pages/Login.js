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
import {ip} from "@env";




const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


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

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!errorModalVisible);
  };

  const handleLogin = async () => {

    try {
      const response = await fetch(`http://${ip}:3001/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('TelaLista');
      } else {
        setErrorMessage('Usuário ou senha incorretos');
        toggleErrorModal();
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Erro interno do servidor');
      toggleErrorModal();
    }
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1C2120', padding: 20 }}>
      
      <View style={styles.LogoContainer}>

        <Image source={Logo} style={{ width: 175, height: 160, }} />
      </View>
      <View style={styles.ContainerLogin}>
        <View style={styles.Textos}>
          <Text style={{ fontSize: 30, color: '#fff', fontFamily:'Poppins_700Bold' }}>Entrar</Text>
          <Text style={{ fontSize: 12, color: '#fff', fontWeight: '800' }}>Faça o login para continuar</Text>
        </View>
        <View style={styles.Labels}>
          <Text style={{ fontSize: 12, color: '#fff',  fontFamily:'Poppins_300Light', letterSpacing: 2 }}>EMAIL</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor={'#fff'}
        />

        <View style={styles.Labels}>
          <Text style={{ fontSize: 12, color: '#fff',  fontFamily:'Poppins_300Light', letterSpacing: 2 }}>SENHA</Text>
        </View>

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Senha'
          value={password}
          onChangeText={handlePasswordChange}
          placeholderTextColor={'#fff'}

        />

        <TouchableOpacity style={styles.LogarBTN} onPress={handleLogin}>
          <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily:'Poppins_700Bold'}}>Entrar</Text>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          style={{ color: '#8F8C8C', fontSize: 10, fontWeight: '200', marginTop: 5 }}>
          Esqueceu sua senha?
        </Text>
        <Text
          style={{ color: '#8F8C8C', fontSize: 12, fontWeight: '200', marginTop: 25 }}>
          Você não possui uma conta?<Text style={{ color: '#782e29', fontSize: 12, fontWeight: '200' }}  onPress={() => navigation.navigate('CadastroConta')}> Criar uma conta</Text>
        </Text>
      </View>


      <Modal isVisible={errorModalVisible} onBackdropPress={toggleErrorModal} style={styles.errorModal}>
        <View style={styles.errorModalContent}>
          <Text style={styles.errorModalMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.errorModalCloseButton} onPress={toggleErrorModal}>
            <Text style={styles.errorModalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};

Login.navigationOptions = {
  title: 'Login',
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
    backgroundColor: '#937170',
    color: '#fff',
    paddingLeft: 15,
    borderRadius: 18,
    marginBottom: 10,
    fontFamily:'Poppins_300Light'

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

export default Login;