import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export function LoginView() {
  const [email, setEmail] = useState("correo");
  const [password, setPassword] = useState("pass");

  const onLogin = () => {
    console.log("Email:", email, "Password:", password);
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
      
      <Link href={"/"} style={styles.logoutButton}>
  <Text style={styles.logoutButtonText}>                                  INICIAR SESIÓN</Text>
</Link>
      
      {/*       <Button title="INICIAR SESIÓN" onPress={() => onLogin()} />
 <View style={styles.linkContainer}>
        <Link href="/medications">Ir a Medicinas</Link>
      </View>*/}

      <Link href="/users/register">¿No tienes una cuenta? Registrate</Link>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 4 },
  linkContainer: { marginTop: 20 }, logoutButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",      // Centra el botón horizontalmente
    marginTop: 20,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center",     // Asegura que el texto esté centrado horizontalmente
  },
  logoutButtonText: {
    color: "white",           // Color del texto
    fontWeight: "bold",       // Texto en negrita
    textAlign: "center",      // Centra el texto
    width: "100%",            // Asegura que el texto ocupe todo el ancho del botón
  }
});
