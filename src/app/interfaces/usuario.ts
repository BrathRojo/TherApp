import { RouterLink } from "@angular/router";

export interface Usuario {
    id: number;
    nombre: string;
    nombreUsuario: string;
    email: string;
    clave: string;
    fotoPerfil: string;
    rol: string;
    dni: string;
    fechaNacimiento: Date;
    telefono: string;
    ubicacion: string;
    biografica: string;
  }