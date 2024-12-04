import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { IP} from "@env";

const AutenticarSenhaPartner = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleTokenChange = (text) => {
    setToken(text);
  };

  const handleSubmit = () => {
    fetch(`http://${IP}:3001/api/partners/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.tokenAuthenticated) {
        setErrorMessage('Token validado com sucesso');
        toggleErrorModal();
        // Navegação para a próxima tela após autenticação bem-sucedida
        setTimeout(() => {
          toggleErrorModal();
          navigation.navigate('LoginParceiro'); // Substitua 'TelaPrincipal' pelo nome da sua tela principal
        }, 2000); // tempo para exibir o pop-up
      } else {
        setErrorMessage('Token não válido. Por favor, verifique seu email.');
        toggleErrorModal();
      }
    })
    .catch(error => {
      console.error('Erro ao autenticar:', error);
      setErrorMessage('Erro ao tentar autenticar. Por favor, tente novamente.');
      toggleErrorModal();
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <Text style={styles.label}>Token de Autenticação</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o token recebido"
        value={token}
        onChangeText={handleTokenChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Autenticar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C2120',
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins_300Light',
    letterSpacing: 2,
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(147, 113, 112, 0.3)',
    color: '#fff',
    paddingLeft: 15,
    borderRadius: 18,
    marginBottom: 20,
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default AutenticarSenhaPartner;
