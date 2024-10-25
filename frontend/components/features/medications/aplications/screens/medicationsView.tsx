import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const medications = [
  { id: '1', name: 'Paracetamol', dose: '1' },
  { id: '2', name: 'Ibuprofeno', dose: '1' },
  { id: '3', name: 'Amoxicilina', dose: '1' },
  { id: '4', name: 'Paracetamol', dose: '1' },
  { id: '6', name: 'Ibuprofeno', dose: '1' },
  { id: '5', name: 'Amoxicilina', dose: '1' },
];

export const MedicationsView = () => {
  const handleEdit = (id: string) => {
    console.log(`Editar medicamento con ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Eliminar medicamento con ID: ${id}`);
  };

  const renderItem = ({ item }: { item: { id: string, name: string, dose: string } }) => (
    <View style={styles.card}>
      <Text style={styles.time}>12:00</Text>
      <Text style={styles.medicationName}>{item.name}</Text>
      <Text style={styles.doseText}>Dosis: {item.dose}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MEDICAMENTOS</Text>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12, 
    color: 'white',
  },
  medicationName: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 4,
  },
  doseText: {
    fontSize: 14, 
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
