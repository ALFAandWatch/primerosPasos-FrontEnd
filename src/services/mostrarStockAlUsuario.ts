import axiosInstance from '@/api/axiosInstance';

export const mostrarStockAlUsuario = async (usuarioId: number) => {
   try {
      const response = await axiosInstance.get(
         `stock/mostrarStockDeEmpresa/${usuarioId}`
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
