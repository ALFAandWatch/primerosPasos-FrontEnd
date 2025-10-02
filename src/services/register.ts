import axiosInstance from '@/api/axiosInstance';
import { registerType } from '@/types/registerType';

export const register = async (datos: registerType) => {
   try {
      const response = await axiosInstance.post('/auth/register', datos);
      return response.data;
   } catch (error: any) {
      if (error.response) {
         return { error: error.response.data };
      }
      return { error: error.message || 'Error desconocido' };
   }
};
