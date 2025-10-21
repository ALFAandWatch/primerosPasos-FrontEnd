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
                  Módulo de Registro
               </h3>
               <Link
                  href="/home"
                  className=" text-white w-fit text-sm rounded-md flex gap-1 items-center hover:cursor-pointer hover:underline self-end pr-5"
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
            <div className="p-4 text-main">
               <h2 className="font-black text-xl mb-3">Ventas</h2>
               <ul className="space-y-2">
                  <li>
                     <Link
                        href="/home/registros/ventasContado"
                        onClick={() => setOpen(false)}
                        className="hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center"
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/contado.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Contado
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/home/registros/ventasCredito"
                        onClick={() => setOpen(false)}
                        className="hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center"
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/credito.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Crédito
                     </Link>
                  </li>
               </ul>
               <hr className="my-4 border-gray-300" />
               <h2 className="font-black text-xl mb-3">Compras</h2>
               <ul className="space-y-2">
                  <li>
                     <Link
                        href="/home/registros/comprasContado"
                        onClick={() => setOpen(false)}
                        className="hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center"
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/contado.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Contado
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/home/registros/comprasCredito"
                        onClick={() => setOpen(false)}
                        className="hover:text-orange-300 cursor-pointer font-semibold flex gap-4 items-center"
                     >
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/credito.svg"
                              alt="Pagos"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Crédito
                     </Link>
                  </li>
               </ul>
               <hr className="my-4 border-gray-300" />
               <ul className="space-y-2">
                  <li>
                     <div className="flex gap-5 items-center">
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/personal.svg"
                              alt="Personal"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        <Link
                           href="/home/registros/personal"
                           onClick={() => setOpen(false)}
                           className="font-semibold hover:text-orange-300 cursor-pointer"
                        >
                           Personal
                        </Link>
                     </div>
                  </li>
                  <li>
                     <div className="flex gap-5 items-center">
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/stock.svg"
                              alt="Stock"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        <Link
                           href="/home/registros/stock"
                           onClick={() => setOpen(false)}
                           className="font-semibold hover:text-orange-300 cursor-pointer"
                        >
                           Stock
                        </Link>
                     </div>
                  </li>
                  <li>
                     <div className="flex gap-5 items-center">
                        <div className="relative w-7 aspect-square">
                           <Image
                              src="/icons/mensajes.svg"
                              alt="Mensajes"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        <Link
                           href="/home/registros/mensajes"
                           onClick={() => setOpen(false)}
                           className="font-semibold hover:text-orange-300 cursor-pointer"
                        >
                           Mensajes
                        </Link>
                     </div>
                  </li>
               </ul>
               <hr className="my-4 border-gray-300" />
               <button
                  className="flex gap-5 items-center"
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
