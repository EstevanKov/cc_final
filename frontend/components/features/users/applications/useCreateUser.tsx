import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@env';
import { useRouter } from 'expo-router';

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export const useCreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleCreateUser = async () => {
    const userData = {
      user: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, userData); 
      
      setSuccessMessage(response.data.message);
      setErrorMessage('');

      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data as ErrorResponse;
        setErrorMessage(errorData.message);
        setSuccessMessage('');
      } else {
        setErrorMessage('Error desconocido. Inténtalo de nuevo.');
        setSuccessMessage('');
      }
      console.error(axiosError);
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    errorMessage,
    successMessage,
    handleCreateUser,
  };
};
