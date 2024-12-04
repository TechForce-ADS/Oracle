import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

function Checkbox({ label, onChange, defaultValue }) {
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (newChecked) {
      setSelectedDate(moment().format('DD/MM/YYYY'));
    } else {
      setSelectedDate(null);
    }
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <View style={styles.checkboxContainer}>
      <Pressable style={styles.checkbox} onPress={handleCheckboxChange}> 
        {defaultValue ? (
          <Ionicons name="checkbox-outline" size={24} color="white" />
        ) : (
          <Ionicons name="square-outline" size={24} color="white" />
        )}
        <Text style={styles.checkboxLabel}>{label}</Text>
      </Pressable>
     
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  dateText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Checkbox;
