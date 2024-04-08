import React from 'react';
import { View, Button, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../img/LogoVermelha.png'



const Login = ({navigation}) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#312D2A' }}>
    <View style={styles.container}>


      <View style={styles.LogoContainer}>
        <View style={{
          shadowColor: '#000',
          shadowOffset: { width: 8, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
        }}>
          <Image source={Logo} style={{ width: 175, height: 60, }} ></Image>
        </View>

        <View style={styles.Textos}>

          <Text style={{ fontSize: 30, color: '#363636', fontWeight: '100', }}>Login</Text>

          <TextInput style={styles.input} placeholder='Email'>
          </TextInput>

          <TextInput  secureTextEntry={true} style={styles.input} placeholder='Senha'>
          </TextInput>

          <TouchableOpacity style={styles.LogarBTN} onPress={() => navigation.navigate('TelaLista') }>
            <Text style={{ color: '#FFF8F8', textAlign: 'center', fontSize: 16, }}>Entrar</Text>
          </TouchableOpacity>

            <Text onPress={() => ("")} style={{color:'#8F8C8C', fontSize: 16, fontWeight: '200', textDecorationLine: 'underline'}}>Esqueceu sua senha?</Text>
        </View>

      </View>


    </View>
  </View>
);

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



})


export default Login;