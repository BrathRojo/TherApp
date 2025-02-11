import { RouterLink } from "@angular/router";

export interface Usuario {
  id: number;
  nombreUsuario: string;
  nombre: string;
  apellidos?: string;
  email: string;
  telefono?: string;
  fechaNacimiento?: string; // o Date
  presentacion?: string;
  ubicacion?: string;
  fotoPerfil?: string; // Ruta a la foto en el backend
}