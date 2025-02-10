import { Usuario } from './usuario';

export interface Terapeuta extends Usuario {
    nColegiado: number;
    apellidos: string;
    experiencia: string;
    especialidad: string;
    idiomas: string;
    precio: number;
}
