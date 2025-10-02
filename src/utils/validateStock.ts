import { stockType } from '@/types/stockType';

interface FormValues {
   stock: stockType[];
}

export const validateStock = (values: FormValues) => {
   const errors: {
      stock?: {
         codigo?: string;
         cantidad?: string;
         precioCompra?: string;
      }[];
   } = {};

   const movimientosErrors: {
      codigo?: string;
      cantidad?: string;
      precioCompra?: string;
   }[] = [];

   values.stock.forEach((stockItem, index) => {
      const movimientoError: {
         codigo?: string;
         cantidad?: string;
         precioCompra?: string;
      } = {};

      if (!stockItem.codigo.trim()) {
         movimientoError.codigo = 'El código es obligatorio';
      }

      if (stockItem.cantidad <= 0) {
         movimientoError.cantidad = 'La cantidad debe ser mayor que 0';
      }

      if (stockItem.precioCompra <= 0) {
         movimientoError.precioCompra =
            'El precio de compra debe ser mayor que 0';
      }

      if (Object.keys(movimientoError).length > 0) {
         movimientosErrors[index] = movimientoError;
      }
   });

   if (movimientosErrors.length > 0) {
      errors.stock = movimientosErrors;
   }

   return errors;
};
