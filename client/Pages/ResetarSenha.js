import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { IP } from "@env";
import Navbar from '../Components/Navbar';

const ResetarSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, newPassword: password, confirmPassword}),
      });

      if (response.ok) {
        console.log('Senha redefinida com sucesso');
      } else {
        console.log('Erro ao redefinir senha');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>
      <Navbar />
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
          <View>
            <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Resetar senha</Text>
          </View>
          <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
        </View>
        <View style={{ width: '100%', justifyContent: 'center', padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={styles.label}> - Email - </Text>
          <TextInput
            style={styles.inputNome}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}> - Token - </Text>
          <TextInput
            style={styles.inputNome}
            placeholder='Token'
            value={token}
            onChangeText={setToken}
          />
          <Text style={styles.label}> - Senha - </Text>
          <TextInput
            style={styles.inputNome}
            placeholder='Senha'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text style={styles.label}> - Confirma Senha - </Text>
          <TextInput
            style={styles.inputNome}
            placeholder='Confirmar Senha'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.cadastrarBTN} onPress={handleResetPassword}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_300Light'
  },
  inputNome: {
    width: 330,
    height: 35,
    backgroundColor: '#DCDCDC',
    paddingLeft: 10,
    borderRadius: 9,
    fontFamily: 'Poppins_300Light'
  },
  cadastrarBTN: {
    height: 40,
    width: "50%",
    backgroundColor: '#FFF',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 5,
    marginTop: 12
  },
});

export default ResetarSenha;
