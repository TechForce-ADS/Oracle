import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Navbar from '../Components/NavbarAdmin';
import { IP } from "@env";
import User from '../img/User.png';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Importando expo-sharing para compartilhar o PDF



const Relatorio = ({ route }) => {
    const [partnerData, setPartnerData] = useState(route.params?.partnerToSee || {});
    const [partnerExpertises, setPartnerExpertises] = useState([]);
    const [taskNames, setTaskNames] = useState([]);

    const tasks = partnerData.completedTasks;
    const partnerId = partnerData._id;

    const downloadPDF = async () => {
        try {
        
            const htmlContent = `
                <html>
            <head>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #333;
                        line-height: 1.6;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        padding: 20px;
                    }
                    .header, .section-title {
                        text-align: center;
                        margin: 20px 0;
                    }
                    .header h1 {
                        font-size: 2.5em;
                        margin-bottom: 10px;
                        color: #4CAF50;
                    }
                    .User {
                        background: #f9f9f9;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .User h2 {
                        font-size: 2em;
                        color: #2196F3;
                    }
                    .User p {
                        font-size: 1.2em;
                        margin: 5px 0;
                    }
                    .heading {
                        font-weight: bold;
                        color: #555;
                    }
                    .Info {
                        color: #777;
                    }
                    .divider {
                        display: flex;
                        align-items: center;
                        margin: 20px 0;
                    }
                    .divider div {
                        flex: 1;
                        height: 2px;
                        background-color: #ccc;
                    }
                    .divider p {
                        margin: 0 10px;
                        font-size: 1.2em;
                        color: #888;
                    }
                    .expertises, .tasks {
                        margin: 20px 0;
                    }
                    .expertises p, .tasks p {
                        font-size: 1.1em;
                        padding: 5px 0;
                        border-bottom: 1px solid #eee;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Relatório de Dados do Parceiro</h1>
                    </div>
                    <div class="User">
                        <h2>${partnerData.nameFantasia}</h2>
                        <p class="SubTitulo">${partnerData.nivel}</p>
                        <p class="heading">Nome Empresa: <span class="Info">${partnerData.nameFantasia}</span></p>
                        <p class="heading">Nome Responsável: <span class="Info">${partnerData.nameResponsavel}</span></p>
                        <p class="heading">Email: <span class="Info">${partnerData.email}</span></p>
                        <p class="heading">CNPJ: <span class="Info">${partnerData.cnpj}</span></p>
                    </div>

                    <div class="divider">
                        <div></div>
                        <p>Expertises</p>
                        <div></div>
                    </div>
                    <div class="expertises">
                        ${partnerExpertises.map(expertise => `
                            <p>${expertise.expertiseName}</p>
                        `).join('')}
                    </div>

                    <div class="divider">
                        <div></div>
                        <p>Certificações</p>
                        <div></div>
                    </div>
                    <div class="tasks">
                        ${taskNames.map(taskName => `
                            <p>${taskName}</p>
                        `).join('')}
                    </div>
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
        width: '100%',
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
