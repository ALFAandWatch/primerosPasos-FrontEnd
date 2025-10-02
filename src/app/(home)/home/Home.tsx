'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const botonesHome = [
   { href: '/home/registros', label: 'Registros' },
   { href: '/home/informes', label: 'Informes' },
   { href: '/home/galeria', label: 'Galería' },
];

export default function HomePage() {
   const router = useRouter();

   useEffect(() => {
      const token = sessionStorage.getItem('token');

      if (!token) {
         router.push('/login');
      }
   }, [router]);

   return (
      <div className="w-screen h-screen bg-fondo flex flex-col items-center justify-center gap-32">
         {botonesHome.map((boton) => (
            <Link
               key={boton.href}
               href={boton.href}
               className="bg-main text-white text-lg p-4 w-40 text-center rounded-lg hover:cursor-pointer hover:brightness-115 uppercase"
            >
               {boton.label}
            </Link>
         ))}
      </div>
   );
}
