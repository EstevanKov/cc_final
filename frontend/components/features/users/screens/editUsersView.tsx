import React, { useEffect, useState } from "react"; 
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EditUserView = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem("access_token");
      const id = await AsyncStorage.getItem("id");
      if (token) {
        try {
          const response = await axios.get(`${BACKEND_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          setName(response.data.user);
          setEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateUser = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");
  
    // Validar contraseña actual antes de actualizar datos
    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }
  
    const updatedData = {};
    if (name !== user.user) updatedData.user = name;
    if (email !== user.email) updatedData.email = email;
    if (password) updatedData.newPassword = password; // Cambiar a newPassword
  
    if (token && Object.keys(updatedData).length > 0) {
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/users/${id}`,
          { ...updatedData, currentPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccessMessage("Datos actualizados con éxito.");
        setTimeout(() => {
          router.push("/users/loged");
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Hubo un problema al actualizar los datos.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("No hay cambios para actualizar.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
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
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Text style={styles.subtitle}>Ingrese su contraseña actual para confirmar cambios</Text>

      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <Button title="Actualizar Datos" onPress={handleUpdateUser} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
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
  success: {
    color: 'blue',
    marginTop: 8,
  },
});
