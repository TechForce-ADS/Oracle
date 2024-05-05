import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';   
import { BarChart } from 'react-native-chart-kit';
import { ip } from "@env";
import { useFocusEffect } from '@react-navigation/native';  

import Navbar from '../Components/Navbar';

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const adminResponse = await fetch(`http://${ip}:3001/api/admin/adminCount`);
          if (!adminResponse.ok) {
            throw new Error('Erro ao buscar quantidade de administradores');
          }
          const adminCount = await adminResponse.json();
          setAdminCount(adminCount);

          const partnerResponse = await fetch(`http://${ip}:3001/api/partners/partnerCount`);
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
    labels: ['Administradores', 'Partners'],
    datasets: [
      {
        data: [adminCount, partnerCount],
      },
    ],
  }}
  width={350}
  height={220}
  yAxisSuffix=""
  yAxisInterval={1} // Definir o intervalo do eixo y como 1 para mostrar apenas números inteiros
  fromZero={true} // Isso faz com que o gráfico comece em 0
  chartConfig={{
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 4,
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
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
    fontFamily: 'Poppins_700Bold',
  },
});
