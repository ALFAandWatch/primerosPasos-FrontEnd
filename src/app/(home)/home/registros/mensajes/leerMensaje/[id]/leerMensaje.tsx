'use client';

import { marcarComoLeido } from '@/services/marcarComoLeido';
import { traerMensajePorId } from '@/services/traerMensajePorId';
import { mensajesDevueltosType } from '@/types/mensajesDevueltosType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { Span } from 'next/dist/trace';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const leerMensaje = () => {
   const router = useRouter();
   const { id } = useParams();
   const mensajeId = Number(id);

   const [mensaje, setMensaje] = useState<mensajesDevueltosType | null>(null);

   useEffect(() => {
      const fetchMensaje = async (id: number) => {
         try {
            const mensaje = await traerMensajePorId(id);
            setMensaje(mensaje);
         } catch (error) {
            console.log(error);
         }
      };
      fetchMensaje(mensajeId);
   }, [id]);

   useEffect(() => {
      if (!mensaje?.id) return;

      if (mensaje.remitente?.rol !== 'Admin') return;

      const leido = async () => {
         try {
            await marcarComoLeido(mensaje.id);
         } catch (error) {
            console.log(error);
         }
      };
      leido();
   }, [mensaje]);

   useEffect(() => {
      console.log(mensaje);
   }, [mensaje]);

   return (
      <>
         <div className="lg:ml-2 bg-fondo p-6 min-h-[100vh] lg:pr-56 relative overflow-y-auto flex flex-col gap-6">
            {/* Botón volver */}
            <div className="flex items-center gap-4">
               <button
                  type="button"
                  onClick={() => router.back()}
                  className="relative h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center hover:cursor-pointer"
               >
                  <Image src="/icons/atras.svg" alt="Atrás" fill sizes="10vh" />
               </button>
               <h1 className="text-xl lg:text-2xl font-semibold text-main">
                  Mensaje
               </h1>
            </div>

            {/* Contenedor del mensaje */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
               {/* Asunto */}
               <h2 className="text-xl lg:text-3xl font-bold text-main truncate">
                  {mensaje?.asunto ? (
                     mensaje.asunto
                  ) : (
                     <span className="text-main/50 italic font-normal">
                        {`(`}Sin asunto{`)`}
                     </span>
                  )}
               </h2>

               {/* Información del remitente */}
               <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span className="text-black">
                     De:{' '}
                     <span className="text-gray-400">
                        {mensaje?.remitente.nombreTitular || 'Desconocido'}
                     </span>
                  </span>
                  <span className="text-black">
                     Fecha:{' '}
                     <span className="text-gray-400">
                        {mensaje?.fechaEnvio
                           ? formatearFechaCorta(new Date(mensaje.fechaEnvio))
                           : ''}
                     </span>
                  </span>
               </div>

               {/* Cuerpo del mensaje */}
               <div className="whitespace-pre-wrap text-gray-600 text-md flex-1">
                  {mensaje?.contenido}
               </div>
            </div>
         </div>
      </>
   );
};

export default leerMensaje;
