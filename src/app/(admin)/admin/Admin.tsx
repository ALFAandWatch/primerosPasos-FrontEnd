'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {
   const router = useRouter();

   useEffect(() => {
      const token = sessionStorage.getItem('token');

      if (!token) {
         router.push('/adminLogin');
      }
   }, [router]);

   return (
      <>
         <h1 className="sectionMain text-red-600 font-bold font-xl">
            Pagina ADMIN
         </h1>
      </>
   );
};

export default AdminPage;
