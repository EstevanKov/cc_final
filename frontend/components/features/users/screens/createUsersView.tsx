import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useCreateUser } from '../applications/useCreateUser';

export const CreateUsersView = () => {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    errorMessage, successMessage,
    handleCreateUser,
  } = useCreateUser();

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
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      <Link href="/auth/login">
        <Text>¿Ya tienes una cuenta? Inicia Sesión</Text>
      </Link>
    </View>
  );
};

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
  success: { 
    color: 'blue', 
    marginTop: 8 
  }
});
