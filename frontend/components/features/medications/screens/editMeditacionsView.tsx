import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

// Aseguramos que medicationId pueda ser null o un string
export function EditMedicationsView({ navigation }: { navigation: any }) {
  const [medicationId, setMedicationId] = useState<string | null>(null); // Estado para el id del medicamento
  const [name, setName] = useState('');
  const [pillCount, setPillCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar el id del medicamento desde AsyncStorage
    const loadMedicationId = async () => {
      try {
        const storedMedicationId = await AsyncStorage.getItem('medicationId');
        if (storedMedicationId) {
          setMedicationId(storedMedicationId); // Ahora es válido asignar un string a medicationId
        }
      } catch (error) {
        console.error('Error al obtener el id del medicamento desde AsyncStorage', error);
      }
    };

    loadMedicationId();
  }, []);

  useEffect(() => {
    if (medicationId) {
      fetchMedicationDetails();
    }
  }, [medicationId]);

  const fetchMedicationDetails = async () => {
    const token = await AsyncStorage.getItem('access_token');
    const response = await fetch(`${BACKEND_URL}/medications/${medicationId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const medicationData = await response.json();
      setName(medicationData.name);
      setPillCount(medicationData.quantity);
      setIntervalHours(medicationData.intervalo);
      setEndDate(new Date(medicationData.finish_time));

      if (isNaN(new Date(medicationData.finish_time).getTime())) {
        console.error('Fecha de término inválida recibida del backend');
        setEndDate(new Date()); // Usa la fecha actual si no es válida
      }} else {
      console.error('Error al cargar los detalles del medicamento');
    }
  };

  const handleEditMedication = async () => {
    if (loading) return; // Evitar múltiples clics
    setLoading(true);

    const token = await AsyncStorage.getItem('access_token');
    const userId = await AsyncStorage.getItem('id');

    // Asegurarse de que endDate sea válida antes de convertir
    if (isNaN(endDate.getTime())) {
      console.error('Fecha de término inválida', endDate);
      setSuccessMessage('Error en la fecha de término');
      setLoading(false);
      return;
    }

    const updatedMedicationData = {
      name,
      quantity: pillCount,
      intervalo: intervalHours,
      finish_time: endDate.toISOString(),
      user: userId,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/medications/editWithSchedule/${medicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMedicationData),
      });

      if (response.ok) {
        setSuccessMessage('Medicamento editado exitosamente');
        navigation.goBack(); // Volver a la pantalla anterior después de editar
      } else {
        console.error('Error al editar el medicamento', await response.json());
        setSuccessMessage('Error al editar el medicamento');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      setSuccessMessage('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>EDITAR MEDICAMENTO</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Cantidad de pastillas</Text>
        <Picker
          selectedValue={pillCount}
          style={styles.input}
          onValueChange={(itemValue) => setPillCount(Number(itemValue))}
        >
          {[...Array(30).keys()].map((i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Intervalo (Horas)</Text>
        <Picker
          selectedValue={intervalHours}
          style={styles.input}
          onValueChange={(itemValue) => setIntervalHours(Number(itemValue))}
        >
          {[...Array(24).keys()].map((i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        <Text style={styles.label}>Fecha de término calculada</Text>
        <Text style={styles.dateText}>
          {endDate.toLocaleString()}
        </Text>

        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Guardar Cambios" onPress={handleEditMedication} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 80,
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});