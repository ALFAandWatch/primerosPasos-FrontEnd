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
         <h1 className="sectionMain text-black font-bold font-xl">
            Cargando...
         </h1>
      </>
   );
};

export default Informes;
