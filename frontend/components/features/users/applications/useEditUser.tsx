// useEditUser.tsx
import { useUser } from "../providers/EditUserProvider";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useUpdateUser = () => {
  const { user, updateUser, setErrorMessage, setSuccessMessage } = useUser();
  const [name, setName] = useState(user?.user || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const router = useRouter();

  const handleUpdateUser = () => {
    updateUser(name, email, password, currentPassword, router);
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    currentPassword, setCurrentPassword,
    handleUpdateUser
  };
};
