'use client';
import VerInformes from '@/components/VerInformes/VerInformes';
import { useEffect, useState } from 'react';

const tipo = 'pagos';

const pagos = () => {
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-[100vh] flex flex-col">
            <h1 className="text-main font-(family-name:--font-montserrat) font-semibold text-2xl pb-6">
               Informes de Pagos
            </h1>
            <p className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
               En esta sección encontrarás los archivos e informes enviados por
               tu contador relacionados con los pagos que debes realizar. Revisa
               periódicamente este apartado para mantenerte al día con tus
               obligaciones y asegurarte de que toda la información esté al
               corriente.
            </p>
            {/* VER IMAGENES */}
            <div
               className="p-6 w-full border-2 border-main rounded-xl shadow-md mb-15 lg:mb-0 mt-10"
               style={{ borderStyle: 'groove' }}
            >
               {usuario && usuario.id && (
                  <VerInformes tipo={tipo} destinatarioId={usuario.id} />
               )}
            </div>
         </div>
      </>
   );
};

export default pagos;
