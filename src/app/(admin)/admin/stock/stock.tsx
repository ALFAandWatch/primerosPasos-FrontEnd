'use client';
import { listarStockAdmin } from '@/services/listarStockAdmin';
import { traerListaDeEmpresas } from '@/services/traerListaDeEmpresas';
import { stockDevueltoType } from '@/types/stockDevueltoType';
import { useEffect, useState } from 'react';

type Empresa = {
   id: number;
   nombreEmpresa: string;
};

const stock = () => {
   const [stock, setStock] = useState<stockDevueltoType[]>([]);
   const [total, setTotal] = useState(0);
   const [offset, setOffset] = useState(0);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true); // para saber si hay más stock
   const limit = 15;
   const [empresaId, setEmpresaId] = useState<number | undefined>(undefined);
   const [empresas, setEmpresas] = useState<Empresa[]>([]);

   // useEffect(() => {
   //    console.log('STOCK:', stock);
   // }, [stock]);

   const fetchStock = async (newOffset = offset, reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);

      try {
         const data = await listarStockAdmin(newOffset, limit, empresaId);

         setStock((prev) => (reset ? data.items : [...prev, ...data.items]));
         setOffset((prev) =>
            reset ? data.items.length : prev + data.items.length
         );

         if (data.items.length < limit) setHasMore(false);
      } catch (error) {
         console.error('Error fetching stock:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchStock(); // traer los primeros 15
   }, []);

   useEffect(() => {
      const fetchEmpresas = async () => {
         const data = await traerListaDeEmpresas();
         setEmpresas(data);
      };
      fetchEmpresas();
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY;
         const windowHeight = window.innerHeight;
         const fullHeight = document.body.offsetHeight;

         if (scrollTop + windowHeight >= fullHeight - 50) {
            // a 50px del final
            fetchStock();
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === 'all') {
         setEmpresaId(undefined);
      } else {
         setEmpresaId(Number(value));
      }
   };

   useEffect(() => {
      // Reiniciar todo al cambiar de empresa
      setStock([]);
      setOffset(0);
      setHasMore(true);
   }, [empresaId]);

   useEffect(() => {
      fetchStock(offset, offset === 0); // solo fetch cuando offset cambie o reset
   }, [offset, empresaId]);

   return (
      <div className="p-6 bg-[#d6dfe7] min-h-screen">
         <h2 className="text-2xl font-bold text-[#5c7cab] mb-6">
            Lista de Stock
         </h2>

         <div className="flex w-full items-stretch lg:w-1/3 mb-4">
            <p className="font-semibold w-1/3 lg:w-4/7 text-center border border-white bg-main py-4 lg:p-2 text-white font-(family-name:--font-montserrat) flex items-center justify-center">
               Filtrar
            </p>
            <select
               onChange={handleChange}
               className="w-full text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
            >
               <option value="all">Todos</option>
               {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                     {empresa.nombreEmpresa}
                  </option>
               ))}
            </select>
         </div>

         <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
               <thead className="bg-[#5c7cab]/20">
                  <tr>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Id
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Codigo
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Empresa
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Cantidad
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Precio de Compra
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {stock.length === 0 && !loading ? (
                     <tr>
                        <td
                           colSpan={5}
                           className="py-6 text-center text-[#5c7cab]/80 font-medium"
                        >
                           No hay stock registrado
                        </td>
                     </tr>
                  ) : (
                     stock.map((item, i) => (
                        <tr
                           key={i}
                           className="hover:bg-[#5c7cab]/10 transition-colors duration-200"
                        >
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              #{item.id}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {item.codigo}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {item.usuario.nombreEmpresa}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {item.cantidad}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              ${Number(item.precioCompra).toFixed(2)}
                           </td>
                        </tr>
                     ))
                  )}
                  {loading && (
                     <tr>
                        <td
                           colSpan={5}
                           className="py-4 text-center text-[#5c7cab]/60 font-medium"
                        >
                           Cargando más...
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default stock;
