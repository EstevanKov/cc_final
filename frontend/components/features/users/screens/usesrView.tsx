import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Para los íconos
import { Link, router } from "expo-router";
import axios from "axios";
import { BACKEND_URL } from "@env"; // Asegúrate de tener esta variable en tu .env

interface User {
  user: string;
  email: string;
}

export const UsersView = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      const id = localStorage.getItem("id");

      if (token && id) {
        try {
          const response = await axios.get(`${BACKEND_URL}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Función para cerrar sesión y limpiar localStorage
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    localStorage.removeItem("refresh_token");
    // Redirigir a la página de login
    router.push( "/auth/login"); // Cambia esta línea si usas un enrutador diferente
  };

  const edit = () => {
    router.push( "/users/edit");
  };

  const deleteU = () =>{
    router.push( "/users/delete");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Capsule Care</Text>
        </View>

        {user ? (
          <>
            <Text style={styles.userName}>{user.user}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </>
        ) : (
          <Text>Cargando información del usuario...</Text>
        )}

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={edit}>
            <MaterialIcons name="email" size={24} color="#2196F3" />
            <Text>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={deleteU}>
            <MaterialIcons name="notifications" size={24} color="#2196F3" />
            <Text>Eliminar cuenta</Text>
          </TouchableOpacity>

          {/** 
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="account-circle" size={24} color="#2196F3" />
            <Text>Perfil</Text>
          </TouchableOpacity>*/}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  profileContainer: { width: "80%", alignItems: "center" },
  logoContainer: { marginBottom: 20 },
  logoText: { fontSize: 24, fontWeight: "bold", color: "black" },
  userName: { fontSize: 30, marginVertical: 10,fontWeight: "bold" },
  userEmail: { fontSize: 18, marginVertical: 5 },
  optionsContainer: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});
