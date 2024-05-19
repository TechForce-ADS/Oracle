import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, Alert } from 'react-native';
import { ip } from "@env";
import Navbar from '../../Components/NavbarMaster';



const AdicionarTask = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [expertiseData, setExpertiseData] = useState(route.params?.expertiseToSee || {});

    
    const expertise = expertiseData._id;
    useEffect(() => {

   
      }, []);

    const handleNameTaskChange = (text) => {
        setName(text);
    };

 
    const handleRegister = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/api/task/registerExpertiseTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, expertise }),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('TaskExpertisesMaster');
            } else {
                
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };

    AdicionarTask.navigationOptions = {
        title: 'AdicionarTask',
      }

    return (

        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>

            <Navbar />
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Nova Task de {expertiseData.expertiseName} </Text>
                    </View>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', }} />
                </View>


                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.inputNome}

                            placeholder='Nome'
                            value={name}
                            onChangeText={handleNameTaskChange}>

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

export default AdicionarTask;