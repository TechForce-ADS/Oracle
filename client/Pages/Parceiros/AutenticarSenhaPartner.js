import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { IP } from "@env";

const AutenticarSenhaPartner = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleTokenChange = (text) => {
    setToken(text);
  };

  const toggleErrorModal = () => {
    setErrorModalVisible(!errorModalVisible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!successModalVisible);
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
      if (data.success) {
        setIsSuccess(true);
        setSuccessMessage(data.message);
        setErrorModalVisible(false);
        setSuccessModalVisible(true);
        setTimeout(() => {
          setSuccessModalVisible(false);
          navigation.navigate('LoginParceiro'); // Navigate to the next screen
        }, 2000); // Display the success message for 2 seconds before navigating to the next screen
      } else {
        setIsSuccess(false);
        setErrorMessage(data.error);
        setErrorModalVisible(true);
      }
    })
    .catch(error => {
      console.error('Erro ao autenticar:', error);
      setIsSuccess(false);
      setErrorMessage('Erro ao tentar autenticar. Por favor, tente novamente.');
      setErrorModalVisible(true);
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={errorModalVisible}
        onRequestClose={toggleErrorModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            {!isSuccess && (
              <TouchableOpacity style={styles.closeButton} onPress={toggleErrorModal}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={successModalVisible}
        onRequestClose={toggleSuccessModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>{successMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleSuccessModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 18,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});

export default AutenticarSenhaPartner;