'use client';

import { borrarArchivo } from '@/services/borrarArchivo';
import { descargarArchivo } from '@/services/descargarArchivo';
import { traerEmpresaPorId } from '@/services/traerEmpresaPorId';
import { traerImagenesPorEmpleadoId } from '@/services/traerImagenesPorEmpleadoId';
import { archivoDevueltoType } from '@/types/archivoDevueltoType';
import { empresaDevueltaType } from '@/types/empresaDevueltaType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { formatearTipoArchivo } from '@/utils/formatearTipoArchivo';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const verArchivos = () => {
   const params = useParams();
   const { id } = params;

   const [usuario, setUsuario] = useState<empresaDevueltaType>();
   const [archivos, setArchivos] = useState<archivoDevueltoType[]>([]);
   const [archivoEliminado, setArchivoEliminado] = useState(false);

   const [tipo, setTipo] = useState<
      'all' | 'contado' | 'credito' | 'varios' | 'dgi' | 'bps' | 'otros'
   >('all');
   const [archivoSeleccionado, setArchivoSeleccionado] =
      useState<archivoDevueltoType | null>(null);

   const fetchedEmpresa = useRef(false);
   const fetchedMovimientos = useRef(false);

   useEffect(() => {
      const fetchUnaEmpresa = async () => {
         try {
            if (!id || fetchedEmpresa.current) return;
            fetchedEmpresa.current = true;
            const usuarioTraido = await traerEmpresaPorId(Number(id));
            setUsuario(usuarioTraido);
         } catch (error) {
            console.log(error);
         }
      };
      fetchUnaEmpresa();
   }, []);

   useEffect(() => {
      if (!id) return;

      const fetchArchivos = async () => {
         const res = await traerImagenesPorEmpleadoId(Number(id), tipo);
         setArchivos(res.data);
      };

      fetchArchivos();
   }, [id, tipo, archivoEliminado]);

   const handleChangeTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedTipo = e.target.value as
         | 'all'
         | 'contado'
         | 'credito'
         | 'varios'
         | 'dgi'
         | 'bps'
         | 'otros';
      setTipo(selectedTipo);
      setArchivos([]);
   };

   const handleBorrarArchivo = (id: number) => {
      Swal.fire({
         title: '¿Borrar Archivo?',
         html: `
               ¿Estas seguro que quieres borrar el archivo?
               <br> Esta accion no es reversible.`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: 'oklch(70.4% 0.191 22.216)',
         cancelButtonColor: '#99a1af',
         confirmButtonText: 'Borrar',
         cancelButtonText: 'Cancelar',
         didOpen: () => {
            // Seleccionamos el botón de confirmar
            const confirmButton = Swal.getConfirmButton();
            if (confirmButton) {
               confirmButton.disabled = true;

               let segundos = 5; // tiempo que quieras
               confirmButton.textContent = `Borrar (${segundos})`;

               const interval = setInterval(() => {
                  segundos--;
                  if (segundos > 0) {
                     confirmButton.textContent = `Borrar (${segundos})`;
                  } else {
                     confirmButton.textContent = 'Borrar';
                     confirmButton.disabled = false;
                     clearInterval(interval);
                  }
               }, 1000);
            }
         },
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await borrarArchivo(id);
               setArchivoEliminado(true);
               setTimeout(() => {
                  setArchivoEliminado(false);
               }, 500);
               Swal.fire({
                  title: 'Archivo borrado!',
                  icon: 'success',
               });
            } catch (error) {
               Swal.fire({
                  title: 'No se pudo borrar el archivo.',
                  icon: 'error',
               });
            }
         }
      });
   };

   const handleDescargarArchivo = async (archivo: archivoDevueltoType) => {
      const confirmar = window.confirm('Se va a descargar el archivo.');
      if (!confirmar) return;

      try {
         const { id, nombre } = archivo;
         const res = await descargarArchivo(id, nombre);
         console.log(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   // useEffect(() => {
   //    console.log('MOVIMIENTOS:', movimientos);
   // }, [movimientos]);

   // useEffect(() => {
   //    console.log('USUARIO: ', usuario);
   // }, [usuario]);

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-screen">
            <h2 className="text-2xl font-bold text-[#5c7cab] mb-6">
               Archivos de {usuario?.nombreEmpresa}
            </h2>

            <div className="flex flex-col lg:flex-row justify-start gap-4 mb-4 max-w-full">
               <div className="flex">
                  <p className="font-semibold w-3/7 px-2 lg:max-w-fit text-center border border-white bg-main py-4 lg:p-2 lg:px-6 text-white font-(family-name:--font-montserrat) flex items-center justify-center">
                     Tipo
                  </p>
                  <select
                     onChange={handleChangeTipo}
                     className="w-[10rem] text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
                  >
                     <option value="all">Todos</option>
                     <option value="contado">Recibos Contado</option>
                     <option value="credito">Recibos Crédito</option>
                     <option value="varios">Recibos Varios</option>
                     <option value="dgi">Recibos DGI</option>
                     <option value="bps">Recibos BPS</option>
                     <option value="otros">Otros Recibos</option>
                  </select>
               </div>
               <div className="flex">
                  <p className="font-semibold w-3/7 px-2 lg:max-w-fit text-center border border-white bg-main py-4 lg:p-2 lg:px-6 text-white font-(family-name:--font-montserrat) flex items-center justify-center whitespace-nowrap">
                     Forma de Pago
                  </p>
                  <select
                     // onChange={handleChangeFormaPago}
                     className="w-[10rem] text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
                  >
                     <option value="all">Todos</option>
                     <option value="contado">Contado</option>
                     <option value="credito">Crédito</option>
                  </select>
               </div>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
               <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-[#5c7cab]/20">
                     <tr>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Id
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Tipo
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Imagen
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Nombre
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Url
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Fecha de Subida
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Acciones
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
                              No hay empleados registrados
                           </td>
                        </tr>
                     ) : (
                        archivos.map((archivo) => (
                           <tr
                              key={archivo.id}
                              className="hover:bg-[#5c7cab]/10 transition-colors duration-200 h-fit"
                           >
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800 whitespace-nowrap">
                                 #{` ${archivo.id}`}
                              </td>

                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800 capitalize bg-[#FFF8DC]">
                                 {formatearTipoArchivo(archivo.tipo)}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 <button
                                    key={archivo.id}
                                    onClick={() =>
                                       setArchivoSeleccionado(archivo)
                                    }
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
                                 {archivo.nombre}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {archivo.url}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {formatearFechaCorta(
                                    new Date(archivo.fechaSubida)
                                 )}
                              </td>
                              <td className="py-8 px-4 border-b border-gray-300 text-gray-800 flex items-center gap-4 min-h-[6rem]">
                                 <button
                                    type="button"
                                    onClick={() =>
                                       handleBorrarArchivo(archivo.id)
                                    }
                                    className="text-white rounded-lg bg-red-500 flex items-center gap-1 p-2 px-3 hover:cursor-pointer hover:brightness-95"
                                 >
                                    <div className="relative h-7 aspect-square">
                                       <Image
                                          src="/icons/delete.svg"
                                          alt=""
                                          fill
                                          sizes="10vw"
                                       />
                                    </div>
                                    Eliminar
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            {/* Modal */}
            {archivoSeleccionado && (
               <div
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                  onClick={() => setArchivoSeleccionado(null)}
               >
                  <div
                     className="bg-white p-4 rounded-xl shadow-lg max-w-3xl max-h-[95%] w-[90%] relative overflow-y-auto"
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

                     <button
                        type="button"
                        onClick={() =>
                           handleDescargarArchivo(archivoSeleccionado)
                        }
                        className="text-white rounded-lg bg-blue-400 flex items-center gap-1 p-2 px-3 hover:cursor-pointer hover:brightness-115 mx-auto my-1"
                     >
                        <div className="relative h-7 aspect-square">
                           <Image
                              src="/icons/download.svg"
                              alt=""
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Descargar
                     </button>
                     <hr className="border-gray-300 my-4" />

                     <p className="text-gray-700 text-xl text-center">
                        Tipo de archivo:{' '}
                        <span className="text-red-500 italic">
                           {formatearTipoArchivo(archivoSeleccionado.tipo)}
                        </span>
                     </p>

                     <p className="text-xl text-gray-700 text-center">
                        Descripción:{' '}
                        <span className="italic text-gray-400 mx-auto h-fit rounded-lg block">
                           {archivoSeleccionado.descripcion ||
                              'Sin descripción'}
                        </span>
                     </p>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default verArchivos;
