'use client';
import { mensajesDevueltosType } from '@/types/mensajesDevueltosType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import Image from 'next/image';
import Link from 'next/link';

type MensajePropsType = {
   data: mensajesDevueltosType;
};

export const Mensaje = ({ data }: MensajePropsType) => {
   const { id, asunto, contenido, fechaEnvio, leido, remitente } = data;
   const fechaDate = new Date(fechaEnvio);

   return (
      <>
         <Link
            href={`/home/registros/mensajes/leerMensaje/${id}`}
            className={`hover:bg-gray-50/80 p-2 lg:py-1 rounded-lg w-full flex justify-between items-center gap-2 lg:flex-nowrap lg:items-center lg:gap-4 hover:cursor-pointer font-(family-name:--font-roboto) active:brightness-120 ${
               remitente.rol !== 'Admin'
                  ? 'bg-gray-50/50'
                  : !leido
                  ? 'bg-[#FFF9E6] border border-[#FFD700]'
                  : 'bg-gray-50/50'
            }`}
         >
            <div className="h-8 lg:h-7 aspect-square relative shrink-0">
               <Image
                  // src={!leido ? '/icons/unread.svg' : '/icons/read.svg'}
                  src={
                     remitente.rol !== 'Admin'
                        ? '/icons/sent.svg'
                        : !leido
                        ? '/icons/unread.svg'
                        : '/icons/read.svg'
                  }
                  alt={!leido ? 'Leído' : 'No Leído'}
                  fill
                  sizes="10vh"
               />
            </div>
            <div className="flex-1 flex flex-col lg:gap-5 lg:flex-row lg:justify-between overflow-hidden">
               <div className="flex justify-between flex-nowrap lg:w-1/5">
                  <h2 className="text-md font-bold text-black truncate whitespace-nowrap">
                     {asunto ? (
                        asunto
                     ) : (
                        <span className="text-main/50 italic">
                           {`(`}Sin asunto{`)`}
                        </span>
                     )}
                  </h2>
                  <p className="text-gray-500 text-md lg:hidden">
                     {fechaDate instanceof Date && !isNaN(fechaDate.getTime())
                        ? formatearFechaCorta(fechaDate)
                        : ''}
                  </p>
               </div>
               <div className="overflow-hidden text-left flex flex-1 lg:items-center lg:gap-5">
                  <p className="text-gray-600 text-sm truncate whitespace-nowrap overflow-hidden grow">
                     {contenido}
                  </p>
                  <p className="text-gray-500 text-sm hidden lg:block ml-auto mr-5">
                     {fechaDate instanceof Date && !isNaN(fechaDate.getTime())
                        ? formatearFechaCorta(fechaDate)
                        : ''}
                  </p>
               </div>
            </div>
         </Link>
      </>
   );
};
