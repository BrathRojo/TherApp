export interface Comentario {
  texto: string;
  likes: number;
  liked: boolean;
  mostrarCompleto?: boolean;
  usuario: {
    nombre: string;
    fotoPerfil: string;
  };
}