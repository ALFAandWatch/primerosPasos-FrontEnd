'use client';

import { login } from '@/services/login';
import { loginType } from '@/types/loginType';
import { validateLogin } from '@/utils/validateLogin';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function LoginPage() {
   const router = useRouter();

   const handleLogin = async (datos: loginType) => {
      try {
         const response = await login(datos);

         if (response.usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(response.usuario));
            router.push('/home');
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos. Inténtelo de nuevo.',
         });
      }
   };

   return (
      <div className="p-6 flex flex-col justify-center items-center w-screen h-screen gap-20">
         <div className="h-60 w-60 relative">
            <Image src="/logo.png" alt="Logo" fill sizes="20vw" priority />
         </div>
         <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
            validate={validateLogin}
            validateOnChange={true}
         >
            <Form className="flex flex-col items-center gap-20">
               <Field
                  name="email"
                  id="email"
                  placeholder="Ingrese su Usuario"
                  className="placeholder-main text-md text-gray-600 text-center border-b-1 border-black w-55 outline-none"
               />
               <Field
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Ingrese su Password"
                  className="placeholder-main text-md text-gray-600 text-center border-b-1 border-black w-55 outline-none"
               />
               <button
                  type="submit"
                  className="bg-main text-white text-md p-3 px-6 rounded-lg hover:cursor-pointer hover:brightness-115 uppercase"
               >
                  Login
               </button>
            </Form>
         </Formik>
         <Link
            href="/registerEmpresa"
            className="text-main text-md text-center hover:underline"
         >
            ¿No tienes cuenta aún? Crea una.
         </Link>
      </div>
   );
}
