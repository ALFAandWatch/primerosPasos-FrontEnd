import { nuevoMensajeType } from '@/types/nuevoMensajeType';
import { FormikErrors } from 'formik';

export const validateNuevoMensajeAdmin = (
   values: nuevoMensajeType
): FormikErrors<nuevoMensajeType> => {
   const errors: FormikErrors<nuevoMensajeType> = {};

   if (
      !values.destinatarioId ||
      (typeof values.destinatarioId === 'string' &&
         values.destinatarioId.trim() === '')
   ) {
      errors.destinatarioId = 'El destinatario no puede estar vacío';
   }

   if (!values.contenido || values.contenido.trim() === '') {
      errors.contenido = 'El contenido no puede estar vacío';
   }

   return errors;
};
