import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import {IP} from '@env';
import Navbar from '../Components/Navbar';

const generateRandomColor = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
};

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);
  const [completedCounts, setCompletedCounts] = useState({ trueCount: 0, falseCount: 0 });
  const [completedTasksPercentage, setCompletedTasksPercentage] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const adminResponse = await fetch(`http://${IP}:3001/api/admin/adminCount`);
          if (!adminResponse.ok) {
            throw new Error('Error fetching admin count');
          }
          const adminCount = await adminResponse.json();
          setAdminCount(adminCount);

          const partnerResponse = await fetch(`http://${IP}:3001/api/partners/partnerCount`);
          if (!partnerResponse.ok) {
            throw new Error('Error fetching partner count');
          }
          const partnerCount = await partnerResponse.json();
          setPartnerCount(partnerCount);

          const expertiseResponse = await fetch(`http://${IP}:3001/api/expertise/completedCounts`);
          if (!expertiseResponse.ok) {
            throw new Error('Error fetching expertise completed counts');
          }
          const counts = await expertiseResponse.json();
          setCompletedCounts(counts);

          const completedTasksResponse = await fetch(`http://${IP}:3001/api/partners/trackParticipationPercentage`);
          if (!completedTasksResponse.ok) {
            throw new Error('Error fetching completed tasks percentage');
          }
          const completedTasksPercentage = await completedTasksResponse.json();
          setCompletedTasksPercentage(completedTasksPercentage);
        } catch (error) {
          console.error('Failed to load dashboard:', error);
          Alert.alert('Error', 'Failed to load dashboard');
        }
      }
      fetchData();
    }, [])
  );


  const colorPalette = [
    '#FF5733', '#FFC300', '#36DBCA', '#5F27CD', '#33FF57', '#FF33B8', '#33B8FF', '#AA33FF', '#33FFD8', '#A633FF'
  ];

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Quantidade de Administradores e Parceiros</Text>
        <BarChart
          data={{
            labels: ['Administradores', 'Parceiros'],
            datasets: [{
              data: [parseInt(adminCount), parseInt(partnerCount)],
            }],
          }}
          width={350}
          height={220}
          yAxisSuffix=""
          yAxisInterval={1}
          fromZero={true}
          showValuesOnTopOfBars={true}
          chartConfig={{
            backgroundGradientFrom: '#ddd',
            backgroundGradientTo: '#ddd',
            color: (opacity = 2) => `rgba(249, 0, 9, ${opacity})`,
            strokeWidth: 4,
            formatYLabel: () => '',
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.barTotalContainer}>
          <Text style={styles.barTotal}>{adminCount}</Text>
          <Text style={styles.barTotal}>{partnerCount}</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Numero de expertises completas</Text>
        <BarChart
          data={{
            labels: ['Completas', 'Incompleto'],
            datasets: [{
              data: [completedCounts.trueCount, completedCounts.falseCount],
            }],
          }}
          width={350}
          height={220}
          yAxisSuffix=""
          yAxisInterval={1}
          fromZero={true}
          showValuesOnTopOfBars={true}
          chartConfig={{
            backgroundGradientFrom: '#ddd',
            backgroundGradientTo: '#ddd',
            color: (opacity = 2) => `rgba(0, 150, 249, ${opacity})`,
            strokeWidth: 4,
            formatYLabel: () => '', 
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.barTotalContainer}>
          <Text style={styles.barTotal}>{completedCounts.trueCount}</Text>
          <Text style={styles.barTotal}>{completedCounts.falseCount}</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Porcentagem de Parceiros por Expertise</Text>
        <PieChart
          data={completedTasksPercentage.map((item, index) => ({
            name: item.expertiseName || '', 
            population: item.percentage,
            color: colorPalette[index % colorPalette.length], 
            legendFontColor: "#FFF",
            legendFontSize: 15,
          }))}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ddd',
            backgroundGradientTo: '#ddd',
            color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
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
  barTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 350,
    marginTop: 8,
  },
  barTotal: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Poppins_400Regular',
  },
});
