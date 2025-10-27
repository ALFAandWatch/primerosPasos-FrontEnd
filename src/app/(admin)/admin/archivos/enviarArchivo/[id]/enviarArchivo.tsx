'use client';

import VerUploadsAdmin from '@/components/VerUploadsAdmin/VerUploadsAdmin';
import { subirImagen } from '@/services/subirImagen';
import { traerEmpresaPorId } from '@/services/traerEmpresaPorId';
import { empresaDevueltaType } from '@/types/empresaDevueltaType';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const enviarArchivo = () => {
   const params = useParams();
   const { id } = params;

   const [usuario, setUsuario] = useState<empresaDevueltaType>();
   const [archivo, setArchivo] = useState<File | null>(null);
   const [descripcion, setDescripcion] = useState('');
   const [tipo, setTipo] = useState('');
   const [imagenSubida, setImagenSubida] = useState(false);
   const [tipoSeleccionado, setTipoSeleccionado] = useState<string | undefined>(
      undefined
   );

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

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         console.log('Archivo seleccionado:', e.target.files[0]);
         setArchivo(e.target.files[0]);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!archivo) {
         return;
      }

      if (!usuario || !usuario.id) {
         return;
      }

      if (!tipo) {
         return;
      }

      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('descripcion', descripcion);
      formData.append('tipo', tipo);
      formData.append('remitenteId', '2');
      formData.append('destinatarioId', String(usuario.id));

      try {
         const res = await subirImagen(formData);

         Swal.fire('Éxito', 'El archivo se subió con éxito.', 'success');
         setArchivo(null);
         setDescripcion('');
         setImagenSubida(true);
         setTimeout(() => setImagenSubida(false), 500);
      } catch (error: any) {
         console.error(error);
         Swal.fire('Error', 'No se pudo subir el archivo.', 'error');
      }
   };

   return (
      <>
         <div className="p-6 bg-[#d6dfe7] min-h-[100vh] flex flex-col">
            <h1 className="uppercase text-main font-bold text-2xl">
               Enviar Archivo a {usuario?.nombreEmpresa}
            </h1>
            <div className="flex flex-col gap-4 mt-10">
               {/* FORMULARIO */}
               <div className="p-6 w-full lg:w-1/3 max-h-fit bg-white rounded-xl shadow-md space-y-4">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <label
                        htmlFor="fileUpload"
                        className="bg-[#5c7cab] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#4f6c96] transition-colors"
                     >
                        Elegir imagen
                     </label>
                     <input
                        id="fileUpload"
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="border border-gray-400 text-gray-400 rounded-md p-2 hidden"
                     />
                     {archivo && (
                        <p className="text-gray-500 mt-2">
                           Archivo seleccionado: {archivo.name}
                        </p>
                     )}

                     <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="border border-gray-400 text-black rounded-md p-2 w-full"
                        required
                     >
                        <option value="" disabled>
                           Selecciona el tipo de archivo
                        </option>
                        <option value="pagos">Pagos</option>
                        <option value="sueldos">Sueldos</option>
                        <option value="stock">Stock</option>
                        <option value="balances">Balances</option>
                     </select>

                     <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border border-gray-400 text-black rounded-md p-2 w-full h-24 resize-none"
                     />

                     <button
                        type="submit"
                        disabled={!archivo || !usuario || !tipo}
                        className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Subir
                     </button>
                  </form>
               </div>
               {/* TABLA */}
               <p className="text-xl text-[#5c7cab] mt-6">
                  Aquí puedes ver los archivos que has enviado a este usuario
                  como parte de su gestión o seguimiento.
               </p>
               <div
                  className="p-6 w-full border-2 border-main rounded-xl shadow-md mb-15 lg:mb-0"
                  style={{ borderStyle: 'groove' }}
               >
                  <VerUploadsAdmin
                     tipo={tipoSeleccionado}
                     destinatarioId={Number(id)}
                     imagenSubida={imagenSubida}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default enviarArchivo;
