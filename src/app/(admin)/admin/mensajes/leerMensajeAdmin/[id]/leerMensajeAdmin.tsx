'use client';

import { enviarMensaje } from '@/services/enviarMensaje';
import { marcarComoLeido } from '@/services/marcarComoLeido';
import { traerEmpresaPorId } from '@/services/traerEmpresaPorId';
import { traerMensajePorId } from '@/services/traerMensajePorId';
import { mensajesDevueltosType } from '@/types/mensajesDevueltosType';
import { nuevoMensajeType } from '@/types/nuevoMensajeType';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type Empresa = {
   id: number;
   nombreEmpresa: string;
};

const leerMensajeAdmin = () => {
   const router = useRouter();
   const { id } = useParams();
   const mensajeId = Number(id);

   const [mensaje, setMensaje] = useState<mensajesDevueltosType | null>(null);
   const [mostrarComposeModal, setMostrarComposeModal] = useState(false);
   const [filtered, setFiltered] = useState<Empresa[]>([]);
   const [query, setQuery] = useState('');
   const [mensajeEnviado, setMensajeEnviado] = useState(false);
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [destinatario, setDestinatario] = useState('');

   const [loading, setLoading] = useState(true);
   const [resolvedInitialValues, setResolvedInitialValues] =
      useState<nuevoMensajeType | null>(null);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   useEffect(() => {
      const fetchMensaje = async (id: number) => {
         try {
            const mensaje = await traerMensajePorId(id);
            setMensaje(mensaje);
         } catch (error) {
            console.log(error);
         }
      };
      fetchMensaje(mensajeId);
   }, [id]);

   useEffect(() => {
      if (!mensaje?.id) return;

      if (mensaje.remitente?.rol === 'Admin') return;

      const leido = async () => {
         try {
            await marcarComoLeido(mensaje.id);
         } catch (error) {
            console.log(error);
         }
      };
      leido();
   }, [mensaje]);

   useEffect(() => {
      console.log(mensaje);
   }, [mensaje]);

   const initialValues: nuevoMensajeType = {
      asunto: '',
      contenido: '',
      remitenteId: usuario?.id || 'admin',
      destinatarioId: mensaje?.remitente.id ?? 0,
      mensajePadreId: mensajeId,
   };

   useEffect(() => {
      const fetchEmpresa = async () => {
         let empresaNombre = '';
         if (initialValues.destinatarioId) {
            try {
               const empresa = await traerEmpresaPorId(
                  Number(initialValues.destinatarioId)
               );
               if (empresa) {
                  empresaNombre = empresa.nombreEmpresa;
               }
            } catch (error) {
               console.error(error);
            }
         }

         setDestinatario(empresaNombre);
         setResolvedInitialValues({
            ...initialValues,
            destinatarioId: initialValues.destinatarioId,
         });
         setLoading(false);
      };

      fetchEmpresa();
   }, [initialValues]);

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
         <div className="lg:ml-2 bg-fondo p-6 h-full lg:pr-56 relative overflow-y-auto flex flex-col gap-3">
            {/* Botón volver */}
            <div className="flex items-center gap-4">
               <button
                  type="button"
                  onClick={() => router.back()}
                  className="relative h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center hover:cursor-pointer"
               >
                  <Image src="/icons/atras.svg" alt="Atrás" fill sizes="10vh" />
               </button>
               <h1 className="text-xl lg:text-2xl font-semibold text-main">
                  Mensaje
               </h1>
            </div>
            <div className="flex justify-end">
               <button
                  className="bg-main text-white p-3 px-4 rounded-lg"
                  onClick={() => setMostrarComposeModal(true)}
               >
                  Responder
               </button>
            </div>

            {/* Contenedor del mensaje */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
               {/* Asunto */}
               <h2 className="text-xl lg:text-3xl font-bold text-main truncate">
                  {mensaje?.asunto ? (
                     mensaje.asunto
                  ) : (
                     <span className="text-main/50 italic font-normal">
                        {`(`}Sin asunto{`)`}
                     </span>
                  )}
               </h2>

               {/* Información del remitente */}
               <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span className="text-black">
                     De:{' '}
                     <span className="text-gray-400">
                        {mensaje?.remitente.nombreTitular || 'Desconocido'}
                     </span>
                  </span>
                  <span className="text-black">
                     Fecha:{' '}
                     <span className="text-gray-400">
                        {mensaje?.fechaEnvio
                           ? formatearFechaCorta(new Date(mensaje.fechaEnvio))
                           : ''}
                     </span>
                  </span>
               </div>

               {/* Cuerpo del mensaje */}
               <div className="whitespace-pre-wrap text-gray-600 text-md">
                  {mensaje?.contenido}
               </div>

               {/* Mensaje padre */}
               {mensaje?.mensajePadre && (
                  <div className="bg-gray-100 rounded-lg shadow-inner p-4 text-sm text-gray-500 italic border-l-4 border-gray-400">
                     <span className="font-semibold">
                        {mensaje.mensajePadre.remitente.nombreTitular} escribió:
                     </span>
                     <div className="whitespace-pre-wrap mt-1">
                        {mensaje.mensajePadre.contenido}
                     </div>
                     <div className="text-xs text-gray-400 mt-1">
                        {mensaje.mensajePadre.fechaEnvio
                           ? formatearFechaCorta(
                                new Date(mensaje.mensajePadre.fechaEnvio)
                             )
                           : ''}
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* MODAL RESPONDER MENSAJE */}
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
                        // validate={validateNuevoMensajeAdmin}
                     >
                        {({ values, errors, touched }) => (
                           <Form className="flex flex-col gap-4">
                              <h2 className="text-xl md:text-2xl text-main font-bold text-center uppercase">
                                 Nuevo Mensaje
                              </h2>

                              <Field name="destinatario">
                                 {({ field, form }: any) => (
                                    <div className="relative">
                                       <input
                                          {...field}
                                          type="text"
                                          placeholder="Buscar empresa..."
                                          value={query}
                                          onChange={(e) => {
                                             setQuery(e.target.value);
                                             form.setFieldValue(
                                                'destinatario',
                                                e.target.value
                                             );
                                          }}
                                          className="w-full border-2 border-yellow-600/30 p-2 rounded bg-[#FFF8DC] placeholder:text-gray-400 placeholder:italic text-black"
                                       />
                                       {filtered.length > 0 && (
                                          <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow text-gray-500 italic">
                                             {filtered.map((empresa) => (
                                                <li
                                                   key={empresa.id}
                                                   className="p-2 cursor-pointer hover:bg-gray-100"
                                                   onClick={() => {
                                                      setQuery(
                                                         empresa.nombreEmpresa
                                                      );
                                                      form.setFieldValue(
                                                         'destinatarioId',
                                                         empresa.id
                                                      ); // guarda el id real
                                                      setFiltered([]);
                                                   }}
                                                >
                                                   {empresa.nombreEmpresa}
                                                </li>
                                             ))}
                                          </ul>
                                       )}
                                    </div>
                                 )}
                              </Field>

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

export default leerMensajeAdmin;
