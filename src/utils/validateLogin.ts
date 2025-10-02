import { loginType } from '@/types/loginType';

export const validateLogin = (values: loginType) => {
   const errors: { [key: string]: string } = {};

   if (!values.email) {
      errors.email = 'El email es obligatorio';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email inválido';
   }

   if (!values.password) {
      errors.password = 'La contraseña es obligatoria';
   } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
   }

   return errors;
};
