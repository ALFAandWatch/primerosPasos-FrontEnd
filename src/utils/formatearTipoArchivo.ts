export const formatearTipoArchivo = (tipo: string) => {
   switch (tipo) {
      case 'contado':
         return 'Recibo Contado';
      case 'credito':
         return 'Recibo Crédito';
      case 'varios':
         return 'Recibos de Pago Varios';
      case 'dgi':
         return 'Pagos DGI';
      case 'bps':
         return 'Pagos BPS';
      case 'otros':
         return 'Otros recibos';
      default:
         return tipo;
   }
};
