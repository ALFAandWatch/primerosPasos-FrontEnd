'use client';
import { Mensaje } from '@/components/Mensaje/Mensaje';
import { enviarMensaje } from '@/services/enviarMensaje';
import { MensajesTipo, traerMensajes } from '@/services/traerMensajes';
import { mensajesDevueltosType } from '@/types/mensajesDevueltosType';
import { nuevoMensajeType } from '@/types/nuevoMensajeType';
import { validateNuevoMensaje } from '@/utils/validateNuevoMensaje';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const mensajes = () => {
   const [mensajes, setMensajes] = useState<mensajesDevueltosType[]>([]);
   const [opcion, setOpcion] = useState<MensajesTipo>('all');
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [mostrarComposeModal, setMostrarComposeModal] = useState(false);
   const [mensajeEnviado, setMensajeEnviado] = useState(false);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   useEffect(() => {
      if (!usuario) return;

      const fetchMensajes = async () => {
         const data = await traerMensajes(opcion, usuario.id);
         setMensajes(data);
      };
      fetchMensajes();
   }, [opcion, usuario, mensajeEnviado]);

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setOpcion(e.target.value as MensajesTipo);
   };

   const initialValues: nuevoMensajeType = {
      asunto: '',
      contenido: '',
      remitenteId: usuario?.id ?? 0,
      destinatarioId: 'admin',
   };

   const handleEnviarMensaje = async (data: nuevoMensajeType) => {
      try {
         await enviarMensaje(data);
         setMensajeEnviado(true);
         setTimeout(() => {
            setMensajeEnviado(false);
         }, 500);
         setMostrarComposeModal(false);
         Swal.fire('Éxito', 'Mensaje enviado correctamente', 'success');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="lg:ml-2 bg-fondo p-6 h-full lg:pr-56 relative overflow-y-auto flex flex-col">
            <div className="flex justify-end gap-2">
               <div className="bg-main p-5 lg:p-3 py-3 lg:py-1 rounded-md font-bold hidden lg:flex lg:w-fit gap-2 items-center hover:brightness-115 hover:cursor-pointer">
                  <div className="relative h-8 aspect-square">
                     <Image
                        src="/icons/newMail.svg"
                        alt="Nuevo Email"
                        fill
                        sizes="10vw"
                        className="invert"
                     />
                  </div>
                  <button
                     type="button"
                     className="text-md"
                     onClick={() => setMostrarComposeModal(true)}
                  >
                     Nuevo Mensaje
                  </button>
               </div>
               <div className="flex w-full items-stretch lg:w-1/3">
                  <p className="font-semibold w-1/3 lg:w-4/7 text-center border border-white bg-main py-4 lg:p-2 text-white font-(family-name:--font-montserrat) flex items-center justify-center">
                     Filtrar
                  </p>
                  <select
                     onChange={handleChange}
                     className="w-full text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
                  >
                     <option value="all">Todos</option>
                     <option value="recibidos">Recibidos</option>
                     <option value="enviados">Enviados</option>
                  </select>
               </div>
            </div>
            <div className="h-[calc(100vh-10rem)] flex flex-col gap-3 lg:gap-2 mt-3 overflow-y-auto w-full pb-30">
               {mensajes.map((mensaje) => (
                  <Mensaje key={mensaje.id} data={mensaje} />
               ))}
               {/* <div className="h-20 shrink-0" /> */}
            </div>
            {/* BOTON DE NUEVO MENSAJE */}
            <div className="fixed bottom-8 right-5 bg-main p-5 py-3 rounded-md font-bold flex gap-2 items-center lg:hidden">
               <div className="relative h-8 aspect-square">
                  <Image
                     src="/icons/newMail.svg"
                     alt="Nuevo Email"
                     fill
                     sizes="10vw"
                     className="invert"
                  />
               </div>
               <button
                  type="button"
                  className="text-xl"
                  onClick={() => setMostrarComposeModal(true)}
               >
                  Nuevo Mensaje
               </button>
            </div>
         </div>

         {/* MODAL DE NUEVO MENSAJE */}
         {mostrarComposeModal && (
            <>
               {/* Overlay + contenedor */}
               <div
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
                  onClick={() => setMostrarComposeModal(false)}
               >
                  {/* Caja del modal */}
                  <div
                     className="bg-fondo p-6 rounded-lg shadow-lg w-[90%] max-w-lg md:max-w-2xl lg:max-w-3xl"
                     onClick={(e) => e.stopPropagation()} // evita cerrar al clickear adentro
                  >
                     <Formik
                        onSubmit={handleEnviarMensaje}
                        initialValues={initialValues}
                        validate={validateNuevoMensaje}
                     >
                        {({ values, errors, touched }) => (
                           <Form className="flex flex-col gap-4">
                              <h2 className="text-xl md:text-2xl text-main font-bold text-center uppercase">
                                 Nuevo Mensaje
                              </h2>

                              <Field
                                 name="asunto"
                                 className="w-full border-2 border-yellow-600/30 p-2 rounded bg-[#FFF8DC] placeholder:text-gray-400 placeholder:italic text-black"
                                 placeholder="Asunto"
                              />

                              <Field name="contenido">
                                 {({ field, meta }: any) => (
                                    <textarea
                                       {...field}
                                       placeholder="Escribe tu mensaje..."
                                       className={`w-full border-2 p-2 rounded h-32 md:h-40 bg-[#FFF8DC] placeholder:text-gray-400 placeholder:italic text-black ${
                                          meta.touched && meta.error
                                             ? 'border-red-400 bg-red-400/10'
                                             : 'border-yellow-600/30'
                                       }`}
                                    />
                                 )}
                              </Field>

                              <ErrorMessage
                                 name="contenido"
                                 component="div"
                                 className="text-red-500 text-sm mt-1 p-2 bg-red-100 rounded"
                              />

                              <div className="flex justify-end">
                                 <button
                                    type="submit"
                                    className="px-6 py-2 bg-main text-white rounded hover:bg-main/90 transition"
                                 >
                                    Enviar
                                 </button>
                              </div>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default mensajes;
