'use client';
import { listarEmpleadosAdmin } from '@/services/listarEmpleadosAdmin';
import { restaurarEmpleado } from '@/services/restaurarEmpleado';
import { empleadoDevueltoType } from '@/types/empleadoDevueltoType';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const empleados = () => {
   const [empleados, setEmpleados] = useState<empleadoDevueltoType[]>([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      console.log(empleados);
   }, [empleados]);

   useEffect(() => {
      const fetchEmpleados = async () => {
         try {
            const response = await listarEmpleadosAdmin();
            setEmpleados(response.data);
         } catch (error) {
            console.error('Error al obtener empleados:', error);
         }
      };
      fetchEmpleados();
   }, []);

   useEffect(() => {
      const fetchEmpleados = async () => {
         try {
            const response = await listarEmpleadosAdmin(1, 10, searchTerm);
            setEmpleados(response.data);
         } catch (error) {
            console.error('Error al obtener empleados:', error);
         }
      };
      fetchEmpleados();
   }, [searchTerm]);

   const handleRestaurar = async (id: number) => {
      try {
         await restaurarEmpleado(id);
         Swal.fire('Éxito', 'Empleado restaurado.', 'success');
         setEmpleados((prev) =>
            prev.map((empleado) =>
               empleado.id === id ? { ...empleado, activo: true } : empleado
            )
         );
      } catch (error) {
         console.error('Error al restaurar empleado:', error);
         Swal.fire('Error', 'No se pudo restaurar el empleado.', 'error');
      }
   };

   return (
      <div className="p-6 bg-[#d6dfe7] min-h-screen">
         <h2 className="text-2xl font-bold text-[#5c7cab] mb-6">
            Lista de Empleados
         </h2>

         <input
            type="text"
            value={searchTerm}
            placeholder="Buscar empleado..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 mb-4 rounded border border-gray-400 bg-[#d6dfe7] text-[#5c7cab] placeholder:text-[#5c7cab] focus:outline-none focus:ring-2 focus:ring-[#5c7cab] transition-colors"
         />

         <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white rounded-lg">
               <thead className="bg-[#5c7cab]/20">
                  <tr>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Id
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Nombre
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Empresa
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Cédula
                     </th>
                     <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                        Acciones
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {empleados.length === 0 ? (
                     <tr>
                        <td
                           colSpan={4}
                           className="py-6 text-center text-[#5c7cab]/80 font-medium"
                        >
                           No hay empleados registrados
                        </td>
                     </tr>
                  ) : (
                     empleados.map((empleado) => (
                        <tr
                           key={empleado.id}
                           className="hover:bg-[#5c7cab]/10 transition-colors duration-200"
                        >
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              #{` ${empleado.id}`}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {empleado.nombre} {empleado.apellido}
                              {!empleado.activo && (
                                 <span className="ml-2 text-red-500">
                                    (Inactivo)
                                 </span>
                              )}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {empleado.usuario.nombreEmpresa}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                              {empleado.cedula}
                           </td>
                           <td className="py-3 px-4 border-b border-gray-300">
                              {!empleado.activo && (
                                 <button
                                    type="button"
                                    onClick={() => handleRestaurar(empleado.id)}
                                    className="bg-[#5c7cab] hover:bg-[#4a6590] hover:cursor-pointer text-white px-4 py-2 rounded transition-colors duration-200"
                                 >
                                    Restaurar
                                 </button>
                              )}
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default empleados;
