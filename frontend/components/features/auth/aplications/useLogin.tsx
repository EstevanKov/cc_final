import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";

interface LoginResponse {
  success: boolean;
  message: string;
}

export const useLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const loginData = { email, password };

  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, loginData);
    const { access_token, refresh_token, id, message } = response.data;

    
    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("refresh_token", refresh_token);

    return { success: true, message: message || "Inicio de sesión exitoso" };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido. Inténtalo de nuevo.";
    return { success: false, message: errorMessage };
  }
};
