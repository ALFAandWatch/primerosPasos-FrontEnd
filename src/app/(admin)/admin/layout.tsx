'use client';

import '../../../app/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { logout } from '@/services/logout';

const montserrat = Montserrat({
   subsets: ['latin'],
   variable: '--font-montserrat',
   weight: ['400', '700', '900'],
});

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [open, setOpen] = useState(false);
   const [selected, setSelected] = useState(3);
   const router = useRouter();

   const handleLogout = async () => {
      try {
         sessionStorage.removeItem('usuario');
         await logout();
         router.push('/adminLogin');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <html lang="es">
         <body className={`${montserrat.variable} font-sans`}>
            <div className="flex h-screen relative">
               {/* Sidebar */}
               <aside
                  className={`fixed top-0 left-0 h-full w-64 bg-white text-black flex flex-col transform transition-transform duration-300 z-40 font-(family-name:--font-montserrat) font-medium shadow-lg
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static`}
               >
                  <div className="bg-main flex flex-col justify-end p-4 gap-4">
                     <div className="h-30 w-30 relative self-center">
                        <Image src="/logo.png" alt="Logo" fill sizes="20vw" />
                     </div>
                     <h3 className="text-white text-lg font-bold text-center">
                        Panel de Admin
                     </h3>
                  </div>
                  <div className="text-main">
                     <ul>
                        <li>
                           <div
                              className={`p-2 pl-4 flex gap-5 items-center ${
                                 selected === 1 ? 'bg-amber-200/60' : ''
                              }`}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/personal.svg"
                                    alt="Personal"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <Link
                                 href="/admin/empleados"
                                 onClick={() => {
                                    setOpen(false);
                                    setSelected(1);
                                 }}
                                 className="font-semibold"
                              >
                                 Empleados
                              </Link>
                           </div>
                        </li>
                        <li>
                           <div
                              className={`p-2 pl-4 flex gap-5 items-center ${
                                 selected === 2 ? 'bg-amber-200/60' : ''
                              }`}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/stock.svg"
                                    alt="Stock"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <Link
                                 href="/admin/stock"
                                 onClick={() => {
                                    setOpen(false);
                                    setSelected(2);
                                 }}
                                 className="font-semibold"
                              >
                                 Stock
                              </Link>
                           </div>
                        </li>
                        <li>
                           <div
                              className={`p-2 pl-4 flex gap-5 items-center ${
                                 selected === 3 ? 'bg-amber-200/60' : ''
                              }`}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/mensajes.svg"
                                    alt="Mensajes"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <Link
                                 href="/admin/mensajes"
                                 onClick={() => {
                                    setOpen(false);
                                    setSelected(3);
                                 }}
                                 className="font-semibold"
                              >
                                 Mensajes
                              </Link>
                           </div>
                        </li>
                        <li>
                           <div
                              className={`p-2 pl-4 flex gap-5 items-center ${
                                 selected === 4 ? 'bg-amber-200/60' : ''
                              }`}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/movimientos.svg"
                                    alt="Movimientos"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <Link
                                 href="/admin/movimientos"
                                 onClick={() => {
                                    setOpen(false);
                                    setSelected(4);
                                 }}
                                 className="font-semibold"
                              >
                                 Movimientos
                              </Link>
                           </div>
                        </li>
                        <li>
                           <div
                              className={`p-2 pl-4 flex gap-5 items-center ${
                                 selected === 5 ? 'bg-amber-200/60' : ''
                              }`}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/files.svg"
                                    alt="Archivos"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <Link
                                 href="/admin/archivos"
                                 onClick={() => {
                                    setOpen(false);
                                    setSelected(5);
                                 }}
                                 className="font-semibold"
                              >
                                 Archivos
                              </Link>
                           </div>
                        </li>
                        <li>
                           <hr className="my-2 border-gray-300" />
                           <button
                              className="flex gap-5 items-center"
                              onClick={handleLogout}
                           >
                              <div className="relative w-7 aspect-square">
                                 <Image
                                    src="/icons/logout.svg"
                                    alt="Cerrar Sesión"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              <p className="font-semibold hover:text-orange-300 cursor-pointer">
                                 Cerrar Sesión
                              </p>
                           </button>
                        </li>
                     </ul>
                     <hr className="my-2 border-gray-300" />
                  </div>
               </aside>

               {/* Contenido principal */}
               <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Header con botón hamburguesa */}
                  <header className="w-full p-4 bg-main flex items-center md:hidden">
                     <button
                        onClick={() => setOpen(!open)}
                        className="text-white focus:outline-none"
                     >
                        {open ? <X size={28} /> : <Menu size={28} />}
                     </button>
                     <h1 className="ml-4 font-semibold text-lg font-(family-name:--font-montserrat)">
                        Admin
                     </h1>
                  </header>

                  {/* Contenido */}
                  <main className="flex-1 bg-gray-50">{children}</main>
               </div>

               {/* Overlay en mobile */}
               {open && (
                  <div
                     className="fixed inset-0 bg-black/40 z-30 md:hidden"
                     onClick={() => setOpen(false)}
                  />
               )}
            </div>
         </body>
      </html>
   );
}
