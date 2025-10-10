import axiosInstance from '@/api/axiosInstance';

export type MensajesTipo = 'all' | 'recibidos' | 'enviados';

export const traerMensajesAdmin = async (tipo: MensajesTipo, id?: number) => {
   try {
      let url = `mensajes/${tipo}Admin/${id}`;

      const response = await axiosInstance.get(url);
      return response.data;
   } catch (error: any) {
      if (error.response) {
         const status = error.response.status;
         if (status === 500) {
            throw new Error('Error en el servidor. Inténtalo más tarde.');
         } else if (status === 404) {
            throw new Error('No se encontraron mensajes.');
         } else {
            throw new Error('Error desconocido. Inténtalo más tarde.');
         }
      }
      throw new Error('Error de red. Intenta más tarde.');
   }
};
