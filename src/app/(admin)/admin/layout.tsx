'use client';

import '../../../app/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [open, setOpen] = useState(false);
   const router = useRouter();

   return (
      <html lang="es">
         <body>
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
                     <h3 className="text-white text-lg font-bold">
                        Módulo de Registro
                     </h3>
                  </div>
                  <div className="p-4 text-main">
                     <h2 className="font-black text-xl mb-3">Ventas</h2>
                     <ul className="space-y-4">
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
                     <ul className="space-y-4">
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
                     <ul className="space-y-4">
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
                                 className="font-semibold"
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
                                 className="font-semibold"
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
                              <p className="font-semibold">Mensajes</p>
                           </div>
                        </li>
                     </ul>
                     <hr className="my-4 border-gray-300" />
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
                        Registros
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
