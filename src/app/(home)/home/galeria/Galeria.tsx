'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Galeria = () => {
   const router = useRouter();
   useEffect(() => {
      router.push('/home/galeria/contado');
   }, [router]);

   return (
      <>
         <h1 className="sectionMain text-black font-bold font-xl">
            Cargando...
         </h1>
      </>
   );
};

export default Galeria;
