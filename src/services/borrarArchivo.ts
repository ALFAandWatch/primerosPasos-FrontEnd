import axiosInstance from '@/api/axiosInstance';

export const borrarArchivo = async (id: number) => {
   try {
      const res = await axiosInstance.delete(`archivos/eliminarArchivo/${id}`);
      return res.data;
   } catch (error: any) {
      console.error('Error al eliminar archivo:', error);
      throw error;
   }
};
