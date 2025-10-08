import { RolEnum } from '@/enums/RolEnum';

export type empleadoDevueltoType = {
   id: number;
   nombre: string;
   apellido: string;
   cedula: string;
   activo: boolean;
   usuario: {
      id: number;
      rol: RolEnum;
      nombreEmpresa: string;
      nombreTitular: string;
      cedula: string;
      domicilio: string;
      telefono: string;
      rut: string;
      giro: string;
   };
   horarios: {
      id: number;
      fecha: string;
      horaEntrada: string;
      horaSalida: string;
      empleadoId: number;
   }[];
};
