import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, Alert } from 'react-native';
import { ip } from "@env";
import Navbar from '../../Components/NavbarMaster';



const InformacoesTracks = ({ navigation }) => {
    const [name, setName] = useState('');
  

    const handleNameChange = (text) => {
        setName(text);
    };

 
    const handleRegister = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/api/tracks/registerTrack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();
            navigation.navigate('TracksMaster');
            if (response.ok) {
                navigation.navigate('TracksMaster');
            } else {
                
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };

    InformacoesTracks.navigationOptions = {
        title: 'InformacoesTracks',
      }

    return (

        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>

            <Navbar />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Novo Curso</Text>
                    </View>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                </View>


                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.inputNome}

                            placeholder='Nome'
                            value={name}
                            onChangeText={handleNameChange}>

                        </TextInput>


                    </View>
                   
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

    inputDisc: {
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



});

export default InformacoesTracks;