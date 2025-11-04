import * as XLSX from 'xlsx';

export const exportarExcel = (data: any[]) => {
   try {
      // Crear hoja de cálculo desde los datos
      const ws = XLSX.utils.json_to_sheet(data);

      // Crear libro + agregar hoja
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Movimientos');

      // Crear archivo y disparar descarga
      XLSX.writeFile(wb, 'movimientos.xlsx');
   } catch (error) {
      console.error('Error al exportar Excel', error);
   }
};
