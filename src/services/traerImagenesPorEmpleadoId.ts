import axiosInstance from '@/api/axiosInstance';

export const traerImagenesPorEmpleadoId = async (
   empleadoId: number,
   tipo: string | undefined
) => {
   try {
      let url = `archivos/obtenerImagenesFiltros/${empleadoId}`;
      if (tipo && tipo !== 'all') {
         url += `?tipo=${tipo}`;
      }

      const response = await axiosInstance.get(url);
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
