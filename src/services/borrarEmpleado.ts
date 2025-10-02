import axiosInstance from '@/api/axiosInstance';
import { empleadoType } from '@/types/empleadoType';

export const borrarEmpleado = async (id: number) => {
   try {
      const response = await axiosInstance.delete(
         `empleados/eliminarEmpleado/${id}`
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
