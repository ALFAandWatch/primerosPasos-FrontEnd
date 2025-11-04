import axiosInstance from '@/api/axiosInstance';
import { movimientoEditType } from '@/types/editarMovimientoType';
import { movimientoType } from '@/types/movimientoType';

export const editarMovimiento = async (
   id: number,
   data: movimientoEditType
) => {
   try {
      const res = await axiosInstance.patch(
         `movimientos/editarMovimiento/${id}`,
         data
      );
      return res.data;
   } catch (error: any) {
      console.error('Error al editar movimiento:', error);
      throw error;
   }
};
