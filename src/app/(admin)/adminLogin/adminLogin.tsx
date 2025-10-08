'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateAdminLogin } from '@/utils/validateAdminLogin';
import { login } from '@/services/login';
import { loginType } from '@/types/loginType';
import Swal from 'sweetalert2';

type Values = {
   email: string;
   password: string;
};

export default function adminLogin() {
   const router = useRouter();

   const initialValues: Values = { email: '', password: '' };

   const handleLogin = async (datos: loginType) => {
      try {
         const response = await login(datos);

         if (response.usuario.rol !== 'Admin') {
            throw new Error('No autorizado');
         }

         if (response.token) {
            sessionStorage.setItem('token', response.token);
            if (response.usuario) {
               sessionStorage.setItem(
                  'usuario',
                  JSON.stringify(response.usuario)
               );
               router.push('/admin');
            }
         }
      } catch (error: any) {
         let message = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';

         if (error.message === 'No autorizado') {
            message =
               'Acceso restringido: solo administradores pueden ingresar.';
         }
         Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: message,
         });
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-fondo p-4">
         <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
               Panel de Admin
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
               Iniciá sesión con tu cuenta de administrador
            </p>

            <Formik
               initialValues={initialValues}
               validate={validateAdminLogin}
               onSubmit={handleLogin}
            >
               {({ isSubmitting }) => (
                  <Form className="space-y-4">
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Email
                        </label>
                        <Field
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           className="w-full text-gray-600 placeholder:text-gray-400 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main/40 focus:border-main bg-gray-50"
                           placeholder="admin@ejemplo.com"
                        />
                        <ErrorMessage name="email">
                           {(msg) => (
                              <div className="text-red-600 text-sm mt-1">
                                 {msg}
                              </div>
                           )}
                        </ErrorMessage>
                     </div>

                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Contraseña
                        </label>
                        <Field
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           className="w-full text-gray-600 placeholder:text-gray-400 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main/40 focus:border-main bg-gray-50"
                           placeholder="••••••••"
                        />
                        <ErrorMessage name="password">
                           {(msg) => (
                              <div className="text-red-600 text-sm mt-1">
                                 {msg}
                              </div>
                           )}
                        </ErrorMessage>
                     </div>

                     <div className="flex items-center justify-between">
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="inline-flex items-center justify-center px-4 py-2 bg-main text-white rounded-md text-sm font-medium hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                           {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                        </button>

                        <button
                           type="button"
                           onClick={() => {
                              // alternativa rápida: permitir volver o ver ayuda
                              router.push('/');
                           }}
                           className="text-sm text-gray-500 hover:underline ml-3"
                        >
                           Volver
                        </button>
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
}
