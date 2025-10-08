import axiosInstance from '@/api/axiosInstance';

export const listarEmpleadosAdmin = async (
   page: number = 1,
   limit: number = 10,
   search: string = ''
) => {
   try {
      const response = await axiosInstance.get('empleados/listaAdmin', {
         params: { page, limit, search },
      });

      // el backend devuelve { data, total, page, totalPages }
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
