import axiosInstance from '@/api/axiosInstance';

export const listarStockAdmin = async (
   offset: number = 0,
   limit: number = 15,
   usuarioId?: number
) => {
   try {
      const response = await axiosInstance.get('stock/mostrarStockLL', {
         params: { offset, limit, usuarioId },
      });
      // el backend devuelve { items, total }
      return response.data; // { items, total }
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
