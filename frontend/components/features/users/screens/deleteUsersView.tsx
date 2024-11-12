// DeleteUserView.tsx
import React, { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { DeleteUserContext } from "../providers/DeleteUserProvider";
export const DeleteUserView = () => {
  const { currentPassword, setCurrentPassword, errorMessage, handleDeleteUser } = useContext(DeleteUserContext);

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
