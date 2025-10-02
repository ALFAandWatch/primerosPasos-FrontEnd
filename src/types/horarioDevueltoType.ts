import { empleadoDevueltoType } from './empleadoDevueltoType';

type EstadoHorario = 'presente' | 'falta' | 'salud' | 'vacaciones' | '';

export type horarioDevueltoType = {
   fecha: string;
   entrada: string;
   salida: string;
   estado: EstadoHorario;
   empleado: empleadoDevueltoType | null;
};
