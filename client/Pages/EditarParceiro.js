import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput, Alert } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import DropDownPicker from 'react-native-dropdown-picker';


const EditarParceiro = ({ navigation, route }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [sexo, setSexo] = useState(null);
    const [partnerData, setPartnerData] = useState(route.params?.partnerToEdit || {});
    const [email, setEmail] = useState(partnerData.email || '');
    const [name, setName] = useState(partnerData.name || '');
    const [lastName, setLastName] = useState(partnerData.lastName || '');
    const [number, setNumber] = useState(partnerData.number || '');
    const [cpf, setCpf] = useState(partnerData.cpf || '');
    const [address, setAddress] = useState(partnerData.address || '');

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Masculino', value: 'masculino'},
        {label: 'Feminino', value: 'feminino'},
        {label: 'Outro', value: 'outro'}
    ]);



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
    
    
      const handleUpdate = async () => {
        const ip = "192.168.15.99";
        try {
            const response = await fetch(`http://${ip}:3001/api/partners/update/${partnerData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, lastName, number, sexo, cpf, address }),
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
        <View style={{ flex: 1, backgroundColor: '#312D2A', alignItems: 'center' }}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <TouchableOpacity onPress={toggleMenu}>
                    <Image source={MenuIcon} style={styles.menuIcon} />
                </TouchableOpacity>
            </View>

            {menuAberto && (
                <View style={styles.menu}>

                    <Text style={styles.MenuText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar novo Parceiro</Text>
                    <Text style={styles.MenuText} onPress={() => navigation.navigate('TelaLista') }>Lista de Parceiros</Text>
                    <Text style={styles.MenuText}>Menu Item 3</Text>
                    <Text style={styles.MenuText}>Menu Item 4</Text>

                </View>
            )}

            <View style={{ width: '100%', height: 50, padding: 12 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 20, }}>Cadastrar novo Parceiro</Text>
            </View>
            <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Nome:</Text>
                    <TextInput style={styles.inputNome}
                       placeholder='Nome'  
                       value={name}    
                       onChangeText={handleNameChange}              
                    >
                    </TextInput>
                </View>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Sobrenome:</Text>
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
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Email:</Text>
                    <TextInput style={styles.inputNome}
                    placeholder='Email'
                    value={email}
                    onChangeText={handleEmailChange}
                    >
                    </TextInput>
                </View>
                <View style={{ width: '35%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Sexo:</Text>
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
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Numero:</Text>
                    <TextInput style={styles.inputNome}
                    placeholder='Número'
                    value={number}
                    onChangeText={handleNumberChange}
                    >
                    </TextInput>
                </View>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>CPF:</Text>
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
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Endereço:</Text>
                    <TextInput style={styles.inputNome}
                    placeholder='Endereço'
                    value={address}
                    onChangeText={handleAddressChange}
                    >
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity onPress={handleUpdate} style={{ width: 150, height: 40, backgroundColor: '#BDB46A', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '100' }}>Editar</Text>
            </TouchableOpacity>
        </View>






    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#E32124',
        width: '100%',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 25,
        resizeMode: 'contain',
    },

    menuIcon: {
        width: 25,
        height: 25,
    },

    menu: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: '100%',
        height: 200,
        backgroundColor: '#E32124',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        zIndex: 2024,


    },

    MenuText: {
        color: 'white'
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
        borderRadius: 9
    },
    dropdown: {
        backgroundColor: '#DCDCDC',
        borderRadius: 9,
        minHeight:40,
    },


});

export default EditarParceiro;