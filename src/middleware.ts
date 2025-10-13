import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('token')?.value;
   const pathname = request.nextUrl.pathname;

   const isPublic = pathname === '/login' || pathname === '/adminLogin';

   // Si no hay token y la ruta no es /login, redirigir
   if (!token && !isPublic) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
   }

   // Si hay token o está en login, continuar
   return NextResponse.next();
}

// Definís las rutas donde corre el middleware
export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
