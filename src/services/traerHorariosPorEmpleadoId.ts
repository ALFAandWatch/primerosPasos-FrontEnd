import axiosInstance from '@/api/axiosInstance';

export const traerHorariosPorEmpleadoId = async (empleadoId: number) => {
   try {
      const response = await axiosInstance.get(
         `horarios/obtenerHorarios/${empleadoId}`
      );
      console.log('RESPUESTA:', response.data);
      return response.data;
   } catch (error: any) {
      if (error.response) {
         const status = error.response.status;
         if (status === 500) {
            throw new Error('Error en el servidor. Inténtalo más tarde.');
         } else if (status === 404) {
            throw new Error('No se encontró el empleado.');
         } else {
            throw new Error('Error desconocido. Inténtalo más tarde.');
         }
      }
      throw new Error('Error de red. Intenta más tarde.');
   }
};
