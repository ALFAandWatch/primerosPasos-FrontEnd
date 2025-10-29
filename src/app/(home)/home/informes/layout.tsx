'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/logout';

export default function RegistrosLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(1);

   const router = useRouter();

   const handleLogout = async () => {
      try {
         sessionStorage.removeItem('usuario');
         await logout();
         router.push('/login');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex h-screen w-screen relative">
         {/* Sidebar */}
         <aside
            className={`fixed top-0 left-0 h-full w-64 lg:w-[15rem] bg-white text-black flex flex-col transform transition-transform duration-300 z-40 font-(family-name:--font-montserrat) font-medium shadow-lg
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:fixed`}
         >
            <div className="bg-main flex flex-col justify-end items-center p-4 gap-1">
               <div className="h-30 w-30 relative self-center">
                  <Image
                     src="/logo.png"
                     alt="Logo"
                     fill
                     sizes="20vw"
                     priority
                  />
               </div>
               <h3 className="text-white text-lg font-bold text-center">
                  Módulo de Informes
               </h3>
               <Link
                  href="/home"
                  className=" text-white w-fit text-sm rounded-md flex gap-1 items-center hover:cursor-pointer hover:underline self-end mx-auto"
               >
                  <div className="h-4 aspect-square relative">
                     <Image
                        src="/icons/atras.svg"
                        alt="Logo"
                        fill
                        sizes="20vw"
                        className="invert"
                     />
                  </div>
                  Volver
               </Link>
            </div>
            <div className="text-main">
               <ul className="space-y-2">
                  <li>
                     <Link
                        href="/home/informes/pagos"
                        onClick={() => {
                           setOpen(false);
                           setSelected(1);
                        }}
                        className={`p-2 pl-4 hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center ${
                           selected === 1 ? 'bg-amber-200/60' : ''
                        }`}
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/contado.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Pagos
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/home/informes/sueldos"
                        onClick={() => {
                           setOpen(false);
                           setSelected(2);
                        }}
                        className={`p-2 pl-4 hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center ${
                           selected === 2 ? 'bg-amber-200/60' : ''
                        }`}
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/salary.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Sueldos
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/home/informes/stock"
                        onClick={() => {
                           setOpen(false);
                           setSelected(3);
                        }}
                        className={`p-2 pl-4 hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center ${
                           selected === 3 ? 'bg-amber-200/60' : ''
                        }`}
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/stock.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Stock
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/home/informes/balances"
                        onClick={() => {
                           setOpen(false);
                           setSelected(4);
                        }}
                        className={`p-2 pl-4 hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center ${
                           selected === 4 ? 'bg-amber-200/60' : ''
                        }`}
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/balance.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Balances
                     </Link>
                  </li>
               </ul>
               <hr className="my-2 border-gray-300" />
               <button
                  className="p-2 pl-4 flex gap-5 items-center"
                  onClick={handleLogout}
               >
                  <div className="relative w-7 aspect-square">
                     <Image
                        src="/icons/logout.svg"
                        alt="Mensajes"
                        fill
                        sizes="10vw"
                     />
                  </div>
                  <p className="font-semibold hover:text-orange-300 cursor-pointer">
                     Cerrar Sesión
                  </p>
               </button>
            </div>
         </aside>

         {/* Contenido principal */}
         <div className="flex-1 flex flex-col h-full">
            {/* Header con botón hamburguesa */}
            <header className="w-full p-4 bg-main flex items-center md:hidden">
               <button
                  onClick={() => setOpen(!open)}
                  className="text-white focus:outline-none"
               >
                  {open ? <X size={28} /> : <Menu size={28} />}
               </button>
               <h1 className="ml-4 font-semibold text-lg font-(family-name:--font-montserrat)">
                  Registros
               </h1>
            </header>

            {/* Contenido */}
            <main className="flex-1 bg-gray-50 lg:pl-[15rem] w-screen min-h-[100vh] overflow-y-auto overflow-x-hidden">
               {children}
            </main>
         </div>

         {/* Overlay en mobile */}
         {open && (
            <div
               className="fixed inset-0 bg-black/40 z-30 md:hidden"
               onClick={() => setOpen(false)}
            />
         )}
      </div>
   );
}
