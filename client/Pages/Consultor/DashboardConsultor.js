import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { IP } from '@env';
import Navbar from '../../Components/NavbarConsultor';



const Legend = ({ data }) => {
  return (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.population}% {item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState(0);
  const [partnerCount, setPartnerCount] = useState(0);
  const [consultantCount, setConsultantCount] = useState(0);
  const [completedCounts, setCompletedCounts] = useState({ trueCount: 0, falseCount: 0 });
  const [completedTasksPercentage, setCompletedTasksPercentage] = useState([]);
  const [topPartners, setTopPartners] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const [adminCount,consultantCount ,partnerCount, counts, completedTasksPercentage, topPartners] = await Promise.all([
            fetch(`http://${IP}:3001/api/admin/adminCount`).then(res => res.json()),
            fetch(`http://${IP}:3001/api/admin/consultantCount`).then(res => res.json()),
            fetch(`http://${IP}:3001/api/partners/partnerCount`).then(res => res.json()),
            fetch(`http://${IP}:3001/api/expertise/completedCounts`).then(res => res.json()),
            fetch(`http://${IP}:3001/api/partners/trackParticipationPercentage`).then(res => res.json()),
            fetch(`http://${IP}:3001/api/partners/topPartners`).then(res => res.json()),
          ]);

          setAdminCount(adminCount);
          setConsultantCount(consultantCount);
          setPartnerCount(partnerCount);
          setCompletedCounts(counts);
          setCompletedTasksPercentage(completedTasksPercentage);
          setTopPartners(topPartners);


   
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

  const pieChartData = completedTasksPercentage.map((item, index) => ({
    name: item.expertiseName,
    population: parseFloat(item.percentage.toFixed(0)),
    color: colorPalette[index % colorPalette.length],
    legendFontColor: "#FFF",
    legendFontSize: 13,
  }));

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Quantidade de Administradores e Parceiros</Text>
          <BarChart
            data={{
              labels: ['Administradores', 'Parceiros', 'Consultores'],
              datasets: [{
                data: [(parseInt(adminCount) - parseInt(consultantCount)), parseInt(partnerCount),parseInt(consultantCount)],
              }],
            }}
            width={350}
            height={220}
            yAxisSuffix=""
            yAxisInterval={1}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
            <Text style={styles.barTotal}>{consultantCount}</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Número de expertises completas</Text>
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
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
          <View style={styles.pieChartContainer}>
            <PieChart
              data={pieChartData}
              width={200}
              height={150}
              chartConfig={{
                backgroundGradientFrom: '#ddd',
                backgroundGradientTo: '#ddd',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={false} // Remove default legend
            />
          </View>
          <Legend data={pieChartData} />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Top 5 Parceiros com Mais Tarefas Completas</Text>
          <BarChart
            data={{
              labels: topPartners.map(partner => partner.nameFantasia),
              datasets: [{
                data: topPartners.map(partner => partner.completedTasks.length),
              }],
            }}
            width={350}
            height={220}
            yAxisSuffix=""
            yAxisInterval={1}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 4,
              formatYLabel: () => '',
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
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
  pieChartContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  legendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#FFF',
  },
});