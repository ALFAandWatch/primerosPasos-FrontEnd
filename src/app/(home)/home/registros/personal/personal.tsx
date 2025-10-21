'use client';
import { borrarEmpleado } from '@/services/borrarEmpleado';
import { nuevoEmpleado } from '@/services/nuevoEmpleado';
import { traerEmpleadosDeLaEmpresa } from '@/services/traerEmpleadosDeLaEmpresa';
import { empleadoDevueltoType } from '@/types/empleadoDevueltoType';
import { empleadoType } from '@/types/empleadoType';
import { validarEmpleado } from '@/utils/validateNuevoEmpleado';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const personal = () => {
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [mostrarModalNuevoEmpleado, setMostrarModalNuevoEmpleado] =
      useState(false);
   const [empleados, setEmpleados] = useState<empleadoDevueltoType[]>([]);
   const [empleadoBorrado, setEmpleadoBorrado] = useState(false);
   const [nuevoRegistro, setNuevoRegistro] = useState(false);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   useEffect(() => {
      const traerEmpleados = async () => {
         if (!usuario) {
            return;
         }
         try {
            const respuesta = await traerEmpleadosDeLaEmpresa(usuario?.id);
            setEmpleados(respuesta.data);
         } catch (error) {
            console.log('Error al traer empleados: ', error);
         }
      };

      traerEmpleados();
   }, [usuario, nuevoRegistro, empleadoBorrado]);

   if (!usuario) {
      return <p>Cargando empresas...</p>;
   }

   const initialValues = {
      nombre: '',
      apellido: '',
      cedula: '',
      usuarioId: usuario.id,
   };

   const handleSubmit = async (data: empleadoType) => {
      try {
         const response = await nuevoEmpleado(data);
         setNuevoRegistro(true);
         setTimeout(() => {
            setNuevoRegistro(false);
         }, 500);
         if (response) {
            setMostrarModalNuevoEmpleado(false);
            Swal.fire('Éxito', 'Empleado registrado correctamente', 'success');
         }
      } catch (error: any) {
         console.log(error);
         Swal.fire(
            'Error',
            error.message || 'No se pudieron guardar los movimientos',
            'error'
         );
      }
   };

   const handleBorrarEmpleado = (empleado: empleadoDevueltoType) => {
      const { nombre, apellido, id } = empleado;

      Swal.fire({
         title: '¿Borrar Empleado?',
         html: `
            ¿Estas seguro que quieres borrar al empleado <span class='text-red-400 font-bold'>${nombre}</span> <span class='text-red-400 font-bold'>${apellido}</span>?
            <br> Esta accion no es reversible.`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: 'oklch(70.4% 0.191 22.216)',
         cancelButtonColor: '#99a1af',
         confirmButtonText: 'Borrar',
         cancelButtonText: 'Cancelar',
         didOpen: () => {
            // Seleccionamos el botón de confirmar
            const confirmButton = Swal.getConfirmButton();
            if (confirmButton) {
               confirmButton.disabled = true;

               let segundos = 5; // tiempo que quieras
               confirmButton.textContent = `Borrar (${segundos})`;

               const interval = setInterval(() => {
                  segundos--;
                  if (segundos > 0) {
                     confirmButton.textContent = `Borrar (${segundos})`;
                  } else {
                     confirmButton.textContent = 'Borrar';
                     confirmButton.disabled = false;
                     clearInterval(interval);
                  }
               }, 1000);
            }
         },
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await borrarEmpleado(id);
               setEmpleadoBorrado(true);
               setTimeout(() => {
                  setEmpleadoBorrado(false);
               }, 500);
               Swal.fire({
                  title: 'Empleado borrado!',
                  icon: 'success',
               });
            } catch (error) {
               Swal.fire({
                  title: 'No se pudo borrar al empleado.',
                  icon: 'error',
               });
            }
         }
      });
   };

   return (
      <>
         <div className="lg:ml-2 bg-fondo p-6 h-full w-full font-(family-name:--font-montserrat) overflow-y-auto pb-30">
            <h1 className="text-main font-(family-name:--font-montserrat) font-semibold text-2xl pb-6">
               Registro de Personal
            </h1>
            <div className="flex flex-col justify-center border-2 border-main p-2 rounded-md bg-main/30 lg:w-[50%] lg:ml-[12%]">
               <p className="text-white text-center font-bold">
                  Presione el botón para registrar un nuevo empleado.
               </p>
               <button
                  onClick={() => setMostrarModalNuevoEmpleado(true)}
                  className="border border-gray-300 px-4 py-2 mt-5 rounded-md bg-main text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm"
               >
                  <div className="relative w-5 h-5 inline-block mr-1 mb-1 align-middle">
                     <Image
                        src="/icons/add.svg"
                        alt="Enviar"
                        fill
                        sizes="10vw"
                     />
                  </div>
                  Empleado
               </button>
            </div>
            <div className="bg-gray-100 p-1 min-h-[50%] mt-10 rounded-lg shadow-lg lg:w-[75%]">
               {empleados && empleados.length > 0 ? (
                  <table className="table-auto w-full">
                     <thead className="font-(family-name:--font-montserrat))">
                        <tr className="bg-main">
                           <td className="text-white uppercase font-bold p-1 border border-white">
                              Nombre
                           </td>
                           <td className="text-white uppercase font-bold p-1 border border-white hidden lg:table-cell">
                              <p className="">Cédula</p>
                           </td>
                           <td className="text-white uppercase font-bold p-1 border border-white"></td>
                        </tr>
                     </thead>
                     <tbody>
                        {empleados.map((empleado, index) => (
                           <tr key={index} className="">
                              <td className="border-2 border-white p-2 py-3">
                                 <p className="text-black text-sm lg:text-xl text-clip">
                                    {empleado.nombre} {empleado.apellido}
                                 </p>
                              </td>
                              <td className="border-2 border-white p-2 py-3 hidden lg:table-cell">
                                 <p className="text-black text-sm lg:text-xl text-clip">
                                    {empleado.cedula}
                                 </p>
                              </td>
                              <td className="border-2 border-white p-2 py-3 flex gap-2">
                                 <Link
                                    href={`/home/registros/personal/info/${empleado.id}`}
                                    className="px-4 lg:px-10 py-2 rounded-md bg-blue-400 text-white hover:brightness-115 hover:cursor-pointer mx-auto font-(family-name:--font-montserrat) font-semibold text-sm text-center flex items-center"
                                 >
                                    <span className="lg:hidden">Info</span>
                                    <span className="hidden lg:inline">
                                       Información
                                    </span>
                                 </Link>
                                 <button
                                    type="button"
                                    onClick={() =>
                                       handleBorrarEmpleado(empleado)
                                    }
                                    className="border border-gray-300 px-4 py-2 rounded-md bg-red-400 text-white hover:brightness-115 hover:cursor-pointer mx-auto font-(family-name:--font-montserrat) font-semibold text-sm flex items-center justify-center"
                                 >
                                    <div className="relative w-6 h-6 inline-block mr-1 mb-1 align-middle">
                                       <Image
                                          src="/icons/delete.svg"
                                          alt="Guardar Cambios"
                                          fill
                                          sizes="10vw"
                                       />
                                    </div>
                                    <span className="hidden lg:block">
                                       Eliminar
                                    </span>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <p className="text-main font-(family-name:--font-montserrat) italic border border-main rounded-md p-1 py-2 mt-4 text-center">
                     No tienes empleados registrados aún.
                  </p>
               )}
            </div>
         </div>

         {/* Modal Nuevo Empleado */}
         {mostrarModalNuevoEmpleado && (
            <div
               onClick={() => setMostrarModalNuevoEmpleado(false)}
               className="fixed inset-0 bg-black/60 flex items-center justify-center"
            >
               <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-lg p-6 max-w-md mx-8"
               >
                  <h2 className="text-xl lg:text-2xl mb-4 text-main font-bold text-center uppercase">
                     Nuevo empleado
                  </h2>
                  <Formik
                     initialValues={initialValues}
                     onSubmit={handleSubmit}
                     validate={validarEmpleado}
                  >
                     {({ errors }) => (
                        <Form className="font-(family-name:--font-montserrat)">
                           <div className="flex flex-col gap-8 my-8">
                              <div className="flex flex-col">
                                 <div className="flex gap-2">
                                    <label
                                       htmlFor="nombre"
                                       className="uppercase text-main font-bold lg:text-2xl"
                                    >
                                       Nombre:
                                    </label>
                                    <Field
                                       name="nombre"
                                       id="nombre"
                                       className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                    />
                                 </div>
                                 <ErrorMessage
                                    name="nombre"
                                    component="div"
                                    className="text-red-500 text-sm uppercase font-bold text-center"
                                 />
                              </div>

                              <div className="flex flex-col">
                                 <div className="flex gap-2">
                                    <label
                                       htmlFor="apellido"
                                       className="uppercase text-main font-bold lg:text-2xl"
                                    >
                                       Apellido:
                                    </label>
                                    <Field
                                       name="apellido"
                                       id="apellido"
                                       className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                    />
                                 </div>
                                 <ErrorMessage
                                    name="apellido"
                                    component="div"
                                    className="text-red-500 text-sm uppercase font-bold text-center"
                                 />
                              </div>
                              <div className="flex flex-col">
                                 <div className="flex gap-2">
                                    <label
                                       htmlFor="cedula"
                                       className="uppercase text-main font-bold lg:text-2xl"
                                    >
                                       Cédula:
                                    </label>
                                    <Field
                                       name="cedula"
                                       id="cedula"
                                       className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                    />
                                 </div>
                                 <ErrorMessage
                                    name="cedula"
                                    component="div"
                                    className="text-red-500 text-sm uppercase font-bold text-center"
                                 />
                              </div>
                           </div>
                           <button
                              type="submit"
                              className="border border-gray-300 px-4 py-2 mt-5 rounded-md bg-main text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm lg:p-2 lg:text-xl"
                           >
                              <div className="relative w-5 h-5 inline-block mr-1 mb-1 align-middle">
                                 <Image
                                    src="/icons/add.svg"
                                    alt="Enviar"
                                    fill
                                    sizes="10vw"
                                 />
                              </div>
                              Agregar
                           </button>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         )}
      </>
   );
};

export default personal;
