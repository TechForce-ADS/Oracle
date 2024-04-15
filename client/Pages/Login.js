import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Logo from '../img/LogoVermelha.png';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ip = "192.168.15.99"

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#312D2A' }}>
      <View style={styles.container}>
        <View style={styles.LogoContainer}>
          <View style={{
            shadowColor: '#000',
            shadowOffset: { width: 8, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 7,
          }}>
            <Image source={Logo} style={{ width: 175, height: 60 }} />
          </View>

          <View style={styles.Textos}>
            <Text style={{ fontSize: 30, color: '#363636', fontWeight: '100' }}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder='Email'
              value={email}
              onChangeText={handleEmailChange}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder='Senha'
              value={password}
              onChangeText={handlePasswordChange}
            />

            <TouchableOpacity style={styles.LogarBTN} onPress={handleLogin}>
              <Text style={{ color: '#FFF8F8', textAlign: 'center', fontSize: 16 }}>Entrar</Text>
            </TouchableOpacity>

            <Text
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              style={{ color: '#8F8C8C', fontSize: 16, fontWeight: '200', textDecorationLine: 'underline' }}>
              Esqueceu sua senha?
            </Text>
          </View>
        </View>
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
  );
};

Login.navigationOptions = {
  title: 'Login',
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FEF5F5',
    width: 350,
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '10px 10px 17px 6px rgba(128, 0, 0, 0.4)'
  },

  LogoContainer: {
    alignItems: 'center',
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateY(-25px)'

  },

  input: {
    width: 285,
    height: 50,
    backgroundColor: '#D9D9D9',
    padding: 12
  },


  Textos: {
    width: 300,
    height: 400,
    //backgroundColor:'red',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',


  },

  LogarBTN: {
    backgroundColor: '#BDB46A',
    width: 125,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
