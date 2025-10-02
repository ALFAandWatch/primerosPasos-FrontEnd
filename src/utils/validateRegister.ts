import { registerType } from '@/types/registerType';

export const validateRegister = (values: registerType) => {
   const errors: { [key: string]: string } = {};

   if (!values.nombreEmpresa) {
      errors.nombreEmpresa = 'El nombre de la empresa es obligatorio';
   }

   if (!values.nombreTitular) {
      errors.nombreTitular = 'El nombre del titular es obligatorio';
   }

   if (!values.email) {
      errors.email = 'El email es obligatorio';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email inválido';
   }

   if (!values.password) {
      errors.password = 'La contraseña es obligatoria';
   } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
   }

   if (!values.passwordRepeat) {
      errors.passwordRepeat = 'Debe repetir la contraseña';
   } else if (values.password !== values.passwordRepeat) {
      errors.passwordRepeat = 'Las contraseñas no coinciden';
   }

   if (!values.cedula) {
      errors.cedula = 'La cédula es obligatoria';
   }

   if (!values.domicilio) {
      errors.domicilio = 'El domicilio es obligatorio';
   }

   if (!values.telefono) {
      errors.telefono = 'El teléfono es obligatorio';
   }

   if (!values.rut) {
      errors.rut = 'El RUT es obligatorio';
   }

   if (!values.actividad) {
      errors.actividad = 'La actividad es obligatoria';
   }

   return errors;
};
