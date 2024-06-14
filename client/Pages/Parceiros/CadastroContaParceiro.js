import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { IP } from "@env";
import { Alert } from 'react-native';

const CadastroContaParceiro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nameFantasia, setNameFantasia] = useState('');
  const [nameResponsavel, setNameResponsavel] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [fonteLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_700Bold
  });

  if (!fonteLoaded) {
    return null;
  }

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleNameFantasiaChange = (text) => {
    setNameFantasia(text);
  };

  const handleNameResponsavelChange = (text) => {
    setNameResponsavel(text);
  };

  const handleCnpjChange = (text) => {
    setCnpj(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!errorModalVisible);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nameFantasia, nameResponsavel, cnpj, password }),
      });

      
      if (!response.ok) {
        setErrorMessage('Email ou CNPJ já existente');
        toggleErrorModal(); // Exibe o modal de erro
      } else {
        navigation.navigate('AutenticarSenhaPartner');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage('Erro interno do servidor');
      toggleErrorModal();
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#1C2120', padding: 20 }}>
        <View style={styles.ContainerLogin}>
          <View style={styles.Textos}>
            <Text style={{ fontSize: 26, color: '#fff', fontFamily: 'Poppins_700Bold', textAlign: 'center' }}>Crie conta OPN</Text>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light' }}>Já possui uma conta? <Text onPress={() => navigation.navigate('LoginParceiro')} style={{ color: '#fff', textDecorationLine: 'underline' }}>Clique aqui</Text></Text>
          </View>
          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>NOME FANTASIA</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Nome Fantasia'
            placeholderTextColor={'#fff'}
            value={nameFantasia}
            onChangeText={handleNameFantasiaChange}
          />
          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>NOME RESPONSAVEL</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Nome'
            placeholderTextColor={'#fff'}
            value={nameResponsavel}
            onChangeText={handleNameResponsavelChange}
          />
          <View style={styles.Labels}>
            <Text style={{ fontSize: 12, color: '#fff', fontFamily: 'Poppins_300Light', letterSpacing: 2 }}>CNPJ</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='CNPJ'
            placeholderTextColor={'#fff'}
            value={cnpj}
            onChangeText={handleCnpjChange}
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

CadastroContaParceiro.navigationOptions = {
  title: 'CadastroContaParceiro',
};

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
  errorModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300,
    marginTop: -30
  },
  errorModalMessage: {
    color: 'black'
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
});

export default CadastroContaParceiro;
