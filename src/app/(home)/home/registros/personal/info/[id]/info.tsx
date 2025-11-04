'use client';
import { editarEmpleado } from '@/services/editarEmpleado';
import { traerHorarioDeHoy } from '@/services/traerHorarioDeHoy';
import { traerEmpleadoPorId } from '@/services/treaerEmpleadoPorId';
import { empleadoDevueltoType } from '@/types/empleadoDevueltoType';
import { empleadoType } from '@/types/empleadoType';
import { horarioDevueltoType } from '@/types/horarioDevueltoType';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { formatearFecha } from '@/utils/formatearFecha';
import { guardarHorario } from '@/services/guardarNuevoHorario';
import { horarioType } from '@/types/horarioType';
import { validateHorario } from '@/utils/validateGuardarHorario';

const horarios = () => {
   const params = useParams();
   const empleadoId = Number(params.id);

   const [empleado, setEmpleado] = useState<empleadoDevueltoType | null>(null);
   const [empleadoEditado, setEmpleadoEditado] = useState(false);
   const [horarioEditado, setHorarioEditado] = useState(false);
   const [mostrarModalEditarEmpleado, setMostrarModalEditarEmpleado] =
      useState(false);

   const fechaDeHoy = new Date();
   const fechaStr = fechaDeHoy.toISOString().split('T')[0];

   const [fecha, setFecha] = useState<Date | null>(fechaDeHoy);
   const [horarioDeHoy, setHorarioDeHoy] = useState<horarioDevueltoType>({
      fecha: '',
      entrada: '',
      salida: '',
      estado: '',
      empleado: null,
   });

   const initialValuesEditar = {
      nombre: empleado?.nombre ?? '',
      apellido: empleado?.apellido ?? '',
      cedula: empleado?.cedula ?? '',
      usuarioId: empleado?.usuario?.id ?? 0,
   };

   const initialValuesHorario = {
      fecha: horarioDeHoy.fecha,
      entrada: horarioDeHoy.entrada,
      salida: horarioDeHoy.salida,
      estado: horarioDeHoy.estado,
      empleadoId: horarioDeHoy.empleado?.id ?? 0,
   };

   useEffect(() => {
      const fetchEmpleado = async () => {
         const empleadoDevuelto = await traerEmpleadoPorId(empleadoId);
         setEmpleado(empleadoDevuelto.data);
      };
      fetchEmpleado();
   }, []);

   useEffect(() => {
      const fetchHorario = async () => {
         if (!fecha || !empleado) return;

         const fechaStr = fecha.toISOString().split('T')[0];
         const horarioDevuelto = await traerHorarioDeHoy(fechaStr, empleado.id);
         setHorarioDeHoy(horarioDevuelto.data);
      };

      fetchHorario();
   }, [fecha, empleado]);

   useEffect(() => {
      const fetchEmpleado = async () => {
         const empleadoDevuelto = await traerEmpleadoPorId(empleadoId);
         setEmpleado(empleadoDevuelto.data);
      };
      fetchEmpleado();
   }, [empleadoEditado]);

   const handleCambiarFecha = async (nuevaFecha: Date | null) => {
      setFecha(nuevaFecha);

      try {
         if (nuevaFecha && empleado) {
            const fechaStr = nuevaFecha.toISOString().split('T')[0];
            const res = await traerHorarioDeHoy(fechaStr, empleado?.id);
            setHorarioDeHoy(res.data);
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleEditarEmpleado = async (data: empleadoType, id: number) => {
      try {
         await editarEmpleado(data, id);
         setEmpleadoEditado(true);
         setTimeout(() => {
            setEmpleadoEditado(false);
         }, 500);
         Swal.fire('Éxito', 'Empleado editado correctamente', 'success').then(
            (result) => {
               if (result.isConfirmed) {
                  setMostrarModalEditarEmpleado(false);
               }
            }
         );
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se pudo editar el empleado', 'error');
      }
   };

   const handleEditarHorario = async (data: horarioType) => {
      const payload =
         data.estado !== 'presente'
            ? {
                 ...data,
                 salida: null,
                 entrada: null,
                 empleadoId: empleado!.id,
              }
            : {
                 ...data,
                 empleadoId: empleado!.id,
              };

      try {
         await guardarHorario(payload);
         setHorarioEditado(true);
         setTimeout(() => {
            setHorarioEditado(false);
         }, 500);
         Swal.fire('Éxito', 'Horario guardado correctamente', 'success');
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se pudo guardar el horario', 'error');
      }
   };

   return (
      <>
         <div className="lg:ml-2 bg-fondo p-6 h-full w-full lg:pr-56 font-(family-name:--font-montserrat) overflow-y-auto pb-30">
            <h1 className="font-bold text-2xl text-main pb-6">
               Informacion del empleado
            </h1>
            <div className="flex flex-col justify-center border-2 border-main p-3 rounded-md bg-main/30 font-bold lg:w-[50%] lg:ml-[12%]">
               <ul>
                  <li className="lg:text-xl">
                     <span className="text-main">Nombre:</span>{' '}
                     {empleado?.nombre} {empleado?.apellido}
                  </li>
                  <li className="lg:text-xl">
                     <span className="text-main">Cedula:</span>{' '}
                     {empleado?.cedula}
                  </li>
               </ul>
               {empleado?.id && (
                  <button
                     onClick={() => setMostrarModalEditarEmpleado(true)}
                     className="px-4 py-2 rounded-md bg-blue-400 text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm lg:text-xl text-center mt-4"
                  >
                     Editar
                  </button>
               )}
            </div>
            <h2 className="font-bold text-2xl text-main py-6">Horarios</h2>
            <ul className="list-disc list-inside mb-4 pb-6">
               <li className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
                  Selecciona una fecha para ver los horarios del empleado de ese
                  día.
               </li>
               <li className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
                  Luego podrás modificar los datos en el formulario y guardarlos
                  usando el botón 'Guardar'.
               </li>
            </ul>
            <div className="flex flex-col bg-gray-100 p-1 h-fit rounded-lg shadow-lg lg:w-[75%]">
               <div className="flex">
                  <h2 className="grow border-2 border-white bg-main text-white font-bold text-center p-2">
                     Fecha:
                  </h2>
                  <DatePicker
                     selected={fecha}
                     onChange={(date) => handleCambiarFecha(date)}
                     dateFormat="dd/MM/yyyy"
                     className="border-2 border-yellow-600/30 text-black bg-[#FFF0B3] font-bold text-center p-2"
                  />
               </div>
               <div className="border-2 border-main mt-2 mb-1">
                  {fecha && (
                     <div className="bg-main/20 m-1">
                        <p className="text-black font-(family-name:--font-montserrat) text-center">
                           Horario del dia:
                        </p>
                        <p className="text-main font-(family-name:--font-montserrat) font-bold text-center">
                           {formatearFecha(fecha)}
                        </p>
                     </div>
                  )}
                  <div>
                     <Formik<horarioType>
                        initialValues={initialValuesHorario}
                        validate={validateHorario}
                        onSubmit={handleEditarHorario}
                        enableReinitialize
                     >
                        {({ values, setFieldValue }) => (
                           // bg-[#FFF8DC] even:bg-[#FFF0B3] hover:bg-[#FFE699]
                           <Form className="p-1 flex flex-col gap-2">
                              <div className="flex gap-1">
                                 <label
                                    htmlFor="estado"
                                    className="text-white font-bold bg-main grow-2 border-2 border-white text-center text-sm px-3 flex justify-center items-center w-[40%]"
                                 >
                                    Estado
                                 </label>
                                 <Field
                                    as="select"
                                    name="estado"
                                    id="estado"
                                    onChange={(
                                       e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                       const value = e.target.value;
                                       setFieldValue('estado', value);

                                       // Si no es presente, vaciar entrada y salida
                                       if (value !== 'presente') {
                                          setFieldValue('entrada', '');
                                          setFieldValue('salida', '');
                                       }
                                    }}
                                    className="border-2 border-yellow-600/30 text-black bg-[#FFF0B3] text-center p-2 w-[60%]"
                                 >
                                    <option value="">
                                       Seleccione un estado
                                    </option>
                                    <option value="presente">Presente</option>
                                    <option value="falta">Falta</option>
                                    <option value="salud">
                                       Certificado Médico
                                    </option>
                                    <option value="vacaciones">Licencia</option>
                                    <option value="libre">Día Libre</option>
                                 </Field>
                              </div>
                              <div className="flex gap-1">
                                 <label
                                    htmlFor="entrada"
                                    className="text-white font-bold bg-main grow-1 border-2 border-white text-center text-sm px-3 flex justify-center items-center w-[40%]"
                                 >
                                    Horario de Entrada
                                 </label>
                                 <Field
                                    name="entrada"
                                    id="entrada"
                                    type="time"
                                    value={values.entrada ?? ''}
                                    disabled={values.estado !== 'presente'}
                                    className={`border-2 border-yellow-600/30 focus:border-main text-black bg-[#FFF0B3] font-bold text-center p-2 w-[60%] disabled:bg-gray-200 disabled:cursor-not-allowed`}
                                 />
                              </div>
                              <div className="flex gap-1">
                                 <label
                                    htmlFor="salida"
                                    className="text-white font-bold bg-main grow-1 border-2 border-white text-center text-sm px-3 flex justify-center items-center w-[40%]"
                                 >
                                    Horario de Salida
                                 </label>
                                 <Field
                                    name="salida"
                                    id="salida"
                                    type="time"
                                    value={values.salida ?? ''}
                                    disabled={values.estado !== 'presente'}
                                    className={`border-2 border-yellow-600/30 text-black bg-[#FFF0B3] font-bold text-center p-2 w-[60%] disabled:bg-gray-200 disabled:cursor-not-allowed`}
                                 />
                              </div>
                              <button
                                 type="submit"
                                 className="border border-gray-300 px-4 py-2 my-2 rounded-md bg-blue-400 text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm"
                              >
                                 Guardar
                              </button>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
            </div>
         </div>

         {/* Modal Nuevo Empleado */}
         {mostrarModalEditarEmpleado && (
            <div
               onClick={() => setMostrarModalEditarEmpleado(false)}
               className="fixed inset-0 bg-black/60 flex items-center justify-center"
            >
               <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-lg p-6 max-w-md mx-8"
               >
                  <h2 className="text-xl mb-4 text-main font-bold text-center uppercase">
                     Editar empleado
                  </h2>
                  <Formik
                     initialValues={initialValuesEditar}
                     onSubmit={(values) =>
                        handleEditarEmpleado(values, empleadoId)
                     }
                     enableReinitialize
                  >
                     {({ errors }) => (
                        <Form className="font-(family-name:--font-montserrat) bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-auto">
                           <h2 className="text-2xl font-bold text-main mb-6 text-center uppercase tracking-wide">
                              Editar Empleado
                           </h2>

                           <div className="flex flex-col gap-6">
                              {/* Nombre */}
                              <div className="flex flex-col gap-1">
                                 <label
                                    htmlFor="nombre"
                                    className="text-sm font-semibold text-gray-700"
                                 >
                                    Nombre
                                 </label>
                                 <Field
                                    name="nombre"
                                    id="nombre"
                                    className="border border-gray-300 rounded-md p-2 text-gray-900 focus:border-main focus:ring-main focus:ring-1 outline-none transition-all"
                                 />
                                 <ErrorMessage
                                    name="nombre"
                                    component="div"
                                    className="text-red-500 text-xs font-semibold"
                                 />
                              </div>

                              {/* Apellido */}
                              <div className="flex flex-col gap-1">
                                 <label
                                    htmlFor="apellido"
                                    className="text-sm font-semibold text-gray-700"
                                 >
                                    Apellido
                                 </label>
                                 <Field
                                    name="apellido"
                                    id="apellido"
                                    className="border border-gray-300 rounded-md p-2 text-gray-900 focus:border-main focus:ring-main focus:ring-1 outline-none transition-all"
                                 />
                                 <ErrorMessage
                                    name="apellido"
                                    component="div"
                                    className="text-red-500 text-xs font-semibold"
                                 />
                              </div>

                              {/* Cédula */}
                              <div className="flex flex-col gap-1">
                                 <label
                                    htmlFor="cedula"
                                    className="text-sm font-semibold text-gray-700"
                                 >
                                    Cédula
                                 </label>
                                 <Field
                                    name="cedula"
                                    id="cedula"
                                    className="border border-gray-300 rounded-md p-2 text-gray-900 focus:border-main focus:ring-main focus:ring-1 outline-none transition-all"
                                 />
                                 <ErrorMessage
                                    name="cedula"
                                    component="div"
                                    className="text-red-500 text-xs font-semibold"
                                 />
                              </div>
                           </div>

                           <button
                              type="submit"
                              className="mt-6 w-full flex items-center justify-center gap-2 bg-main text-white font-semibold py-2 rounded-md hover:brightness-110 transition cursor-pointer"
                           >
                              <span className="relative w-5 h-5">
                                 <Image
                                    src="/icons/add.svg"
                                    alt="Guardar Cambios"
                                    fill
                                    sizes="10vw"
                                 />
                              </span>
                              Guardar Cambios
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

export default horarios;
