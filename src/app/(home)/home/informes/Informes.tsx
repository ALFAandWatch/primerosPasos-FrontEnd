'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Informes = () => {
   const router = useRouter();
   useEffect(() => {
      router.push('/home/informes/pagos');
   }, [router]);

   return (
      <>
         <div className="p-4 bg-white h-screen">
            <h2 className="text-xl font-semibold mb-4 text-black">
               Lista de Informes
            </h2>
            {/* Aquí puedes agregar la lógica para mostrar los informes */}
            <p className="text-black">
               Aquí se mostrarán los informes existentes.
            </p>
         </div>
      </>
   );
};

export default Informes;
