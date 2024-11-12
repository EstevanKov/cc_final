// useUser.tsx
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  user: string;
  email: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const id = await AsyncStorage.getItem("id");

      console.log("Token:", token);  // Verifica si los datos están presentes
      console.log("ID:", id);

      if (token && id) {
        const response = await axios.get(`${BACKEND_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } else {
        console.log("Faltan datos en el AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, []);

  const logout = useCallback(() => {
    AsyncStorage.removeItem("access_token");
    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("refresh_token");
    router.push("/auth/login");
  }, []);

  const edit = () => router.push("/users/edit");
  const deleteUser = () => router.push("/users/delete");

  return { user, fetchUserData, logout, edit, deleteUser };
};
