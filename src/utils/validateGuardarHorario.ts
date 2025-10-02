import { horarioType } from '@/types/horarioType';

export const validateHorario = (values: horarioType) => {
   const errors: Partial<Record<keyof horarioType, string>> = {};

   // Estado no puede estar vacío
   if (!values.estado) {
      errors.estado = 'El estado es obligatorio';
   }

   // Validación de entrada y salida solo si el estado es presente
   if (values.estado === 'presente') {
      if (!values.entrada) {
         errors.entrada =
            'La hora de entrada es obligatoria cuando el estado es presente';
      }
      if (!values.salida) {
         errors.salida =
            'La hora de salida es obligatoria cuando el estado es presente';
      }
   }

   return errors;
};
