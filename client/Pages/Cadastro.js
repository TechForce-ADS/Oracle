import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

const Cadastro = ({ navigation }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [sexo, setSexo] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
        { label: 'Outro', value: 'outro' }
    ]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleLastNameChange = (text) => {
        setLastName(text);
    };

    const handleNumberChange = (text) => {
        setNumber(text);
    };

    const handleCpfChange = (text) => {
        setCpf(text);
    };

    const handleAddressChange = (text) => {
        setAddress(text);
    };


    const handleRegister = async () => {
        const ip = "192.168.15.99"
        try {
            const response = await fetch(`http://${ip}:3001/api/partners/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, lastName, number, sexo, cpf, address }),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('TelaLista');
            } else {
                // Handle login failure
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            Alert.alert('Error', 'Internal server error');
        }
    };

    return (

        <View style={{ flex: 1, backgroundColor: '#1C2120', alignItems: 'center' }}>

            <View style={styles.header}>
            
                <TouchableOpacity onPress={toggleMenu}>
                    <Image source={MenuIcon} style={styles.menuIcon} />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
            </View>

            {menuAberto && (
                <View style={styles.menu}>

                    <Text style={styles.MenuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
                    <Text style={styles.MenuText} onPress={() => navigation.navigate('TelaLista')}>Lista de Parceiros</Text>
                    <Text style={styles.MenuText}>Menu Item 3</Text>
                    <Text style={styles.MenuText}>Menu Item 4</Text>

                </View>
            )}
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 10, marginLeft: 12, }} />
                    <View>
                        <Text style={{ width: 175, textAlign: 'center', fontFamily: 'Poppins_300Light', color: '#fff' }}>Cadastro de parceiro</Text>
                    </View>
                    <View style={{ width: 95, height: 2, backgroundColor: 'white', marginRight: 12, marginLeft: 10, }} />
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
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Sobrenome:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Sobrenome'
                            value={lastName}
                            onChangeText={handleLastNameChange}
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
                        <Text style={styles.label}>Sexo:</Text>
                        <DropDownPicker
                            open={open}
                            value={sexo}
                            items={items}
                            setOpen={setOpen}
                            setValue={setSexo}
                            setItems={setItems}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            zIndex={1000}
                            zIndexInverse={1000}
                            placeholder="Sexo"
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Numero:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Número'
                            value={number}
                            onChangeText={handleNumberChange}
                        >
                        </TextInput>
                    </View>
                    <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>CPF:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='CPF'
                            value={cpf}
                            onChangeText={handleCpfChange}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: '100%', height: 100, justifyContent: 'center', padding: 12 }}>
                        <Text style={styles.label}>Endereço:</Text>
                        <TextInput style={styles.inputNome}
                            placeholder='Endereço'
                            value={address}
                            onChangeText={handleAddressChange}
                        >
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
    header: {
        backgroundColor: '#50100c',
        width: '100%',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
      },
      logo: {
        width: 110,
        height: 25,
        resizeMode: 'contain',
    marginLeft:85
      },

      menuIcon: {
        width: 50,
        height: 50,
      },
    menu: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: '100%',
        height: 200,
        backgroundColor: '#50100c',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        zIndex: 2024,
    
    
      },
    
      MenuText: {
        color: 'white',
        fontFamily: 'Poppins_300Light',
        fontSize:16
      },


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



});

export default Cadastro;