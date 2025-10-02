'use client';

import { registerType } from '@/types/registerType';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { register } from '../../../services/register';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { validateRegister } from '@/utils/validateRegister';
import { RolEnum } from '@/enums/RolEnum';

export default function registerPage() {
   const router = useRouter();

   const handleRegister = async (datos: registerType) => {
      try {
         const respuesta = await register(datos);

         if (respuesta.empresa) {
            Swal.fire({
               title: 'Registro Exitoso',
               icon: 'success',
               confirmButtonColor: '#5c7cab',
            }).then((result) => {
               if (result.isConfirmed) {
                  router.push('/login');
               }
            });
         }
      } catch (error) {
         Swal.fire({
            title: 'Error al intentar registo',
            icon: 'error',
            confirmButtonColor: '#ff6b35',
         });
      }
   };

   return (
      <>
         <div className="p-6 flex flex-col gap-8 justify-center w-screen h-full overflow-y-auto py-40 bg-fondo lg:w-240 lg:mx-auto">
            <h1 className="text-2xl uppercase text-main ps-20">
               Formulario de Inscripción
            </h1>
            <Formik
               initialValues={{
                  rol: RolEnum.EMPRESA,
                  nombreEmpresa: '',
                  nombreTitular: '',
                  email: '',
                  password: '',
                  passwordRepeat: '',
                  cedula: '',
                  domicilio: '',
                  telefono: '',
                  rut: '',
                  actividad: '',
               }}
               onSubmit={(values) => handleRegister(values)}
               validate={validateRegister}
               validateOnChange={true}
            >
               <Form className="flex flex-col gap-10 w-full lg:px-20">
                  {/* nombreEmpresa */}
                  <div>
                     <label
                        htmlFor="nombreEmpresa"
                        className="uppercase text-main text-md"
                     >
                        Nombre de la Empresa
                     </label>
                     <Field
                        id="nombreEmpresa"
                        name="nombreEmpresa"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-200/70 p-1 px-2"
                     />
                     <ErrorMessage
                        name="nombreEmpresa"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* nombreTitular */}
                  <div>
                     <label
                        htmlFor="nombreTitular"
                        className="uppercase text-main text-md"
                     >
                        Nombre del Titular
                     </label>
                     <Field
                        id="nombreTitular"
                        name="nombreTitular"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="nombreTitular"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* email */}
                  <div>
                     <label
                        htmlFor="email"
                        className="uppercase text-main text-md"
                     >
                        Email
                     </label>
                     <Field
                        id="email"
                        name="email"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* password */}
                  <div>
                     <label
                        htmlFor="password"
                        className="uppercase text-main text-md"
                     >
                        Contraseña
                     </label>
                     <p className="text-main text-xs">
                        Debe tener al menos 8 caracteres.
                     </p>
                     <Field
                        id="password"
                        name="password"
                        type="password"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* repetir password */}
                  <div>
                     <label
                        htmlFor="passwordRepeat"
                        className="uppercase text-main text-md"
                     >
                        Repita Contraseña
                     </label>
                     <Field
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type="password"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="passwordRepeat"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* cedula */}
                  <div>
                     <label
                        htmlFor="cedula"
                        className="uppercase text-main text-md"
                     >
                        Número de Cédula
                     </label>
                     <p className="text-main text-xs">
                        Todos los dígitos sin puntos ni guión.
                     </p>
                     <Field
                        id="cedula"
                        name="cedula"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="cedula"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* domicilio */}
                  <div>
                     <label
                        htmlFor="domicilio"
                        className="uppercase text-main text-md"
                     >
                        Domicilio
                     </label>
                     <Field
                        id="domicilio"
                        name="domicilio"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="domicilio"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* telefono */}
                  <div>
                     <label
                        htmlFor="telefono"
                        className="uppercase text-main text-md"
                     >
                        Teléfono
                     </label>
                     <Field
                        id="telefono"
                        name="telefono"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="telefono"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* rut */}
                  <div>
                     <label
                        htmlFor="rut"
                        className="uppercase text-main text-md"
                     >
                        Rut
                     </label>
                     <Field
                        id="rut"
                        name="rut"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="rut"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>

                  {/* Actividad */}
                  <div>
                     <label
                        htmlFor="actividad"
                        className="uppercase text-main text-md"
                     >
                        Actividad de la Empresa
                     </label>
                     <Field
                        id="actividad"
                        name="actividad"
                        className="text-md text-gray-600 border-b-1 border-black outline-none w-full focus:bg-gray-100 p-1 px-2"
                     />
                     <ErrorMessage
                        name="actividad"
                        component="div"
                        className="text-red-500/80 uppercase font-bold mt-2 text-md rounded-md p-1"
                     />
                  </div>
                  <button
                     type="submit"
                     className="text-md p-3 px-6 rounded-md bg-main w-40 mx-auto uppercase hover:brightness-115 hover:cursor-pointer"
                  >
                     Registrarse
                  </button>
               </Form>
            </Formik>
         </div>
      </>
   );
}
