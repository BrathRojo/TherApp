export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellidos?: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date; // o Date
  presentacion?: string;
  biografia?: string;
  ubicacion?: string;
  fotoPerfil?: string; // Ruta a la foto en el backend
}