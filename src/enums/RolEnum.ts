export enum RolEnum {
   EMPRESA = 'Empresa',
   ADMIN = 'Admin',
}

export type RolInput = 'Empresa' | 'Admin';

export const rolEnumMap: Record<RolInput, RolEnum> = {
   Empresa: RolEnum.EMPRESA,
   Admin: RolEnum.ADMIN,
};
