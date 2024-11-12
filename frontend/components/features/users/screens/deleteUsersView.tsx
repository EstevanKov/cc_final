import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DeleteUserView = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleDeleteUser = async () => {
    setErrorMessage("");

    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }

    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");

    if (token && id) {
      try {
        await axios.delete(`${BACKEND_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { currentPassword }, // Enviar la contraseña actual para la confirmación
        });

        // Eliminar datos de AsyncStorage
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("id");

        // Redirigir a la pantalla de inicio de sesión
        router.push("/auth/login");
      } catch (error: unknown) {
        // Verificar si el error es de Axios
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || "Hubo un problema al eliminar la cuenta.");
        } else {
          setErrorMessage("Ocurrió un error inesperado.");
        }
      }
    } else {
      setErrorMessage("No se pudo autenticar al usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Cuenta</Text>
      
      <Text style={styles.subtitle}>Ingrese su contraseña actual para confirmar eliminación</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      
      <Button title="Eliminar Cuenta" onPress={handleDeleteUser} />
      
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});
