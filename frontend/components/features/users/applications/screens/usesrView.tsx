import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Para los íconos
import { Link } from "expo-router";

export const UsersView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Capsule Care</Text>
        </View>

        <Text style={styles.userName}>Esteban@CapsuleCare</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="email" size={24} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="notifications" size={24} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="account-circle" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* <Button title="CERRAR SESIÓN" onPress={() => {}} /> */}

        <Link href={"/auth/login"} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}> CERRAR SESIÓN</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  profileContainer: { width: "80%", alignItems: "center" },
  logoContainer: { marginBottom: 20 },
  logoText: { fontSize: 24, fontWeight: "bold", color: "black" },
  userName: { fontSize: 20, marginVertical: 10 },
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
