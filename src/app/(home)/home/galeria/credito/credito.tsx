'use client';
import VerUploads from '@/components/VerUploads/VerUploads';
import { subirImagen } from '@/services/subirImagen';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const tipo = 'credito';

const credito = () => {
   const [archivo, setArchivo] = useState<File | null>(null);
   const [descripcion, setDescripcion] = useState('');
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);
   const [imagenSubida, setImagenSubida] = useState(false);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
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

      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('descripcion', descripcion);
      formData.append('tipo', tipo);
      formData.append('remitenteId', String(usuario.id));
      formData.append('destinatarioId', '2');

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
            <div className="max-w-2xl mb-10">
               <h1 className="text-main font-(family-name:--font-montserrat) font-semibold text-2xl pb-6">
                  Subida de comprobantes crédito
               </h1>
               <p className="text-main font-(family-name:--font-montserrat) font-medium text-lg">
                  En esta sección podés subir imágenes o archivos PDF
                  relacionados con tus operaciones de crédito. Recordá incluir
                  una breve descripción para identificar el archivo más
                  fácilmente.
               </p>
            </div>
            <div className="flex flex-col gap-4">
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

                     <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border border-gray-400 text-black rounded-md p-2 w-full h-24 resize-none"
                     />

                     <button
                        type="submit"
                        disabled={!archivo || !usuario}
                        className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        Subir
                     </button>
                  </form>
               </div>
               {/* VER IMAGENES */}
               <div
                  className="p-6 w-full border-2 border-main rounded-xl shadow-md mb-15 lg:mb-0"
                  style={{ borderStyle: 'groove' }}
               >
                  <VerUploads tipo={tipo} imagenSubida={imagenSubida} />
               </div>
            </div>
         </div>
      </>
   );
};

export default credito;
