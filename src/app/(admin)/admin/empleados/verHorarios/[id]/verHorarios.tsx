'use client';
import { traerEmpresaPorId } from '@/services/traerEmpresaPorId';
import { traerHorariosPorEmpleadoId } from '@/services/traerHorariosPorEmpleadoId';
import { traerEmpleadoPorId } from '@/services/treaerEmpleadoPorId';
import { empleadoDevueltoType } from '@/types/empleadoDevueltoType';
import { empresaDevueltaType } from '@/types/empresaDevueltaType';
import { horarioDevueltoType } from '@/types/horarioDevueltoType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const verHorarios = () => {
   const params = useParams();
   const { id } = params;

   const [empleado, setEmpleado] = useState<empleadoDevueltoType>();
   const [horarios, setHorarios] = useState<horarioDevueltoType[]>([]);

   useEffect(() => {
      const fetchUnEmpleado = async () => {
         try {
            if (!id) return;
            const empleado = await traerEmpleadoPorId(Number(id));

            setEmpleado(empleado.data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchUnEmpleado();
   }, []);

   useEffect(() => {
      const fetchHorariosDeUnEmpleado = async () => {
         const horarios = await traerHorariosPorEmpleadoId(Number(id));
         setHorarios(horarios);
      };
      fetchHorariosDeUnEmpleado();
   }, [id]);

   useEffect(() => {
      console.log('HORARIOS: ', horarios);
   }, [horarios]);

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-screen">
            <h2 className="text-2xl font-bold text-[#5c7cab] mb-6">
               Horarios de {empleado?.nombre} {empleado?.apellido}
            </h2>
            <div className="overflow-x-auto shadow-lg rounded-lg lg:w-[75%]">
               <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-[#5c7cab]/20">
                     <tr>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Fecha
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Estado
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Horario Entrada
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Horario Entrada
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {horarios.length === 0 ? (
                        <tr>
                           <td
                              colSpan={4}
                              className="py-6 text-center text-[#5c7cab]/80 font-medium"
                           >
                              No hay horarios registrados
                           </td>
                        </tr>
                     ) : (
                        horarios.map((horario, i) => (
                           <tr
                              key={i}
                              className="hover:bg-[#5c7cab]/10 transition-colors duration-200"
                           >
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800 bg-yellow-50">
                                 {formatearFechaCorta(new Date(horario.fecha))}
                              </td>
                              <td
                                 className={`py-3 px-4 border-b border-gray-300 text-gray-800 capitalize ${
                                    horario.estado === 'presente'
                                       ? 'text-green-700 italic'
                                       : 'text-red-500 bg-red-50'
                                 }`}
                              >
                                 {horario.estado}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {horario.entrada}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {horario.salida}
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

export default verHorarios;
