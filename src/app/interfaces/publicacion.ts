import { Comentario } from "./comentario";
import { Multimedia } from "./multimedia";

export interface Publicacion {
  texto: string;
  multimedia: Multimedia[];
  likes: number;
  comentarios: Comentario[];
  mostrarInputComentario: boolean;
  nuevoComentario: string;
  liked: boolean;
  nombre?: string;
  foto?: string;
}