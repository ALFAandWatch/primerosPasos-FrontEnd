import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';

export const logout = async () => {
   try {
      const response = await axiosInstance.post('/auth/logout');
      return response.data;
   } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
         throw new Error('Credenciales inválidas');
      }
      throw error;
   }
};
