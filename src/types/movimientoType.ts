export type movimientoType = {
   tipo: 'venta' | 'compra';
   formaPago: 'contado' | 'credito';
   codigo: string;
   precio: number;
   cantidad: number;
   fecha: Date;
   usuarioId: number;
};
