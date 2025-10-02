import { RolEnum } from '@/enums/RolEnum';

export type registerType = {
   rol: RolEnum;
   nombreEmpresa: string;
   nombreTitular: string;
   email: string;
   password: string;
   passwordRepeat: string;
   cedula: string;
   domicilio: string;
   telefono: string;
   rut: string;
   actividad: string;
};
