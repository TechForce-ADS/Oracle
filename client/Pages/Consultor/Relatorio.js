import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Navbar from '../../Components/NavbarConsultor';
import { IP } from "@env";
import User from '../../img/User.png';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Importando expo-sharing para compartilhar o PDF



const Relatorio = ({ route, navigation }) => {
    const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
    const [partnerExpertises, setPartnerExpertises] = useState([]);
    const [taskNames, setTaskNames] = useState([]);

    const tasks = partnerData.completedTasks;
    const partnerId = partnerData._id;

    const downloadPDF = async () => {
        try {
            // Cria o HTML com as informações da página
            const htmlContent = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Poppins_300Light';
                          
                        }
                      
                        /* Adicione outros estilos conforme necessário */
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="User">
                        <h1> Relatorio de dados do parceiro </h1>
                           
                            <h2 class="NomePrincipal">${partnerData.nameFantasia}</h2>
                            <p class="SubTitulo">${partnerData.nivel}</p>
                            <p class="heading">Nome Empresa: <span class="Info">${partnerData.nameFantasia}</span></p>
                            <p class="heading">Nome Responsavel: <span class="Info">${partnerData.nameResponsavel}</span></p>
                            <p class="heading">Email: <span class="Info">${partnerData.email}</span></p>
                            <p class="heading">CNPJ: : <span class="Info">${partnerData.cnpj}</span></p>
                        </div>
    
                        <div style="margin-top: 20px;">
                            <div style="flex-direction: row; align-items: center; margin-top: 50px; display:flex; widht: 100%; align-itens:center; ">
                                <!-- Expertises -->
                                <div style="width: 100px; height: 2px; background-color: black; margin-left: 12px; margin-right: 12px;"></div>
                                <div>
                                    <p style="width: 100px; text-align: center;">Expertises</p>
                                </div>
                                <div style="width: 100px; height: 2px; background-color: black; margin-right: 12px; margin-left: 12px;"></div>
                            </div>
                            ${partnerExpertises.map(expertise => `
                                <div>
                                    <p style="font-family: 'Poppins_300Light'; font-size: 16px;">${expertise.expertiseName}</p>
                                </div>
                            `).join('')}
                        </div>
    
                        <div style="flex-direction: row; align-items: center; margin-top: 50px; display:flex;">
                            <!-- Tasks Completadas -->
                            <div style="width: 100px; height: 2px; background-color: black; margin-left: 12px; margin-right: 12px;"></div>
                            <div>
                                <p style="width: 100px; text-align: center;">Tasks Completadas</p>
                            </div>
                            <div style="width: 100px; height: 2px; background-color: black; margin-right: 12px; margin-left: 12px;"></div>
                        </div>
                        ${taskNames.map(taskName => `
                            <div>
                                <p style="font-family: 'Poppins_300Light'; font-size: 14px;">${taskName}</p>
                            </div>
                        `).join('')}
                    </div>
                </body>
                </html>
            `;

            // Gera o PDF
            const pdfUri = FileSystem.cacheDirectory + 'relatorio.pdf';
            await FileSystem.writeAsStringAsync(pdfUri, htmlContent, { encoding: FileSystem.EncodingType.UTF8 });

            // Mostra um alerta de sucesso
            Alert.alert('PDF gerado com sucesso', `PDF salvo em: ${pdfUri}`);

            // Compartilha o PDF (opcional)
            await Sharing.shareAsync(pdfUri);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            Alert.alert('Erro', 'Não foi possível gerar o PDF');
        }
    };
    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (tasks && tasks.length > 0) {
                try {
                    const response = await fetch(`http://${IP}:3001/api/task/details`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ taskIds: tasks }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch task details');
                    }

                    const taskDetails = await response.json();
                    const taskNames = taskDetails.map(task => task.name);
                    setTaskNames(taskNames);
                } catch (error) {
                    console.error('Error fetching task details:', error);
                }
            }
        };

        const fetchPartnerExpertises = async () => {
            try {
                const response = await fetch(`http://${IP}:3001/api/partners/${partnerId}/expertises`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar expertises do parceiro');
                }
                const data = await response.json();
                setPartnerExpertises(data);
            } catch (error) {
                console.error('Erro ao buscar expertises do parceiro:', error);
                Alert.alert('Erro', 'Não foi possível carregar as expertises do parceiro');
            }
        };

        fetchTaskDetails();
        fetchPartnerExpertises(); // Não é necessário passar o partnerId aqui
    }, [tasks, partnerId]);

    const vizualizar = (expertise) => {
        // Aqui você pode definir o que acontece ao visualizar uma expertise
        // Por exemplo, navegar para a tela de detalhes da expertise
        console.log('Visualizar expertise:', expertise);
    };

    const renderExpertises = () => {
        return partnerExpertises.map((expertise, index) => (
            <TouchableOpacity key={index} style={styles.expertise} onPress={() => vizualizar(expertise)}>
                <Text style={{ color: '#FFF', fontFamily: 'Poppins_300Light', fontSize: 16 }}>{expertise.expertiseName}</Text>
            </TouchableOpacity>
        ));
    };
    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView>
                <View style={styles.User}>
                    <Image source={User} />
                    <Text style={styles.NomePrincipal}>{partnerData.nameFantasia}</Text>
                    <Text style={styles.SubTitulo}>{partnerData.nivel}</Text>
                    <Text style={styles.heading}>Nome Empresa: <Text style={styles.Info}>{partnerData.nameFantasia}</Text></Text>
                    <Text style={styles.heading}>Nome Responsavel: <Text style={styles.Info}>{partnerData.nameResponsavel}</Text></Text>
                    <Text style={styles.heading}>Email: <Text style={styles.Info}>{partnerData.email}</Text></Text>
                    <Text style={styles.heading}>CNPJ: : <Text style={styles.Info}>{partnerData.cnpj}</Text></Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                        <View style={{ width: 100, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
                        <View>
                            <Text style={{ width: 100, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Expertises</Text>
                        </View>
                        <View style={{ width: 100, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
                    </View>
                    {renderExpertises()}
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', marginLeft: 12, marginRight: 12 }} />
                    <View>
                        <Text style={{ width: 100, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Tasks Completadas</Text>
                    </View>
                    <View style={{ width: 100, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 12, }} />
                </View>
                <View>
                    {taskNames.map((taskName, index) => (
                        <View key={index} style={styles.expertise}>
                            <Text key={index} style={styles.taskName}>{taskName}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={downloadPDF} style={{ backgroundColor: '#50100c', padding: 10, borderRadius: 8 }}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins_300Light' }}>Baixar PDF</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c2120',
        alignItems: 'center',
    },
    taskName: {
        color: '#FFF',
        fontFamily: 'Poppins_300Light',
        fontSize: 14,
    },
    BTNvoltar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: 80,
        left: 20,
        zIndex: 200022,
        backgroundColor: '#50100c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expertise: {
        backgroundColor: '#584848',
        width: 350,
        height: 70,
        borderRadius: 22,
        borderWidth: 1.3,
        borderColor: '#7b7574',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    User: {
        width: '90%',
        height: 270,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    heading: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 8,
        fontFamily: 'Poppins_300Light'
    },
    NomePrincipal: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900'
    },
    SubTitulo: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins_300Light'
    },
});

export default Relatorio;
