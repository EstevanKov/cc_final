// src/features/auth/presentation/LoginView.tsx

import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLogin } from "../aplications/useLogin";

export function LoginView() {
  const [email, setEmail] = useState("correo@correo.com");
  const [password, setPassword] = useState("12345");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const result = await useLogin(email, password);
    if (result.success) {
      setSuccessMessage(result.message);
      setErrorMessage('');
      setTimeout(() => {
        router.push('/'); // Redirigir a la pantalla principal
      }, 2000);
    } else {
      setErrorMessage(result.message);
      setSuccessMessage('');
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
      
      <Button title="INICIAR SESIÓN" onPress={handleLogin} />

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
