import { empleadoType } from '@/types/empleadoType';

export const validarEmpleado = (values: empleadoType) => {
   const errors: Partial<Record<keyof empleadoType, string>> = {};

   // Nombre
   if (!values.nombre || values.nombre.trim() === '') {
      errors.nombre = 'El nombre es obligatorio';
   } else if (values.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
   } else if (values.nombre.length > 50) {
      errors.nombre = 'El nombre no puede exceder 50 caracteres';
   }

   // Apellido
   if (!values.apellido || values.apellido.trim() === '') {
      errors.apellido = 'El apellido es obligatorio';
   } else if (values.apellido.length < 2) {
      errors.apellido = 'El apellido debe tener al menos 2 caracteres';
   } else if (values.apellido.length > 50) {
      errors.apellido = 'El apellido no puede exceder 50 caracteres';
   }

   // Cédula
   if (!values.cedula || values.cedula.trim() === '') {
      errors.cedula = 'La cédula es obligatoria';
   } else if (!/^\d+$/.test(values.cedula)) {
      errors.cedula = 'La cédula debe contener solo números';
   } else if (values.cedula.length < 6) {
      errors.cedula = 'La cédula debe tener al menos 6 dígitos';
   } else if (values.cedula.length > 15) {
      errors.cedula = 'La cédula no puede exceder 15 dígitos';
   }

   // Empresa
   if (!values.usuarioId) {
      errors.usuarioId = 'Debes seleccionar una empresa';
   }

   console.log(errors);
   return errors;
};
