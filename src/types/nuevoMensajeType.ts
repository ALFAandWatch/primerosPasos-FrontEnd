export type nuevoMensajeType = {
   asunto?: string;
   contenido: string;
   remitenteId: number | 'admin';
   destinatarioId: number | 'admin';
};
