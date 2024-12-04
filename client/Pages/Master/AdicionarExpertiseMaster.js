import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, Alert } from 'react-native';
import{IP}from "@env";
import Navbar from '../../Components/NavbarMaster';



const AdicionarExpertise = ({ navigation, route }) => {
    const [expertiseName, setNameExpertise] = useState('');
    const [trackData, setTrackData] = useState(route.params?.courseToSee || {});
    const track = trackData._id



    const handleNameExpertiseChange = (text) => {
        setNameExpertise(text);
    };
    const handleRegister = async () => {
        try {
            const response = await fetch(`http://${IP}:3001/api/tracks/registerExpertiseTrack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expertiseName, track }),
            });

            const data = await response.json();



            if (response.ok) {
                console.log('Registration successful, navigating to Tracks');
                navigation.navigate('InformacoesTracksMaster');
            } else {
              
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };

    AdicionarExpertise.navigationOptions = {
        title: 'AdicionarExpertise',
      }

    return (

        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>

            <Navbar />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Nova Expertise de {trackData.name}</Text>
                    </View>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                </View>


                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.inputNome}

                            placeholder='Nome'
                            value={expertiseName}
                            onChangeText={handleNameExpertiseChange}>

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

export default AdicionarExpertise;