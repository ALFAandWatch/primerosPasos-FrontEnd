import axiosInstance from '@/api/axiosInstance';
import { loginType } from '@/types/loginType';
import axios from 'axios';

export const login = async (datos: loginType) => {
   try {
      const response = await axiosInstance.post('/auth/login', datos);
      return response.data;
   } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
         throw new Error('Credenciales inválidas');
      }
      throw error;
   }
};
