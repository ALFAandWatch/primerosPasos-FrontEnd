'use client';
import { nuevosMovimientos } from '@/services/nuevoMovimiento';
import { movimientoType } from '@/types/movimientoType';
import { validateMovimientos } from '@/utils/validateNuevosMovimientos';
import {
   ErrorMessage,
   Field,
   FieldArray,
   Form,
   Formik,
   FormikErrors,
} from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

type FormValues = {
   movimientos: movimientoType[];
};

const comprasContado = () => {
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);

   const today = new Date();

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   if (!usuario) {
      return <p>Cargando empresa...</p>;
   }

   const initialValues: FormValues = {
      movimientos: [
         {
            tipo: 'compra' as const,
            formaPago: 'contado' as const,
            codigo: '',
            precio: 0,
            cantidad: 0,
            fecha: today,
            usuarioId: usuario.id,
         },
      ],
   };

   const handleSubmit = async (movimientos: movimientoType[]) => {
      try {
         const movimientosconEmpresa = movimientos.map((mov) => ({
            ...mov,
            empresaId: usuario.id,
         }));

         await nuevosMovimientos(movimientosconEmpresa);
         Swal.fire('Éxito', 'Movimientos guardados correctamente', 'success');
      } catch (error: any) {
         Swal.fire(
            'Error',
            error.message || 'No se pudieron guardar los movimientos',
            'error'
         );
      }
   };

   return (
      <>
         <div className="lg:ml-2 bg-fondo p-6 h-full lg:pr-56 pb-30">
            <h1 className="text-main font-(family-name:--font-montserrat) font-semibold text-2xl pb-6">
               Registro de Compras Contado
            </h1>
            <h2 className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
               Complete los datos de cada compra contado en la tabla.
            </h2>
            <ul className="list-disc list-inside mb-4 font-(family-name:--font-open-sans) text-main pb-6">
               <li>Use el botón “Agregar” para sumar nuevos registros.</li>
               <li>Puede editar cualquier campo antes de enviar.</li>
               <li>
                  Cuando finalice, presione “Enviar” para almacenar la
                  información.
               </li>
               <li>
                  Al momento de enviar no deben haber filas vacias. Si agregó
                  filas que luego no completó, debe eliminarlas.
               </li>
            </ul>
            <Formik<FormValues>
               initialValues={initialValues}
               validate={validateMovimientos}
               onSubmit={(values, { resetForm }) => {
                  handleSubmit(values.movimientos);
                  resetForm();
               }}
            >
               {({ values, errors, touched }) => (
                  <Form className="font-(family-name:--font-open-sans)">
                     <table className="table-auto w-full border-collapse">
                        <caption className="text-left text-main font-(family-name:--font-montserrat) font-semibold text-base pb-2 lg:pb-4">
                           Detalle de compras contado ingresadas:
                        </caption>
                        <thead className="font-(family-name:--font-montserrat) font-semibold text-sm hidden lg:table-header-group">
                           <tr className="flex flex-col lg:table-row">
                              <th className="text-center border border-white bg-main w-46 py-2">
                                 Código
                              </th>
                              <th className="text-center border border-white bg-main w-46 py-2">
                                 Precio
                              </th>
                              <th className="text-center border border-white bg-main w-46 py-2">
                                 Cantidad
                              </th>
                              <th className="text-center border border-white bg-main w-46 py-2">
                                 Fecha
                              </th>
                           </tr>
                        </thead>
                        <FieldArray name="movimientos">
                           {({ push, remove }) => (
                              <tbody>
                                 {values.movimientos.map((mov, index) => (
                                    <tr
                                       key={index}
                                       // odd:bg-gray-100 even:bg-blue-100/60 odd:brightness-95 even:brightness-95
                                       className="flex flex-col lg:table-row text-sm text-[#2E2E2E] bg-[#FFF8DC] even:bg-[#FFF0B3] hover:bg-[#FFE699] mb-10 lg:mb-0 p-0"
                                    >
                                       <td className="border-2 border-yellow-600/30 flex lg:table-cell relative p-0">
                                          <span className="font-semibold lg:hidden grow text-center border border-white bg-main py-4 text-white font-(family-name:--font-montserrat)">
                                             Código:
                                          </span>
                                          <Field
                                             name={`movimientos.${index}.codigo`}
                                             type="text"
                                             placeholder="Código"
                                             className={`text-black p-4 text-left font-medium w-46 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.codigo &&
                                                touched.movimientos?.[index]
                                                   ?.codigo
                                                   ? 'border-2 border-red-400 bg-red-400/10'
                                                   : ''
                                             }`}
                                          />
                                       </td>
                                       <td className="border-2 border-yellow-600/30 flex lg:table-cell">
                                          <span className="font-semibold lg:hidden grow text-center border border-white bg-main py-4 text-white font-(family-name:--font-montserrat)">
                                             Precio:
                                          </span>
                                          <Field
                                             name={`movimientos.${index}.precio`}
                                             type="number"
                                             placeholder="Precio"
                                             className={`text-black p-4 text-right font-medium w-46 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.precio &&
                                                touched.movimientos?.[index]
                                                   ?.precio
                                                   ? 'border-2 border-red-400 bg-red-400/10'
                                                   : ''
                                             }`}
                                          />
                                       </td>
                                       <td className="border-2 border-yellow-600/30 flex lg:table-cell">
                                          <span className="font-semibold lg:hidden grow text-center border border-white bg-main py-4 text-white font-(family-name:--font-montserrat)">
                                             Cantidad:
                                          </span>
                                          <Field
                                             name={`movimientos.${index}.cantidad`}
                                             type="number"
                                             placeholder="Cantidad"
                                             className={`text-black p-4 text-right font-medium w-46 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.cantidad &&
                                                touched.movimientos?.[index]
                                                   ?.cantidad
                                                   ? 'border-2 border-red-400 bg-red-400/10'
                                                   : ''
                                             }`}
                                          />
                                       </td>
                                       <td className="border-2 border-yellow-600/30 flex lg:table-cell">
                                          <span className="font-semibold lg:hidden grow text-center border border-white bg-main py-4 text-white font-(family-name:--font-montserrat)">
                                             Fecha:
                                          </span>
                                          <Field
                                             name={`movimientos.${index}.fecha`}
                                          >
                                             {({ field, form }: any) => (
                                                <DatePicker
                                                   {...field}
                                                   selected={
                                                      field.value
                                                         ? new Date(field.value)
                                                         : null
                                                   }
                                                   onChange={(
                                                      date: Date | null
                                                   ) =>
                                                      form.setFieldValue(
                                                         `movimientos.${index}.fecha`,
                                                         date
                                                      )
                                                   }
                                                   dateFormat="dd/MM/yyyy"
                                                   maxDate={today}
                                                   className={`text-black p-4 w-46 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center ${
                                                      (
                                                         errors.movimientos?.[
                                                            index
                                                         ] as FormikErrors<movimientoType>
                                                      )?.fecha &&
                                                      touched.movimientos?.[
                                                         index
                                                      ]?.fecha
                                                         ? 'border-2 border-red-400 bg-red-400/10'
                                                         : ''
                                                   }`}
                                                />
                                             )}
                                          </Field>
                                       </td>
                                       <td className="border-2 border-yellow-600/30 flex lg:table-cell justify-end">
                                          <button
                                             type="button"
                                             aria-label="Eliminar fila"
                                             onClick={() => remove(index)}
                                             className="border border-gray-300 px-4 py-2 ml-4 m-1 mr-8 lg:mr-1 rounded-md bg-blue-400 text-white hover:brightness-115 hover:cursor-pointer font-(family-name:--font-montserrat) font-semibold text-xs"
                                          >
                                             <div className="relative w-5 h-5 inline-block mr-1 mb-1 align-middle">
                                                <Image
                                                   src="/icons/delete.svg"
                                                   alt="Eliminar"
                                                   fill
                                                   sizes="10vw"
                                                />
                                             </div>
                                             Eliminar
                                          </button>
                                       </td>
                                       <td className="bg-red-100">
                                          <ErrorMessage
                                             name={`movimientos.${index}.codigo`}
                                             component="div"
                                             className="text-red-500 text-sm mt-1 lg:hidden p-2"
                                          />
                                          <ErrorMessage
                                             name={`movimientos.${index}.precio`}
                                             component="div"
                                             className="text-red-500 text-sm mt-1 lg:hidden p-2"
                                          />
                                          <ErrorMessage
                                             name={`movimientos.${index}.cantidad`}
                                             component="div"
                                             className="text-red-500 text-sm mt-1 lg:hidden p-2"
                                          />
                                          <ErrorMessage
                                             name={`movimientos.${index}.fecha`}
                                             component="div"
                                             className="text-red-500 text-sm mt-1 lg:hidden p-2"
                                          />
                                       </td>
                                    </tr>
                                 ))}

                                 <tr className="hidden lg:table-row">
                                    <td
                                       className={`text-center text-xs ${
                                          values.movimientos.some(
                                             (_, index) =>
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.codigo &&
                                                touched.movimientos?.[index]
                                                   ?.codigo
                                          )
                                             ? 'bg-red-100 text-red-500 py-2'
                                             : ''
                                       }`}
                                    >
                                       {values.movimientos.some(
                                          (_, index) =>
                                             (
                                                errors.movimientos?.[
                                                   index
                                                ] as FormikErrors<movimientoType>
                                             )?.codigo &&
                                             touched.movimientos?.[index]
                                                ?.codigo
                                       ) && 'Código requerido'}
                                    </td>
                                    <td
                                       className={`text-center text-xs ${
                                          values.movimientos.some(
                                             (_, index) =>
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.precio &&
                                                touched.movimientos?.[index]
                                                   ?.precio
                                          )
                                             ? 'bg-red-100 text-red-500 py-2'
                                             : ''
                                       }`}
                                    >
                                       {values.movimientos.some(
                                          (_, index) =>
                                             (
                                                errors.movimientos?.[
                                                   index
                                                ] as FormikErrors<movimientoType>
                                             )?.precio &&
                                             touched.movimientos?.[index]
                                                ?.precio
                                       ) && 'Precio debe ser mayor que 0'}
                                    </td>
                                    <td
                                       className={`text-center text-xs ${
                                          values.movimientos.some(
                                             (_, index) =>
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.cantidad &&
                                                touched.movimientos?.[index]
                                                   ?.cantidad
                                          )
                                             ? 'bg-red-100 text-red-500 py-2'
                                             : ''
                                       }`}
                                    >
                                       {values.movimientos.some(
                                          (_, index) =>
                                             (
                                                errors.movimientos?.[
                                                   index
                                                ] as FormikErrors<movimientoType>
                                             )?.cantidad &&
                                             touched.movimientos?.[index]
                                                ?.cantidad
                                       ) && 'Cantidad debe ser mayor que 0'}
                                    </td>
                                    <td
                                       className={`text-center text-xs ${
                                          values.movimientos.some(
                                             (_, index) =>
                                                (
                                                   errors.movimientos?.[
                                                      index
                                                   ] as FormikErrors<movimientoType>
                                                )?.fecha &&
                                                touched.movimientos?.[index]
                                                   ?.fecha
                                          )
                                             ? 'bg-red-100 text-red-500 py-2'
                                             : ''
                                       }`}
                                    >
                                       {values.movimientos.some(
                                          (_, index) =>
                                             (
                                                errors.movimientos?.[
                                                   index
                                                ] as FormikErrors<movimientoType>
                                             )?.fecha &&
                                             touched.movimientos?.[index]?.fecha
                                       ) && 'La fecha no puede ser futura'}
                                    </td>
                                    <td></td>
                                 </tr>
                                 <tr>
                                    <td>
                                       <button
                                          type="button"
                                          aria-label="Agregar fila"
                                          onClick={() =>
                                             push({
                                                tipo: 'compra',
                                                formaPago: 'contado',
                                                codigo: '',
                                                precio: 0,
                                                cantidad: 0,
                                                fecha: today,
                                             })
                                          }
                                          className="border border-gray-300 px-4 py-2 my-5 rounded-md bg-blue-500/80 text-white hover:brightness-115 hover:cursor-pointer font-(family-name:--font-montserrat) font-semibold text-sm"
                                       >
                                          <div className="relative w-5 h-5 inline-block mr-1 mb-1 align-middle">
                                             <Image
                                                src="/icons/add.svg"
                                                alt="Agregar"
                                                fill
                                                sizes="10vw"
                                             />
                                          </div>
                                          Agregar
                                       </button>
                                    </td>
                                 </tr>
                              </tbody>
                           )}
                        </FieldArray>
                     </table>
                     <hr className="border-1" />
                     <button
                        type="submit"
                        aria-label="Enviar datos"
                        className="border border-gray-300 px-4 py-2 mt-5 rounded-md bg-blue-600/80 text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm"
                     >
                        <div className="relative w-5 h-5 inline-block mr-1 mb-1 align-middle">
                           <Image
                              src="/icons/send.svg"
                              alt="Enviar"
                              fill
                              sizes="10vw"
                           />
                        </div>
                        Enviar
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </>
   );
};

export default comprasContado;
