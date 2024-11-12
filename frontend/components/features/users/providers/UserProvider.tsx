//UserProvider.tsx
import React, { createContext, useState, useEffect } from "react";
import { Text } from "react-native"; 
import { useUser } from "../applications/useUser";

export const UserContext = createContext<ReturnType<typeof useUser> | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user.fetchUserData().finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Text>Cargando...</Text>; 
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
