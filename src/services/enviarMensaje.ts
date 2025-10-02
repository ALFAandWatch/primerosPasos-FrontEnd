import axiosInstance from '@/api/axiosInstance';
import { nuevoMensajeType } from '@/types/nuevoMensajeType';

export const enviarMensaje = async (data: nuevoMensajeType) => {
   console.log('DATA ENVIADA AL BACK: ', data);
   try {
      const response = await axiosInstance.post(`mensajes/enviarMensaje`, data);
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
