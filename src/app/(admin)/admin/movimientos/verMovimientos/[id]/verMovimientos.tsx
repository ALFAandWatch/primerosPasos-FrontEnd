'use client';
import { useParams } from 'next/navigation';

const verMovimientos = () => {
   const params = useParams();

   return (
      <>
         <h1 className="font-bold text-red-600 uppercase">
            Ver movimientos de empresa {params.id}
         </h1>
      </>
   );
};

export default verMovimientos;
