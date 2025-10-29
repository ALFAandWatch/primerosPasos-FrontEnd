import { ArchivoTipo } from '@/enums/ArchivoTipoEnum';
import { empresaDevueltaType } from './empresaDevueltaType';

export type archivoDevueltoType = {
   id: number;
   nombre: string;
   titulo: string;
   url: string;
   tipo: ArchivoTipo;
   descripcion?: string;
   usuario: empresaDevueltaType;
   subidoPorAdmin: boolean;
   fechaSubida: string;
};
