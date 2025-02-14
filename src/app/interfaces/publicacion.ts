import { Comentario } from "./comentario";
import { Multimedia } from "./multimedia";

export interface Publicacion {
  titulo: string;
  multimedia: Multimedia[];
  likes: number;
  comentarios: Comentario[];
  mostrarInputComentario: boolean;
  nuevoComentario: string;
  liked: boolean;
}