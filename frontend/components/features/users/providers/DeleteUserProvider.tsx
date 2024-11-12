// DeleteUserProvider.tsx
import React, { createContext, ReactNode } from "react";
import { useDeleteUser } from "../applications/useDeleteUser";

interface DeleteUserContextProps {
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  errorMessage: string;
  handleDeleteUser: () => void;
}

export const DeleteUserContext = createContext<DeleteUserContextProps>({} as DeleteUserContextProps);

export const DeleteUserProvider = ({ children }: { children: ReactNode }) => {
  const deleteUser = useDeleteUser();

  return (
    <DeleteUserContext.Provider value={deleteUser}>
      {children}
    </DeleteUserContext.Provider>
  );
};
