import { useEffect, useState } from 'react';
import { traerImagenesPorEmpleadoId } from '@/services/traerImagenesPorEmpleadoId';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';

interface Archivo {
   id: number;
   nombre: string;
   url: string;
   tipo: string;
   descripcion: string;
   fechaSubida: string;
}

interface VerUploadsProps {
   tipo: string | undefined;
   destinatarioId: number;
   imagenSubida: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const VerUploadsAdmin = ({
   tipo,
   destinatarioId,
   imagenSubida,
}: VerUploadsProps) => {
   const [archivos, setArchivos] = useState<Archivo[]>([]);
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [archivoSeleccionado, setArchivoSeleccionado] =
      useState<Archivo | null>(null);

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
   }, [usuario, tipo, imagenSubida]);

   if (archivos.length === 0) {
      return (
         <p className="text-center text-gray-600">
            No hay archivos subidos para <strong>{tipo}</strong>.
         </p>
      );
   }

   return (
      <>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {archivos.map((archivo) => (
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
                        className="w-full h-32 object-cover rounded"
                     />
                  )}
                  {archivo.descripcion && (
                     <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {archivo.descripcion}
                     </p>
                  )}
                  {archivo.fechaSubida && (
                     <p className="text-xs text-black mt-1 absolute top-0 right-1 bg-white p-1 rounded-sm">
                        {formatearFechaCorta(new Date(archivo.fechaSubida))}
                     </p>
                  )}
               </button>
            ))}
         </div>

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

export default VerUploadsAdmin;
