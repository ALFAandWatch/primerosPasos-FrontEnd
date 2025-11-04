'use client';
import { borrarMovimiento } from '@/services/borrarMovimiento';
import { editarMovimiento } from '@/services/editarMovimiento';
import { listarMovimientosAdmin } from '@/services/listarMovimientosAdmin';
import { traerEmpresaPorId } from '@/services/traerEmpresaPorId';
import { movimientoEditType } from '@/types/editarMovimientoType';
import { empresaDevueltaType } from '@/types/empresaDevueltaType';
import { movimientoDevueltoType } from '@/types/movimientosDevueltosType';
import { exportarExcel } from '@/utils/exportarExcel';
import { formatearFechaCorta } from '@/utils/formatearFechaMail';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const verMovimientos = () => {
   const params = useParams();
   const { id } = params;

   const [usuario, setUsuario] = useState<empresaDevueltaType>();
   const [movimientos, setMovimientos] = useState<movimientoDevueltoType[]>([]);
   const [movimientoBorrado, setMovimientoBorrado] = useState(false);
   const [tipo, setTipo] = useState<'all' | 'compra' | 'venta'>('all');
   const [formaPago, setFormaPago] = useState<'all' | 'contado' | 'credito'>(
      'all'
   );
   const [verModalEditar, setVerModalEditar] = useState(false);
   const [movimientoAEditar, setMovimientoAEditar] =
      useState<movimientoDevueltoType | null>(null);
   const [movimientoEditado, setMovimientoEditado] = useState(false);

   const fetchedEmpresa = useRef(false);
   const fetchedMovimientos = useRef(false);

   useEffect(() => {
      const fetchUnaEmpresa = async () => {
         try {
            if (!id || fetchedEmpresa.current) return;
            fetchedEmpresa.current = true;
            const usuarioTraido = await traerEmpresaPorId(Number(id));
            setUsuario(usuarioTraido);
         } catch (error) {
            console.log(error);
         }
      };
      fetchUnaEmpresa();
   }, []);

   useEffect(() => {
      if (!id) return;

      const fetchMovimientos = async () => {
         if (
            fetchedMovimientos.current &&
            tipo === 'all' &&
            formaPago === 'all'
         )
            return;
         fetchedMovimientos.current = true;

         const res = await listarMovimientosAdmin(Number(id), {
            tipo: tipo === 'all' ? undefined : tipo,
            formaPago: formaPago === 'all' ? undefined : formaPago,
         });
         setMovimientos((prev) => [...prev, ...res.data.items]);
      };

      fetchMovimientos();
   }, [id, tipo, formaPago, movimientoBorrado, movimientoEditado]);

   const handleChangeTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedTipo = e.target.value as 'all' | 'compra' | 'venta';
      setTipo(selectedTipo);
      setMovimientos([]);
      fetchedMovimientos.current = false;
   };

   const handleChangeFormaPago = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedFormaPago = e.target.value as 'all' | 'contado' | 'credito';
      setFormaPago(selectedFormaPago);
      setMovimientos([]);
      fetchedMovimientos.current = false;
   };

   const handleBorrarMovimiento = async (id: number) => {
      try {
         Swal.fire({
            title: '¿Borrar Movimiento?',
            html: `
                        ¿Estas seguro que quieres borrar el movimiento?
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
                  await borrarMovimiento(id);
                  setMovimientoBorrado(true);
                  fetchedMovimientos.current = false;
                  setMovimientos([]);
                  setTimeout(() => {
                     setMovimientoBorrado(false);
                  }, 500);
                  Swal.fire({
                     title: 'Movimiento borrado!',
                     icon: 'success',
                  });
               } catch (error) {
                  Swal.fire({
                     title: 'No se pudo borrar el movimiento.',
                     icon: 'error',
                  });
               }
            }
         });
      } catch (error) {}
   };

   const handleEditar = async (values: movimientoEditType) => {
      try {
         const editado = await editarMovimiento(values.id, values);
         setMovimientoEditado(true);
         fetchedMovimientos.current = false;
         setMovimientos([]);
         setTimeout(() => {
            setMovimientoEditado(false);
         }, 500);
         setVerModalEditar(false);
         Swal.fire({
            title: 'Movimiento editado exitosamente.',
            icon: 'success',
         });
      } catch (error) {
         console.log('Error al editar movimiento', error);
         Swal.fire({
            title: 'Error al editar movimiento',
            icon: 'error',
         });
      }
   };

   // useEffect(() => {
   //    console.log('MOVIMIENTOS:', movimientos);
   // }, [movimientos]);

   // useEffect(() => {
   //    console.log('USUARIO: ', usuario);
   // }, [usuario]);

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-screen">
            <h2 className="text-2xl font-bold text-[#5c7cab] mb-6">
               Movimientos de {usuario?.nombreEmpresa}
            </h2>

            <div className="flex justify-start gap-4 mb-4">
               <div className="flex">
                  <p className="font-semibold max-w-fit text-center border border-white bg-main py-4 lg:p-2 lg:px-6 text-white font-(family-name:--font-montserrat) flex items-center justify-center">
                     Tipo
                  </p>
                  <select
                     onChange={handleChangeTipo}
                     className="w-[10rem] text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
                  >
                     <option value="all">Todos</option>
                     <option value="compra">Compras</option>
                     <option value="venta">Ventas</option>
                  </select>
               </div>
               <div className="flex">
                  <p className="font-semibold max-w-fit text-center border border-white bg-main py-4 lg:p-2 lg:px-6 text-white font-(family-name:--font-montserrat) flex items-center justify-center whitespace-nowrap">
                     Forma de Pago
                  </p>
                  <select
                     onChange={handleChangeFormaPago}
                     className="w-[10rem] text-black font-medium bg-[#FFF8DC] p-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 font-(family-name:--font-montserrat)"
                  >
                     <option value="all">Todos</option>
                     <option value="contado">Contado</option>
                     <option value="credito">Crédito</option>
                  </select>
               </div>
               <button
                  className="bg-[#5c7cab] hover:bg-[#4a6590] hover:cursor-pointer text-white px-4 py-2 rounded transition-colors duration-200 ml-auto"
                  onClick={() => exportarExcel(movimientos)}
               >
                  Exportar Excel
               </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
               <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-[#5c7cab]/20">
                     <tr>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Id
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Tipo
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Forma de Pago
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Código
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Precio
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Cantidad
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Fecha
                        </th>
                        <th className="py-3 px-4 text-left text-[#5c7cab] font-semibold uppercase">
                           Acciones
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {movimientos.length === 0 ? (
                        <tr>
                           <td
                              colSpan={4}
                              className="py-6 text-center text-[#5c7cab]/80 font-medium"
                           >
                              No hay movimientos registrados
                           </td>
                        </tr>
                     ) : (
                        movimientos.map((movimiento) => (
                           <tr
                              key={movimiento.id}
                              className="hover:bg-[#5c7cab]/10 transition-colors duration-200"
                           >
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 #{` ${movimiento.id}`}
                              </td>

                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {movimiento.tipo}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {movimiento.formaPago}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {movimiento.codigo}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {movimiento.precio}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {movimiento.cantidad}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800">
                                 {formatearFechaCorta(
                                    new Date(movimiento.fecha)
                                 )}
                              </td>
                              <td className="py-3 px-4 border-b border-gray-300 text-gray-800 flex gap-2">
                                 <button
                                    className="text-white rounded-lg bg-main flex items-center gap-1 p-2 px-3 hover:cursor-pointer hover:brightness-115"
                                    onClick={() => {
                                       setVerModalEditar(true);
                                       setMovimientoAEditar(movimiento);
                                    }}
                                 >
                                    <div className="relative h-7 aspect-square">
                                       <Image
                                          src="/icons/edit.svg"
                                          alt="Editar"
                                          fill
                                          sizes="10vw"
                                          className="invert"
                                       />
                                    </div>
                                    Editar
                                 </button>
                                 <button
                                    type="button"
                                    onClick={() =>
                                       handleBorrarMovimiento(movimiento.id)
                                    }
                                    className="text-white rounded-lg bg-red-500 flex items-center gap-1 p-2 px-3 hover:cursor-pointer hover:brightness-95"
                                 >
                                    <div className="relative h-7 aspect-square">
                                       <Image
                                          src="/icons/delete.svg"
                                          alt="Borrar"
                                          fill
                                          sizes="10vw"
                                       />
                                    </div>
                                    Eliminar
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            {verModalEditar && (
               <div
                  onClick={() => setVerModalEditar(false)}
                  className="fixed inset-0 bg-black/60 flex items-center justify-center"
               >
                  <div
                     onClick={(e) => e.stopPropagation()}
                     className="bg-white rounded-lg p-6 max-w-md mx-8"
                  >
                     <h2 className="text-xl lg:text-2xl mb-4 text-main font-bold text-center uppercase">
                        Nuevo empleado
                     </h2>
                     {verModalEditar && movimientoAEditar && (
                        <Formik
                           initialValues={{
                              id: movimientoAEditar!.id,
                              tipo: movimientoAEditar.tipo,
                              formaPago: movimientoAEditar.formaPago,
                              codigo: movimientoAEditar.codigo,
                              precio: movimientoAEditar.precio,
                              cantidad: movimientoAEditar.cantidad,
                              fecha: movimientoAEditar
                                 ? new Date(movimientoAEditar.fecha)
                                      .toISOString()
                                      .split('T')[0]
                                 : '',
                           }}
                           onSubmit={handleEditar}
                           enableReinitialize
                           // validate={validarEmpleado}
                        >
                           {({ errors }) => (
                              <Form className="font-(family-name:--font-montserrat)">
                                 <div className="flex flex-col gap-8 my-8">
                                    <div className="flex flex-col">
                                       <div className="flex gap-2">
                                          <label
                                             htmlFor="tipo"
                                             className="uppercase text-main font-bold lg:text-2xl"
                                          >
                                             Tipo:
                                          </label>
                                          <Field
                                             as="select"
                                             name="tipo"
                                             id="tipo"
                                             className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                          >
                                             <option value="venta">
                                                Venta
                                             </option>
                                             <option value="compra">
                                                Compra
                                             </option>
                                          </Field>
                                       </div>
                                       <ErrorMessage
                                          name="tipo"
                                          component="div"
                                          className="text-red-500 text-sm uppercase font-bold text-center"
                                       />
                                    </div>

                                    <div className="flex flex-col">
                                       <div className="flex gap-2">
                                          <label
                                             htmlFor="formaPago"
                                             className="uppercase text-main font-bold lg:text-2xl"
                                          >
                                             Tipo:
                                          </label>
                                          <Field
                                             as="select"
                                             name="formaPago"
                                             id="formaPago"
                                             className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                          >
                                             <option value="credito">
                                                Crédito
                                             </option>
                                             <option value="contado">
                                                Contado
                                             </option>
                                          </Field>
                                       </div>
                                       <ErrorMessage
                                          name="formaPago"
                                          component="div"
                                          className="text-red-500 text-sm uppercase font-bold text-center"
                                       />
                                    </div>

                                    <div className="flex flex-col">
                                       <div className="flex gap-2">
                                          <label
                                             htmlFor="codigo"
                                             className="uppercase text-main font-bold lg:text-2xl"
                                          >
                                             Código:
                                          </label>
                                          <Field
                                             name="codigo"
                                             id="codigo"
                                             className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                          />
                                       </div>
                                       <ErrorMessage
                                          name="codigo"
                                          component="div"
                                          className="text-red-500 text-sm uppercase font-bold text-center"
                                       />
                                    </div>

                                    <div className="flex flex-col">
                                       <div className="flex gap-2">
                                          <label
                                             htmlFor="precio"
                                             className="uppercase text-main font-bold lg:text-2xl"
                                          >
                                             Código:
                                          </label>
                                          <Field
                                             name="precio"
                                             id="precio"
                                             type="number"
                                             className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                          />
                                       </div>
                                       <ErrorMessage
                                          name="precio"
                                          component="div"
                                          className="text-red-500 text-sm uppercase font-bold text-center"
                                       />
                                    </div>

                                    <div className="flex flex-col">
                                       <div className="flex gap-2">
                                          <label
                                             htmlFor="cantidad"
                                             className="uppercase text-main font-bold lg:text-2xl"
                                          >
                                             Código:
                                          </label>
                                          <Field
                                             name="cantidad"
                                             id="cantidad"
                                             type="number"
                                             className="border-b-2 border-b-main grow text-black lg:p-2 lg:text-xl"
                                          />
                                       </div>
                                       <ErrorMessage
                                          name="cantidad"
                                          component="div"
                                          className="text-red-500 text-sm uppercase font-bold text-center"
                                       />
                                    </div>
                                 </div>
                                 <div className="flex">
                                    <button
                                       type="button"
                                       className="border border-gray-300 px-4 py-2 mt-5 rounded-md bg-gray-400 text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm lg:p-2 lg:text-xl"
                                    >
                                       Cancelar
                                    </button>
                                    <button
                                       type="submit"
                                       className="border border-gray-300 px-4 py-2 mt-5 rounded-md bg-main text-white hover:brightness-115 hover:cursor-pointer mx-auto block font-(family-name:--font-montserrat) font-semibold text-sm lg:p-2 lg:text-xl"
                                    >
                                       Guardar
                                    </button>
                                 </div>
                              </Form>
                           )}
                        </Formik>
                     )}
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default verMovimientos;
