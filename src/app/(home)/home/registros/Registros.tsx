'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Registros = () => {
   const router = useRouter();
   useEffect(() => {
      router.push('/home/registros/ventasContado');
   }, [router]);

   return (
      <>
         <h1 className="sectionMain text-black font-bold font-xl">
            Cargando...
         </h1>
      </>
   );
};

export default Registros;
