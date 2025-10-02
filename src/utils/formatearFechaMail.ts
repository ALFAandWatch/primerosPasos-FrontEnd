export const formatearFechaCorta = (fecha: Date) => {
   const dia = fecha.getDate().toString().padStart(2, '0');
   const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Enero = 0
   const anio = fecha.getFullYear();
   return `${dia}/${mes}/${anio}`;
};
