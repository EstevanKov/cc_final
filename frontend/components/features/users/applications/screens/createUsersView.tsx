import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from "expo-router";
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export const CreateUsersView = () => {
  const [name, setName] = useState('esteban');
  const [email, setEmail] = useState('correo@correo.com');
  const [password, setPassword] = useState('12345');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const router = useRouter();

  const handleCreateUser = async () => {
    const userData = {
      user: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      
      // Mostrar mensaje de éxito
      setSuccessMessage(response.data.message);
      setErrorMessage('');

     
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data as ErrorResponse;
        setErrorMessage(errorData.message);
        setSuccessMessage(''); // Limpiar el mensaje de éxito en caso de error
      } else {
        setErrorMessage('Error desconocido. Inténtalo de nuevo.');
        setSuccessMessage(''); // Limpiar el mensaje de éxito en caso de error
      }
      console.error(axiosError);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="CREAR CUENTA" onPress={handleCreateUser} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null} {/* Mostrar mensaje de éxito */}
      <Link href="/auth/login">
        <Text>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  input: { 
    borderWidth: 1, 
    padding: 8, 
    marginVertical: 8, 
    borderRadius: 4 
  },
  error: { 
    color: 'red', 
    marginTop: 8 
  },
  success: { // Estilo para el mensaje de éxito
    color: 'blue', 
    marginTop: 8 
  }
});
