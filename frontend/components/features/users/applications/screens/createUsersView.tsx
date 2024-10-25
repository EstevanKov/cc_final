import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from "expo-router";


export const CreateUsersView = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
      
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
       
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
       
      />
      <Button title="CREAR CUENTA"  />
      <Link href="/auth/login">¿Ya tienes un cuenta? Inicia Sesión</Link>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center' },
  title: { fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 },
  input: { borderWidth: 1, 
    padding: 8, 
    marginVertical: 8, 
    borderRadius: 4 }
});
