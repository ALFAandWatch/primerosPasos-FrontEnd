import { mostrarMovimientosAlUsuario } from '@/services/mostrarMovimientosAlUsuario';
import { movimientoDevueltoType } from '@/types/movimientosDevueltosType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { useEffect, useState } from 'react';

interface RegistrosMovimientosProps {
   tipo: string;
   formaPago: string;
   usuarioId: number;
   enviado: boolean;
}

const RegistrosMovimientos = ({
   tipo,
   formaPago,
   usuarioId,
   enviado,
}: RegistrosMovimientosProps) => {
   const [movimientos, setMovimientos] = useState<movimientoDevueltoType[]>([]);

   const filters = {
      tipo: tipo as 'venta' | 'compra' | undefined,
      formaPago: formaPago as 'contado' | 'credito' | undefined,
   };

   useEffect(() => {
      const fetchMovimientos = async () => {
         try {
            const res = await mostrarMovimientosAlUsuario(usuarioId, filters);
            console.log('Lo que me llego del back', res);
            setMovimientos(res.data.items);
         } catch (error) {
            console.log(error);
         }
      };
      fetchMovimientos();
   }, []);

   useEffect(() => {
      const fetchMovimientos = async () => {
         try {
            const res = await mostrarMovimientosAlUsuario(usuarioId, filters);
            console.log('Lo que me llego del back', res);
            setMovimientos(res.data.items);
         } catch (error) {
            console.log(error);
         }
      };
      fetchMovimientos();
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
                     Precio
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
               {movimientos.length === 0 ? (
                  <tr>
                     <td
                        colSpan={7}
                        className="py-6 text-center text-gray-500 font-medium"
                     >
                        No hay movimientos registrados
                     </td>
                  </tr>
               ) : (
                  movimientos.map((movimiento) => (
                     <tr
                        key={movimiento.id}
                        className="border-b border-gray-200"
                     >
                        <td className="py-2 px-3 text-gray-700">
                           {movimiento.codigo}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {movimiento.precio}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {movimiento.cantidad}
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                           {formatearFechaCorta(new Date(movimiento.fecha))}
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </>
   );
};

export default RegistrosMovimientos;
