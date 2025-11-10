import { mostrarMovimientosAlUsuario } from '@/services/mostrarMovimientosAlUsuario';
import { mostrarStockAlUsuario } from '@/services/mostrarStockAlUsuario';
import { movimientoDevueltoType } from '@/types/movimientosDevueltosType';
import { stockDevueltoType } from '@/types/stockDevueltoType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { useEffect, useState } from 'react';

interface RegistrosStockProps {
   usuarioId: number;
   enviado: boolean;
}

const RegistrosStock = ({ usuarioId, enviado }: RegistrosStockProps) => {
   const [stock, setStock] = useState<stockDevueltoType[]>([]);

   useEffect(() => {
      const fetchStock = async () => {
         try {
            const res = await mostrarStockAlUsuario(usuarioId);
            console.log('Lo que me llego del back', res);
            setStock(res.data.items);
         } catch (error) {
            console.log(error);
         }
      };
      fetchStock();
   }, []);

   useEffect(() => {
      const fetchStock = async () => {
         try {
            const res = await mostrarStockAlUsuario(usuarioId);
            // console.log('Lo que me llego del back', res);
            setStock(res);
         } catch (error) {
            console.log(error);
         }
      };
      fetchStock();
   }, [enviado]);

   return (
      <>
         <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
               <tr>
                  <th className="py-2 px-3 text-left text-gray-500 font-medium uppercase text-xs">
                     Código
                  </th>
                  <th className="py-2 px-3 text-left text-gray-500 font-medium uppercase text-xs">
                     Precio de Compra
                  </th>
                  <th className="py-2 px-3 text-left text-gray-500 font-medium uppercase text-xs">
                     Cantidad
                  </th>
                  <th className="py-2 px-3 text-left text-gray-500 font-medium uppercase text-xs">
                     Fecha
                  </th>
               </tr>
            </thead>

            <tbody>
               {stock.length === 0 ? (
                  <tr>
                     <td
                        colSpan={7}
                        className="py-6 text-center text-gray-500 font-medium"
                     >
                        No hay stock registrado
                     </td>
                  </tr>
               ) : (
                  stock.map((stock) => (
                     <tr key={stock.id} className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700">
                           {stock.codigo}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {stock.precioCompra}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {stock.cantidad}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {formatearFechaCorta(new Date(stock.fechaRegistro))}
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </>
   );
};

export default RegistrosStock;
