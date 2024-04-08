import React from 'react';


import { View, Button, Text } from 'react-native';

const Home = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#312D2A' }}>

    <Button 
      title="Ir para Login"
      onPress={() => navigation.navigate('Login') }
    />
  </View>
);

Home.navigationOptions = {
  title: 'Home',
}





export default Home;