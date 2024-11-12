import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../providers/UserProvider";

export const UserView = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <Text>No se pudo cargar el contexto de usuario.</Text>;
  }

  const { user, fetchUserData, logout, edit, deleteUser } = userContext;

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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

          <TouchableOpacity style={styles.option} onPress={deleteUser}>
            <MaterialIcons name="notifications" size={24} color="#2196F3" />
            <Text>Eliminar cuenta</Text>
          </TouchableOpacity>
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
  userName: { fontSize: 30, marginVertical: 10, fontWeight: "bold" },
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
