import { movimientoType } from '@/types/movimientoType';

type FormValues = { movimientos: movimientoType[] };

const parseDateSafe = (
   value: Date | string | undefined | null
): Date | null => {
   if (!value) return null;
   if (value instanceof Date && !isNaN(value.getTime())) return value;
   if (typeof value === 'string') {
      // dd/MM/yyyy ?
      const parts = value.split('/');
      if (parts.length === 3) {
         const [dd, mm, yyyy] = parts.map((p) => Number(p));
         if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
            return new Date(yyyy, mm - 1, dd);
         }
      }
      // fallback: try ISO / Date.parse
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
   }
   return null;
};

export const validateMovimientos = (values: FormValues) => {
   const errors: { movimientos?: Record<string, string>[] } = {};
   const rowsErrors: Record<string, string>[] = [];

   const today = new Date();
   // normalize today's time to 00:00:00 so comparisons by date ignore time
   today.setHours(0, 0, 0, 0);

   if (
      !values.movimientos ||
      !Array.isArray(values.movimientos) ||
      values.movimientos.length === 0
   ) {
      // opcional: exigir al menos una fila
      errors.movimientos = [{ _form: 'Debe agregar al menos una fila' }];
      return errors;
   }

   values.movimientos.forEach((mov, idx) => {
      const rowErr: Record<string, string> = {};

      // codigo: obligatorio
      if (!mov.codigo || String(mov.codigo).trim() === '') {
         rowErr.codigo = 'Código requerido';
      }

      // tipo y formaPago: obligatorio (si los usás en la UI)
      if (!mov.tipo || String(mov.tipo).trim() === '') {
         rowErr.tipo = 'Tipo requerido';
      }
      if (!mov.formaPago || String(mov.formaPago).trim() === '') {
         rowErr.formaPago = 'Forma de pago requerida';
      }

      // precio: no vacío, numérico y > 0
      const precioNum = Number(mov.precio);
      if (
         mov.precio === undefined ||
         mov.precio === null ||
         String(mov.precio).trim() === ''
      ) {
         rowErr.precio = 'Precio requerido';
      } else if (isNaN(precioNum)) {
         rowErr.precio = 'Precio inválido';
      } else if (precioNum <= 0) {
         rowErr.precio = 'Precio debe ser mayor que 0';
      }

      // cantidad: no vacío, numérico y > 0
      const cantidadNum = Number(mov.cantidad);
      if (
         mov.cantidad === undefined ||
         mov.cantidad === null ||
         String(mov.cantidad).trim() === ''
      ) {
         rowErr.cantidad = 'Cantidad requerida';
      } else if (isNaN(cantidadNum)) {
         rowErr.cantidad = 'Cantidad inválida';
      } else if (cantidadNum <= 0) {
         rowErr.cantidad = 'Cantidad debe ser mayor que 0';
      }

      // fecha: no vacía, no futura
      const fechaParsed = parseDateSafe(mov.fecha);
      if (!fechaParsed) {
         rowErr.fecha = 'Fecha requerida';
      } else {
         fechaParsed.setHours(0, 0, 0, 0);
         if (fechaParsed > today) {
            rowErr.fecha = 'La fecha no puede ser futura';
         }
      }

      rowsErrors.push(rowErr);
   });

   // sólo asignar movimientos si hay al menos un error en alguna fila
   const hasAny = rowsErrors.some((r) => Object.keys(r).length > 0);
   if (hasAny) errors.movimientos = rowsErrors;

   return errors;
};
