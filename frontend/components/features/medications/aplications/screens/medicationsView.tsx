import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

export const MedicationsView = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  interface Medication {
    id: string;
    name: string;
    quantity: number; // Cambiado a quantity según la respuesta del backend
    schedules: { id: string; start_time: string; interval_hours: number; finish_dose_time: string }[]; // Añadido finish_dose_time
  }

  // Cargar medicamentos desde el backend
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const userId = await AsyncStorage.getItem('id');
        if (!token || !userId) {
          console.error('No token or user ID found');
          return;
        }
  
        const response = await fetch(`${BACKEND_URL}/medications/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched medications:', data);  // Verifica los datos que recibes aquí
          setMedications(data);
        } else {
          console.error('Error fetching medications', await response.json());
        }
      } catch (error) {
        console.error('Error fetching medications', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMedications();
  }, []);
  

  // Manejar la edición de medicamentos
  const handleEdit = (id: string) => {
    console.log(`Editar medicamento con ID: ${id}`);
    // Aquí deberías navegar al formulario de edición con los datos del medicamento
    // Por ejemplo, utilizando React Navigation
  };

  // Manejar la eliminación de medicamentos
  const handleDelete = async (id: string) => {
    console.log(`Eliminar medicamento con ID: ${id}`);
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch(`${BACKEND_URL}/medications/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMedications((prevMedications) =>
          prevMedications.filter((medication) => medication.id !== id)
        );
        console.log('Medication deleted successfully');
      } else {
        console.error('Error deleting medication', await response.json());
      }
    } catch (error) {
      console.error('Error deleting medication', error);
    }
  };

  const renderItem = ({ item }: { item: Medication }) => (
    <View style={styles.card}>
      {item.schedules.map((schedule) => (
        <Text key={schedule.id} style={styles.time}>
          {new Date(schedule.start_time).toLocaleTimeString()} - Intervalo: {schedule.interval_hours} horas
        </Text>
      ))}
      <Text style={styles.medicationName}>{item.name}</Text>
      <Text style={styles.doseText}>Cantidad: {item.quantity}</Text>  {/* Cambiado a quantity en lugar de dose */}
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
      {loading ? (
        <Text>Cargando medicamentos...</Text>
      ) : (
        <FlatList
          data={medications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
