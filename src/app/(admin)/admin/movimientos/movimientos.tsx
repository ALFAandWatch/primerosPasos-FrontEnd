'use client';
import { traerListaDeEmpresas } from '@/services/traerListaDeEmpresas';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Empresa = {
   id: number;
   nombreEmpresa: string;
   nombreTitular: string;
   rut: string;
   credencial: { email: string };
};

const movimientos = () => {
   const [empresas, setEmpresas] = useState<Empresa[]>([]);

   useEffect(() => {
      const fetchEmpresas = async () => {
         const data = await traerListaDeEmpresas();
         setEmpresas(data);
      };
      fetchEmpresas();
   }, []);

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-screen">
            <h1 className="text-2xl font-bold text-[#5c7cab] mb-6">
               Movimientos
            </h1>
            <div className="overflow-x-auto">
               <table className="w-full shadow-lg rounded-lg table-auto bg-white">
                  <thead className="bg-[#5c7cab]/20">
                     <tr>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Id
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Empresa
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Rut
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Titular
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Email del titular
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Acciones
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {empresas.length === 0 ? (
                        <tr>
                           <td
                              colSpan={4}
                              className="py-6 text-center text-[#5c7cab]/80 font-medium"
                           >
                              No hay empleados registrados
                           </td>
                        </tr>
                     ) : (
                        empresas.map((empresa) => (
                           <tr
                              key={empresa.id}
                              className="w-full hover:bg-[#5c7cab]/10 transition-colors duration-200"
                           >
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 #{` ${empresa.id}`}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {empresa.nombreEmpresa}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {empresa.rut}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {empresa.nombreTitular}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {empresa.credencial.email}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 <Link
                                    href={`/admin/movimientos/verMovimientos/${empresa.id}`}
                                    className="bg-[#5c7cab] hover:bg-[#4a6590] hover:cursor-pointer text-white px-4 py-2 rounded transition-colors duration-200"
                                 >
                                    Ver movimientos
                                 </Link>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};

export default movimientos;
