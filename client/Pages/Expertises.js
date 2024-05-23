import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Navbar from '../Components/Navbar';

import {IP} from "@env";


const Expertise = ({ route, navigation}) => {

    const [expertises, setExpertises] = useState([]);
    const [partnerData, setPartnerData] = useState(route.params?.partnerExpertise || {});
    const idPartner = partnerData._id;
    const registerExpertise = async (partnerId, expertiseId) => {
        try {
            const response = await fetch(`http://${IP}:3001/api/expertise/registerPartnersExpertise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    partner_id: partnerId,
                    expertise_id: expertiseId,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao registrar expertise para o parceiro');
            }
    
            const data = await response.json();
            console.log(data);
    
            // Assuming `navigation` is passed as a prop
            navigation.navigate('Informacoes', { partnerToSee: partnerData });
            
        } catch (error) {
            console.error('Erro ao registrar expertise para o parceiro:', error);
            Alert.alert('Erro', 'Não foi possível registrar a expertise para o parceiro');
        }
    };
    

   
    

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://${IP}:3001/api/expertise/expertisesList`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar partners');
                }
                const data = await response.json();
                setExpertises(data);
            } catch (error) {
                console.error('Erro ao buscar partners:', error);
                Alert.alert('Erro', 'Não foi possível carregar a lista de parceiros');
            }
        }
        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#1c2120', alignItems: 'center' }}>
            <Navbar />
            {expertises.map((expertise) => (
                <TouchableOpacity key={expertise._id} onPress={() => registerExpertise(idPartner, expertise._id)}>
                    <View style={styles.tarefa}>
                        <View style={styles.TextName}>
                            <Text style={{ fontSize: 18, color: '#FFF', letterSpacing: 1, fontFamily: 'Poppins_300Light' }}>
                                {expertise.title}
                            </Text >
                            <Text  style={{ fontSize: 12, color: '#FFF', fontFamily: 'Poppins_700Bold' }}>
                                Inscrever
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};


const styles = StyleSheet.create({

    tarefas: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',


    },


    TextName: {
        width: '100%',
   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },

    ProgressBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },

    tarefa: {
        backgroundColor: '#584848',
        width: 350,
        height: 75,
        borderRadius: 22,
        padding: 12,
        borderWidth: 1.3,
        borderColor: '#7b7574',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    tituloTask: {
        fontFamily: 'Poppins_300Light',
        color: '#fff',
        fontSize: 16
    },

});

export default Expertise;
