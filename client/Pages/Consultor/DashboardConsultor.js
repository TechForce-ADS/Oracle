import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';   
import { BarChart } from 'react-native-chart-kit';
import {IP} from "@env";
import { useFocusEffect } from '@react-navigation/native';  

import Navbar from '../../Components/NavbarConsultor';

export default function DashboardConsultor({ navigation, route })  {
  const [adminCount, setAdminCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const adminResponse = await fetch(`http://${IP}:3001/api/admin/adminCount`);
          if (!adminResponse.ok) {
            throw new Error('Erro ao buscar quantidade de administradores');
          }
          const adminCount = await adminResponse.json();
          setAdminCount(adminCount);

          const partnerResponse = await fetch(`http://${IP}:3001/api/partners/partnerCount`);
          if (!partnerResponse.ok) {
            throw new Error('Erro ao buscar quantidade de ');
          }
          const partnerCount = await partnerResponse.json();
          setPartnerCount(partnerCount);

        } catch (error) {
          console.error('Não foi possível carregar dashboard:', error);
          Alert.alert('Erro', 'Não foi possível carregar dashboard');
        }
      }

      fetchData();

    }, [])
  );

  return (
    <View style={styles.container}>
      <Navbar />
      
      <View style={styles.chartContainer}>
  <Text style={styles.chartTitle}>Quantidade de Administradores e Partners</Text>
  <BarChart
    data={{
      labels: ['Administradores', 'Parceiros'],
      datasets: [
        {
          data: [parseInt(adminCount), parseInt(partnerCount)],
        },
      ],
    }}
    width={350}
    height={220}
    yAxisSuffix=""
    yAxisInterval={1} // Definir o intervalo do eixo y como 1 para mostrar apenas números inteiros
    fromZero={true} // Isso faz com que o gráfico comece em 0
    chartConfig={{
      backgroundGradientFrom: '#ddd',
      backgroundGradientTo: '#ddd',
      color: (opacity = 2) => `rgba(249, 0, 9, ${opacity})`, // Cor laranja
      strokeWidth: 4,
      formatYLabel: (label) => parseInt(label),
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2120',
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chartTitle: { 
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    fontFamily: 'Poppins_700Bold',
  },
});