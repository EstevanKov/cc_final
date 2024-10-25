import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Link } from "expo-router";


export function CreateMedicationsView() {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');

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
        <TextInput
          style={styles.input}
          placeholder="Dosis a tomar"
          value={dose}
          onChangeText={setDose}
        />
        <View style={styles.buttonContainer}>
          <Button title="Agregar Medicamentos" onPress={() => {}} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={() => {}} />
        </View>
        {/** <Link href="/auth/login" style={styles.link}>Ir al login</Link>*/}
        
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
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16 },
});
