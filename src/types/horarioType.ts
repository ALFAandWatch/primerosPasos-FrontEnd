type EstadoHorario = 'presente' | 'falta' | 'salud' | 'vacaciones' | '';

export type horarioType = {
   fecha: string;
   entrada: string | null;
   salida: string | null;
   estado: EstadoHorario;
   empleadoId: number;
};
