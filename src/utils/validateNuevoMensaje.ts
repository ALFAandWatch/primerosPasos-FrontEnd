import { nuevoMensajeType } from '@/types/nuevoMensajeType';
import { FormikErrors } from 'formik';

export const validateNuevoMensaje = (
   values: nuevoMensajeType
): FormikErrors<nuevoMensajeType> => {
   const errors: FormikErrors<nuevoMensajeType> = {};

   if (!values.contenido || values.contenido.trim() === '') {
      errors.contenido = 'El contenido no puede estar vacío';
   }

   return errors;
};
