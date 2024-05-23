import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {IP} from "@env";

const ResetarSenhaPartner = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverError, setServerError] = useState('');

  const route = useRoute();
  const { token } = route.params || {};  // Obtendo o token a partir dos parâmetros da rota

  useEffect(() => {
    if (!token) {
      setServerError('Token inválido ou não fornecido.');
    }
  }, [token]);

  const resetarSenha = async () => {
    try {
      const response = await fetch(`http://${IP}:3001/api/partners/resetarSenhaPartner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      if (response.ok) {
        Alert.alert('Senha redefinida com sucesso! Redirecionando para a página de login...');
      } else {
        setServerError('Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      setServerError('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinição de Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Redefinir" onPress={resetarSenha} />
      {serverError ? <Text style={styles.error}>{serverError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default ResetarSenhaPartner;
