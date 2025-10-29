'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {
   const router = useRouter();
   useEffect(() => {
      router.push('/admin/mensajes');
   }, [router]);

   return (
      <>
         <h1 className="sectionMain text-black font-bold font-xl">
            Cargando...
         </h1>
      </>
   );
};

export default AdminPage;
