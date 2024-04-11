import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Logo from '../img/LogoVermelha.png';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        'http://192.168.15.6:3001/api/users/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        navigation.navigate('TelaLista');
      } else {
        Alert.alert('Error', response.data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Internal server error');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#312D2A' }}>
      <View style={styles.container}>
        <View style={styles.LogoContainer}>
          <View style={{ shadowColor: '#000', shadowOffset: { width: 8, height: 3 }, shadowOpacity: 0.3, shadowRadius: 7 }}>
            <Image source={Logo} style={{ width: 175, height: 60 }} />
          </View>
          <View style={styles.Textos}>
            <Text style={{ fontSize: 30, color: '#363636', fontWeight: '100' }}>Login</Text>
            <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={handleEmailChange} />
            <TextInput secureTextEntry={true} style={styles.input} placeholder='Senha' value={password} onChangeText={handlePasswordChange} />
            <TouchableOpacity style={styles.LogarBTN} onPress={handleLogin}>
              <Text style={{ color: '#FFF8F8', textAlign: 'center', fontSize: 16 }}>Entrar</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('ForgotPasswordScreen')} style={{ color: '#8F8C8C', fontSize: 16, fontWeight: '200', textDecorationLine: 'underline' }}>Esqueceu sua senha?</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

Login.navigationOptions = {
  title: 'Login',
};

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
});

export default Login;
