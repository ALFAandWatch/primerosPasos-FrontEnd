'use client';
import VerInformes from '@/components/VerInformes/VerInformes';
import { useEffect, useState } from 'react';

const tipo = 'stock';

const stock = () => {
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
               Informes de Stock
            </h1>
            <p className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
               En esta sección encontrarás los archivos e informes enviados por
               tu contador relacionados con el control de stock y la gestión de
               inventarios de tu empresa. Revisa periódicamente este apartado
               para mantener un seguimiento preciso de tus productos y
               asegurarte de que toda la información esté actualizada.
            </p>
            {/* VER IMAGENES */}
            <div className="w-full rounded-md mb-15 lg:mb-0 mt-10">
               {usuario && usuario.id && (
                  <VerInformes tipo={tipo} destinatarioId={usuario.id} />
               )}
            </div>
         </div>
      </>
   );
};

export default stock;
