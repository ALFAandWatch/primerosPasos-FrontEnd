type EstadoHorario =
   | 'presente'
   | 'falta'
   | 'salud'
   | 'vacaciones'
   | 'libre'
   | '';

export type horarioType = {
   fecha: string;
   entrada: string | null;
   salida: string | null;
   estado: EstadoHorario;
   empleadoId: number;
};
