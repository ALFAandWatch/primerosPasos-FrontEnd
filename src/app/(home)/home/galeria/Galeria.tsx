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
         <div className="p-4 bg-white h-screen">
            <h2 className="text-xl font-semibold mb-4 text-black">
               Galería de Imágenes
            </h2>
            {/* Aquí puedes agregar la lógica para mostrar las imágenes */}
            <p className="text-black">
               Aquí se mostrarán las imágenes existentes.
            </p>
         </div>
      </>
   );
};

export default Galeria;
