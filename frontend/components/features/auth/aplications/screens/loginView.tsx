import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

export function LoginView() {
  const [email, setEmail] = useState("correo@correo.com");
  const [password, setPassword] = useState("12345");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const onLogin = async () => {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/login', loginData);
      // Si el inicio de sesión es exitoso, guardar los tokens en AsyncStorage
      const { access_token, refresh_token } = response.data;
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('refresh_token', refresh_token);
      
      // Mostrar mensaje de éxito y redirigir
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setTimeout(() => {
        router.push('/'); // Redirigir a la pantalla principal
      }, 2000);
    } catch (error: any) { // Especificar el tipo de error como any
      const axiosError = error.response?.data;
      if (axiosError && axiosError.message) {
        setErrorMessage(axiosError.message);
      } else {
        setErrorMessage('Error desconocido. Inténtalo de nuevo.');
      }
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIO DE SESIÓN</Text>
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
      
      <Button title="INICIAR SESIÓN" onPress={onLogin} />

      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <Link href="/users/register">¿No tienes una cuenta? Regístrate</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 4 },
  error: { color: 'red', marginTop: 8 },
  success: { color: 'blue', marginTop: 8 },
});
