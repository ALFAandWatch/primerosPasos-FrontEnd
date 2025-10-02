// src/app/(home)/layout.tsx
import React from 'react';
import '../../globals.css';

export default function HomeLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="es">
         <body>
            {/* Aquí se renderizan las páginas hijas */}
            <main className="bg-white">{children}</main>
         </body>
      </html>
   );
}
