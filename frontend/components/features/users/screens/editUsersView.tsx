// EditUserView.tsx
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUser } from "../providers/EditUserProvider";
import { useUpdateUser } from "../applications/useEditUser";

export const EditUserView = () => {
  const { errorMessage, successMessage } = useUser();
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    currentPassword, setCurrentPassword,
    handleUpdateUser
  } = useUpdateUser();

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
