// useDeleteUser.ts
import { useState } from "react";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { BACKEND_URL } from "@env";

export const useDeleteUser = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleDeleteUser = async () => {
    setErrorMessage("");

    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }

    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");

    if (token && id) {
      try {
        await axios.delete(`${BACKEND_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { currentPassword },
        });

        // Eliminar datos de AsyncStorage
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.removeItem("id");

        // Redirigir a la pantalla de inicio de sesión
        router.push("/auth/login");
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || "Hubo un problema al eliminar la cuenta.");
        } else {
          setErrorMessage("Ocurrió un error inesperado.");
        }
      }
    } else {
      setErrorMessage("No se pudo autenticar al usuario.");
    }
  };

  return { currentPassword, setCurrentPassword, errorMessage, handleDeleteUser };
};
