import { useEffect, useState } from 'react';
import { traerImagenesPorEmpleadoId } from '@/services/traerImagenesPorEmpleadoId';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { archivoDevueltoType } from '@/types/archivoDevueltoType';

interface VerUploadsProps {
   tipo: string | undefined;
   destinatarioId: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const VerInformes = ({ tipo, destinatarioId }: VerUploadsProps) => {
   const [archivos, setArchivos] = useState<archivoDevueltoType[]>([]);
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [archivoSeleccionado, setArchivoSeleccionado] =
      useState<archivoDevueltoType | null>(null);

   useEffect(() => {
      const fetchArchivos = async () => {
         if (!destinatarioId) return;

         try {
            const res = await traerImagenesPorEmpleadoId(destinatarioId, tipo);

            const enviadosPorUsuario = res.data.filter(
               (archivo: any) => archivo.destinatario.id === destinatarioId
            );

            setArchivos(enviadosPorUsuario);
         } catch (error) {
            console.error('Error al obtener archivos:', error);
         }
      };

      fetchArchivos();
   }, [usuario, tipo]);

   if (archivos.length === 0) {
      return (
         <p className="text-center text-gray-600 p-4 border border-main rounded-lg shadow-md">
            No hay archivos subidos para <strong>{tipo}</strong>.
         </p>
      );
   }

   return (
      <>
         <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#5c7cab]/20">
               <tr>
                  <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase w-[8rem]">
                     Imagen
                  </th>
                  <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase w-1/4">
                     Titulo
                  </th>
                  <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                     Descripción
                  </th>
               </tr>
            </thead>
            <tbody>
               {archivos.length === 0 ? (
                  <tr>
                     <td
                        colSpan={4}
                        className="py-6 text-center text-[#5c7cab]/80 font-medium"
                     >
                        No hay archivos para mostrar
                     </td>
                  </tr>
               ) : (
                  archivos.map((archivo) => (
                     <tr
                        key={archivo.id}
                        className="hover:bg-[#5c7cab]/10 transition-colors duration-200 h-fit"
                     >
                        <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                           <button
                              key={archivo.id}
                              onClick={() => setArchivoSeleccionado(archivo)}
                              className="bg-white rounded-lg shadow p-2 hover:shadow-md transition overflow-hidden hover:cursor-pointer hover:brightness-90 relative"
                           >
                              {archivo.url.endsWith('.pdf') ? (
                                 <div className="flex flex-col items-center justify-center h-32 bg-gray-100 rounded">
                                    <span className="text-gray-500 text-xs font-medium">
                                       📄 PDF
                                    </span>
                                    <span className="text-blue-600 text-sm mt-1 underline">
                                       Ver documento
                                    </span>
                                 </div>
                              ) : (
                                 <img
                                    src={`${BASE_URL}${archivo.url}`}
                                    alt={archivo.nombre}
                                    className="w-full h-15 aspect-square object-cover rounded"
                                 />
                              )}
                              {archivo.fechaSubida && (
                                 <p className="text-xs text-black mt-1 absolute top-0 right-1 bg-white p-1 rounded-sm pointer-events-none">
                                    {formatearFechaCorta(
                                       new Date(archivo.fechaSubida)
                                    )}
                                 </p>
                              )}
                           </button>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                           {archivo.titulo}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                           {archivo.descripcion}
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>

         {/* Modal */}
         {archivoSeleccionado && (
            <div
               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
               onClick={() => setArchivoSeleccionado(null)}
            >
               <div
                  className="bg-white p-4 rounded-xl shadow-lg max-w-3xl max-h-[95%] w-[90%] relative 
               overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     onClick={() => setArchivoSeleccionado(null)}
                     className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
              bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold 
              rounded-full shadow transition text-xl hover:cursor-pointer"
                  >
                     ✕
                  </button>

                  {archivoSeleccionado.url.endsWith('.pdf') ? (
                     <iframe
                        src={`${BASE_URL}${archivoSeleccionado.url}`}
                        className="w-full h-[70vh] rounded mb-3 mt-6"
                     />
                  ) : (
                     <img
                        src={`${BASE_URL}${archivoSeleccionado.url}`}
                        alt={archivoSeleccionado.nombre}
                        className="w-full h-auto rounded mb-3 mt-6"
                     />
                  )}

                  <p className="text-sm text-gray-700 text-center">
                     {archivoSeleccionado.descripcion || 'Sin descripción'}
                  </p>
               </div>
            </div>
         )}
      </>
   );
};

export default VerInformes;
