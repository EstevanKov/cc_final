import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CreateMedicationsView() {
  const [name, setName] = useState('');
  const [pillCount, setPillCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    calculateEndDate();
  }, [pillCount, intervalHours]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000); // Eliminar el mensaje después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const calculateEndDate = () => {
    const currentDate = new Date();
    const intervalInMilliseconds = intervalHours * 3600 * 1000; // Convertir horas a milisegundos
    const totalTime = (pillCount - 1) * intervalInMilliseconds; // Tiempo total para todas las dosis
    const calculatedEndDate = new Date(currentDate.getTime() + totalTime); // Fecha de término
    setEndDate(calculatedEndDate);
  };

  const [loading, setLoading] = useState(false);

const handleAddMedication = async () => {
  if (loading) return; // Evitar múltiples clics
  setLoading(true);

  const token = await AsyncStorage.getItem("access_token");
  const id = await AsyncStorage.getItem("id");

  const medicamentoData = {
    name,
    quantity: pillCount,
    intervalo: intervalHours, 
    finish_time: endDate.toISOString(),
    user: id,
  };

  try {
    const response = await fetch(`${BACKEND_URL}/medications/addWithSchedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(medicamentoData),
    });

    if (response.ok) {
      setSuccessMessage("Medicamento añadido exitosamente");
      setName('');
      setPillCount(1);
      setIntervalHours(1);
      setEndDate(new Date());
    } else {
      console.error("Error al añadir el medicamento", await response.json());
    }
  } catch (error) {
    console.error("Error en la solicitud", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AÑADIR MEDICAMENTOS</Text>

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
          {[...Array(10).keys()].map((i) => (
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
          <Button title="Agregar Medicamentos" onPress={handleAddMedication} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={() => {}} />
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
    fontWeight: "bold",
    marginBottom: 16,
  },
});
