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
         <div className=" p-4 bg-white h-screen">
            <h2 className="text-xl font-semibold mb-4 text-black">
               Lista de Registros
            </h2>
            {/* Aquí puedes agregar la lógica para mostrar los registros */}
            <p className="text-black">
               Aquí se mostrarán los registros existentes.
            </p>
         </div>
      </>
   );
};

export default Registros;
