import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, Alert, ScrollView } from 'react-native';
import { ip } from "@env";

import NavbarAdmin from '../Components/NavbarAdmin';



const EditarAdmin = ({ navigation, route }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [adminData, setAdminData] = useState(route.params?.adminToEdit || {});
    const [email, setEmail] = useState(adminData.email || '');
    const [name, setName] = useState(adminData.name || '');
    const [open, setOpen] = useState(false);


    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleNameChange = (text) => {
        setName(text);
    };
    
    

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/api/admin/update/${adminData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name}),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('Admin');
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
            <NavbarAdmin />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 10, marginLeft: 16, }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Editar um Administrador</Text>
                    </View>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 16, marginLeft: 10, }} />
                </View>
                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Nome'
                            value={name}
                            onChangeText={handleNameChange}
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

export default EditarAdmin;