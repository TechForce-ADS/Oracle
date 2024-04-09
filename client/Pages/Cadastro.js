import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import Logo from '../img/LogoSemFundo.png';
import MenuIcon from '../img/menu.png';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


const Cadastro = ({ navigation }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [sexo, setSexo] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Masculino', value: 'masculino'},
        {label: 'Feminino', value: 'feminino'},
        {label: 'Outro', value: 'outro'}
    ]);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
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
                    <TextInput style={styles.inputNome}>
                    </TextInput>
                </View>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Sobrenome:</Text>
                    <TextInput style={styles.inputNome}>
                    </TextInput>
                </View>
            </View>



            <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: '65%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Email:</Text>
                    <TextInput style={styles.inputNome}>
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
                    zIndex={1000} // Garantir que o dropdown fique acima de outros componentes
                    zIndexInverse={1000}
                    placeholder="Sexo hihi"
                />
                </View>
            </View>
            <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Numero:</Text>
                    <TextInput style={styles.inputNome}>
                    </TextInput>
                </View>
                <View style={{ width: '50%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>CPF:</Text>
                    <TextInput style={styles.inputNome}>
                    </TextInput>
                </View>
            </View>
            <View style={{ width: '100%', height: 100, display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: '100%', height: 100, justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '100' }}>Endereço:</Text>
                    <TextInput style={styles.inputNome}>
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: '#BDB46A', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '100' }}>Cadastrar</Text>
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

export default Cadastro;
