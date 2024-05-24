import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { IP } from "@env";
import Navbar from '../Components/Navbar';

const EnviarToken = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/recuperarSenhaPartner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Navegar para a página de redefinição de senha se o email estiver correto
        navigation.navigate('ResetarSenha');
      } else {
        // Tratar erros de resposta, se necessário
        console.log('Erro ao solicitar recuperação de senha');
      }
    } catch (error) {
      // Tratar erros de rede ou do lado do cliente
      console.error('Erro ao solicitar recuperação de senha:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>
      <Navbar />
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
          <View>
            <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Recuperar senha</Text>
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
          <TouchableOpacity style={styles.cadastrarBTN} onPress={handleForgotPassword}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Enviar Código</Text>
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

export default EnviarToken;
