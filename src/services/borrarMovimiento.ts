import axiosInstance from '@/api/axiosInstance';

export const borrarMovimiento = async (id: number) => {
   try {
      const res = await axiosInstance.delete(
         `movimientos/borrarMovimiento/${id}`
      );
      return res.data;
   } catch (error: any) {
      console.error('Error al eliminar archivo:', error);
      throw error;
   }
};
