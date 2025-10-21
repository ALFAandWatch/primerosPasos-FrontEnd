import axiosInstance from '@/api/axiosInstance';

export const descargarArchivo = async (id: number, nombreArchivo: string) => {
   try {
      const res = await axiosInstance.get(`archivos/descargarArchivo/${id}`, {
         responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo); // nombre real que quieras
      document.body.appendChild(link);
      link.click();
      link.remove();

      return res.data;
   } catch (error: any) {
      console.error('Error al eliminar archivo:', error);
      throw error;
   }
};
