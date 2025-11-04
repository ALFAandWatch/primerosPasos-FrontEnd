import axiosInstance from '@/api/axiosInstance';

interface Filters {
   tipo?: 'venta' | 'compra';
   formaPago?: 'contado' | 'credito';
}

export const mostrarMovimientosAlUsuario = async (
   usuarioId: number,
   filters?: Filters
) => {
   try {
      const response = await axiosInstance.get(
         'movimientos/mostrarRegistrosAlUsuario',
         {
            params: {
               usuarioId,
               ...(filters?.tipo && { tipo: filters.tipo }),
               ...(filters?.formaPago && { formaPago: filters.formaPago }),
            },
         }
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
