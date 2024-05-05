import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, Alert, ScrollView } from 'react-native';
import { ip } from "@env";
import Navbar from '../Components/Navbar';

const EditarParceiro = ({ navigation, route }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [partnerData, setPartnerData] = useState(route.params?.partnerToEdit || {});
    const [email, setEmail] = useState(partnerData.email || '');
    const [nameFantasia, setName] = useState(partnerData.nameFantasia || '');
    const [nameResponsavel, setNameResponsavel] = useState(partnerData.nameResponsavel|| '');
    const [cnpj, setCnpj] = useState(partnerData.cnpj || '');


    const [open, setOpen] = useState(false);



    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

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



    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/api/partners/update/${partnerData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, nameResponsavel, lastName, number, sexo, cpf, address }),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('TelaLista');
            } else {
                // Handle update failure
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error updating:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>
            <Navbar />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 10, marginLeft: 16, }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Editar um parceiro</Text>
                    </View>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 16, marginLeft: 10, }} />
                </View>
                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome Fantasia:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Nome'
                            value={nameFantasia}
                            onChangeText={handleNameFantasiaChange}
                        >
                        </TextInput>
                    </View>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome do Responsável:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Nome Responsavel'
                            value={nameResponsavel}
                            onChangeText={handleNameResponsavelChange}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '65%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Email'
                            value={email}
                            onChangeText={handleEmailChange}
                        >
                        </TextInput>
                    </View>
                    <View style={{ width: '35%', height: 100, justifyContent: 'center', padding: 12 }}>
                    </View>
                </View>
                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>CNPJ:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='CNPJ'
                            value={cnpj}
                            onChangeText={handleCnpjChange}
                        >
                        </TextInput>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleUpdate} style={styles.editarBTN}>
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>Editar</Text>
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



    editarBTN: {
        height: 45,
        width: "40%",
        backgroundColor: '#FFF',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: 5,
        marginBottom: 12
    },



});

export default EditarParceiro;