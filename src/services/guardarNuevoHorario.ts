import axiosInstance from '@/api/axiosInstance';
import { horarioType } from '@/types/horarioType';

export const guardarHorario = async (data: horarioType) => {
   console.log('LO QUE SE ENVIA AL BACK', data);
   try {
      const response = await axiosInstance.post(
         'horarios/registrarHorario',
         data
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         const status = error.response.status;
         if (status === 500) {
            throw new Error('Error en el servidor. Inténtalo más tarde.');
         }
      }
      throw new Error('Error de red. Intenta más tarde.');
   }
};
