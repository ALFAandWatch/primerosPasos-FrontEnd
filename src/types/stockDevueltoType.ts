export type stockDevueltoType = {
   id: number;
   codigo: string;
   cantidad: number;
   precioCompra: number;
   usuario: {
      id: number;
      nombreEmpresa: string;
   };
};
