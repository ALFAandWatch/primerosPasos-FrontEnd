export const formatearFecha = (fecha: Date) => {
   const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   };
   return fecha.toLocaleDateString('es-ES', opciones);
};
