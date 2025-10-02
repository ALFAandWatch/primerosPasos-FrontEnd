import axiosInstance from '@/api/axiosInstance';
import { movimientoType } from '@/types/movimientoType';

export const nuevosMovimientos = async (movimientos: movimientoType[]) => {
   try {
      const response = await axiosInstance.post(
         'movimientos/crearMovimientos',
         movimientos
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
