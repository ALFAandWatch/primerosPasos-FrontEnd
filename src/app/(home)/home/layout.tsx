import '../../../app/globals.css';

import { Montserrat, Open_Sans, Roboto } from 'next/font/google';
import 'react-datepicker/dist/react-datepicker.css';

const montserrat = Montserrat({
   subsets: ['latin'],
   weight: ['400', '700'],
   variable: '--font-montserrat',
});

const openSans = Open_Sans({
   subsets: ['latin'],
   weight: ['400'],
   variable: '--font-open-sans',
});

const roboto = Roboto({
   subsets: ['latin'],
   weight: ['400'],
   variable: '--font-roboto',
});

export const metadata = {
   title: 'Primer Paso',
   description: 'Flujo de compra-venta de empresas',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="es" className="h-screen w-screen">
         <body
            className={`${montserrat.variable} ${openSans.variable} ${roboto.variable} antialiased h-screen w-screen overflow-hidden`}
         >
            {children}
         </body>
      </html>
   );
}
