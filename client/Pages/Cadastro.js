import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { ip } from "@env";
import Navbar from '../Components/Navbar';



const Cadastro = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [nameFantasia, setNameFantasia] = useState('');
    const [nameResponsavel, setNameResponsavel] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');


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


    const handleRegister = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/api/partners/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, nameFantasia, nameResponsavel, cnpj, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('TelaLista');
            } else {

                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };




    return (

        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>

            <Navbar />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 10, marginLeft: 12, }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Cadastro de parceiro</Text>
                    </View>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 10, }} />
                </View>

                <View style={styles.ContainerLogin}>
                    <Text style={styles.label}>Nome:</Text>
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

                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleRegister} style={styles.cadastrarBTN}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Cadastrar</Text>
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Poppins_300Light'
    },

    container: {
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#DCDCDC',
        borderWidth: 3,
        borderColor: '#B1ABAB',
        width: 350,
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },

    inputNome: {
        width: '100%',
        height: 35,
        backgroundColor: '#DCDCDC',
        paddingLeft: 10,
        borderRadius: 9,
        fontFamily: 'Poppins_300Light'
    },
    dropdown: {
        backgroundColor: '#DCDCDC',
        borderRadius: 9,
        minHeight: 40,

    },
    cadastrarBTN: {
        height: 45,
        width: "40%",
        backgroundColor: '#FFF',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: 5,
        marginBottom: 12
    },


    ContainerLogin: {
        width: "100%",
        height: 600,
        marginTop: 20,
        alignItems:'center'
    },


    Textos: {
        height: 85,
        width: "100%",
        display: 'flex',
        alignItems: 'center'

    },

    Labels: {
        height: 20,

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


});

export default Cadastro;