import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('token')?.value;
   const pathname = request.nextUrl.pathname;

   const isUserLogin = pathname === '/login';
   const isAdminLogin = pathname === '/adminLogin';
   const isAdminRoute = pathname.startsWith('/admin');

   // Si ruta es pública, dejar pasar
   if (isUserLogin || isAdminLogin) {
      return NextResponse.next();
   }

   // Si NO hay token
   if (!token) {
      // Rutas admin → login admin
      if (isAdminRoute) {
         return NextResponse.redirect(new URL('/adminLogin', request.url));
      }

      // Rutas usuario → login normal
      return NextResponse.redirect(new URL('/login', request.url));
   }

   // Si hay token → continuar
   return NextResponse.next();
}

// Rutas donde corre el middleware
export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
