import axiosInstance from '@/api/axiosInstance';
import { stockType } from '@/types/stockType';

export const registrarStock = async (stockData: stockType[]) => {
   try {
      const response = await axiosInstance.post(
         `stock/registrarStock`,
         stockData
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         const status = error.response.status;
         if (status === 500) {
            throw new Error('Error en el servidor. Inténtalo más tarde.');
         }
         if (status === 404) {
            throw new Error('Empleado no encontrado');
         }
      }
      throw new Error('Error de red. Intenta más tarde.');
   }
};
