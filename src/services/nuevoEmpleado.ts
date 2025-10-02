import axiosInstance from '@/api/axiosInstance';
import { empleadoType } from '@/types/empleadoType';

export const nuevoEmpleado = async (data: empleadoType) => {
   try {
      const response = await axiosInstance.post(
         'empleados/registrarEmpleado',
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
