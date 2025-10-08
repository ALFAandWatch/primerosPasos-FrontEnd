'use client';
import { mensajesDevueltosType } from '@/types/mensajesDevueltosType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import Image from 'next/image';
import Link from 'next/link';

type MensajePropsType = {
   data: mensajesDevueltosType;
};

export const MensajeAdmin = ({ data }: MensajePropsType) => {
   const { id, asunto, contenido, fechaEnvio, leido, remitente, destinatario } =
      data;
   const fechaDate = new Date(fechaEnvio);

   const bgColor =
      remitente.rol === 'Admin'
         ? 'bg-white'
         : !leido
         ? 'bg-[#FFF9E6] border border-[#FFD700]'
         : 'bg-white';

   return (
      <Link
         href={`/admin/mensajes/leerMensajeAdmin/${id}`}
         className={`flex items-center justify-between gap-3 p-3 mr-2 rounded-lg shadow-sm hover:shadow-md hover:bg-[#f0f4f8] transition-all duration-200 cursor-pointer ${bgColor}`}
      >
         {/* Icono de estado del mensaje */}
         <div className="w-10 h-10 relative flex-shrink-0">
            <Image
               src={
                  remitente.rol === 'Admin'
                     ? '/icons/sent.svg'
                     : !leido
                     ? '/icons/unread.svg'
                     : '/icons/read.svg'
               }
               alt={
                  remitente.rol === 'Admin'
                     ? 'Enviado'
                     : !leido
                     ? 'No leído'
                     : 'Leído'
               }
               fill
               sizes="40px"
               className="object-contain"
            />
         </div>

         {/* Contenido del mensaje */}
         <div className="flex flex-1 flex-col lg:flex-row justify-between items-start lg:items-center overflow-hidden gap-2">
            <div className="flex-1 overflow-hidden">
               {remitente.rol === 'Admin' ? (
                  <span className="text-[#4a6590] font-semibold text-sm">
                     Enviado a: {destinatario.nombreEmpresa}
                  </span>
               ) : (
                  <span className="text-[#3a7d44] font-semibold text-sm">
                     Mensaje de: {remitente.nombreEmpresa}
                  </span>
               )}

               <h2 className="text-black font-semibold text-md truncate">
                  {asunto || (
                     <span className="text-[#5c7cab]/70 italic">
                        (Sin asunto)
                     </span>
                  )}
               </h2>
               <p className="text-gray-700 text-sm truncate">{contenido}</p>
            </div>

            {/* Fecha */}
            <p className="text-gray-500 text-sm whitespace-nowrap lg:ml-4">
               {fechaDate instanceof Date && !isNaN(fechaDate.getTime())
                  ? formatearFechaCorta(fechaDate)
                  : ''}
            </p>
         </div>
      </Link>
   );
};
