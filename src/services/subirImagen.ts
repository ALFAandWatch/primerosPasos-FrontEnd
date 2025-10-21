import axiosInstance from '@/api/axiosInstance';

export const subirImagen = async (imagenData: FormData) => {
   try {
      for (let [key, value] of imagenData.entries()) {
         console.log(key, value);
      }
      const response = await axiosInstance.post(
         'archivos/subirImagen',
         imagenData,
         {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         }
      );
      return response.data;
   } catch (error: any) {
      if (error.response) {
         const status = error.response.status;
         if (status === 500) {
            throw new Error('Error en el servidor. Inténtalo más tarde.');
         }
      }
      throw new Error('Error de red. Intenta más tarde.');
   }
};
