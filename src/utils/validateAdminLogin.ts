type Values = {
   email: string;
   password: string;
};

export const validateAdminLogin = (values: Values) => {
   const errors: Partial<Values> = {};

   if (!values.email) {
      errors.email = 'El email es requerido';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email inválido';
   }

   if (!values.password) {
      errors.password = 'La contraseña es requerida';
   } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
   }

   return errors;
};
