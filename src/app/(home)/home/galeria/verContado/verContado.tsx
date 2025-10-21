'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Archivo {
   id: number;
   nombre: string;
   url: string;
   tipo: string;
   descripcion: string;
}

const verContado = () => {
   const [archivos, setArchivos] = useState<Archivo[]>([]);
   const [usuario, setUsuario] = useState<{ id: number } | null>(null);

   useEffect(() => {
      const stored = sessionStorage.getItem('usuario');
      if (stored) {
         setUsuario(JSON.parse(stored));
      }
   }, []);

   useEffect(() => {
      const fetchArchivos = async () => {
         if (!usuario || !usuario.id) {
            return;
         }
         const res = await axios.get(`/api/archivos?usuarioId=${usuario.id}`);
         setArchivos(res.data);
      };
      fetchArchivos();
   }, [usuario]);

   return (
      <div className="grid grid-cols-3 gap-4">
         {archivos.map((archivo) => (
            <div key={archivo.id} className="border p-2">
               <img
                  src={archivo.url}
                  alt={archivo.descripcion || archivo.nombre}
                  className="w-full h-auto"
                  onError={(e) => (e.currentTarget.src = '/placeholder.png')}
               />
               <p>{archivo.descripcion}</p>
            </div>
         ))}
      </div>
   );
};

export default verContado;
