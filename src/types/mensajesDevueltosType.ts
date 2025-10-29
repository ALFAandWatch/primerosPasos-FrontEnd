import { RolEnum } from '@/enums/RolEnum';
import { empleadoType } from './empleadoType';
import { movimientoType } from './movimientoType';
import { stockType } from './stockType';

type usuarioType = {
   id: number;
   rol: RolEnum;
   nombreEmpresa?: string;
   nombreTitular: string;
   credencial: {
      id: number;
      email: string;
      password: string;
   };
};

export type mensajesDevueltosType = {
   id: number;
   asunto: string;
   contenido: string;
   remitente: usuarioType;
   destinatario: usuarioType;
   fechaEnvio: Date;
   leido: boolean;
   mensajePadre?: mensajesDevueltosType;
};
