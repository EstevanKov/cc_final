// CreateUserProvider.tsx
import React, { createContext, ReactNode } from 'react';
import { useCreateUser } from '../applications/useCreateUser';

interface CreateUserContextProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  errorMessage: string;
  successMessage: string;
  handleCreateUser: () => Promise<void>;
}

export const CreateUserContext = createContext<CreateUserContextProps>({} as CreateUserContextProps);

export const CreateUserProvider = ({ children }: { children: ReactNode }) => {
  const createUser = useCreateUser();

  return (
    <CreateUserContext.Provider value={createUser}>
      {children}
    </CreateUserContext.Provider>
  );
};
