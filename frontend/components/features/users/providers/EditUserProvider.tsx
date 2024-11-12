
// EditUserProvider.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";

// Define un tipo para los datos del usuario y el contexto
interface UserContextType {
  user: { user: string; email: string } | null;
  errorMessage: string;
  successMessage: string;
  updateUser: (
    name: string,
    email: string,
    password: string,
    currentPassword: string,
    router: any
  ) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const EditUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ user: string; email: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");
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

  const updateUser = async (
    name: string,
    email: string,
    password: string,
    currentPassword: string,
    router: any
  ) => {
    setErrorMessage("");
    setSuccessMessage("");
    const token = await AsyncStorage.getItem("access_token");
    const id = await AsyncStorage.getItem("id");

    if (!currentPassword) {
      setErrorMessage("Por favor ingresa la contraseña actual para confirmar.");
      return;
    }

    const updatedData: any = {};
    if (name !== user?.user) updatedData.user = name;
    if (email !== user?.email) updatedData.email = email;
    if (password) updatedData.newPassword = password;

    if (token && Object.keys(updatedData).length > 0) {
        try {
            await axios.patch(
              `${BACKEND_URL}/users/${id}`,
              { ...updatedData, currentPassword },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMessage("Datos actualizados con éxito.");
            setTimeout(() => {
              router.push("/users/loged");
            }, 2000);
          } catch (error: unknown) {
            // Comprobación de tipo
            if (axios.isAxiosError(error)) {
              setErrorMessage(
                error.response?.data?.message || "Hubo un problema al actualizar los datos."
              );
            } else {
              setErrorMessage("Hubo un error inesperado.");
            }
            setSuccessMessage("");
          }
    } else {
      setErrorMessage("No hay cambios para actualizar.");
    }
  };

  return (
    <UserContext.Provider value={{ user, errorMessage, successMessage, updateUser, setErrorMessage, setSuccessMessage }}>
      {children}
    </UserContext.Provider>
  );
};
