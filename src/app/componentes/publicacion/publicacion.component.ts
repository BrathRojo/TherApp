import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

interface Multimedia {
  tipo: 'imagen' | 'video';
  url: string;
}

interface Comentario {
  texto: string;
  likes: number;
  liked: boolean;
  usuario: {
    nombre: string;
    fotoPerfil: string;
  };
}

interface Publicacion {
  texto: string;
  multimedia: Multimedia[];
  likes: number;
  comentarios: Comentario[];
  mostrarInputComentario: boolean;
  nuevoComentario: string;
  liked: boolean;
}

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  publicaciones: Publicacion[] = [
    {
      texto: 'Esta es una publicación de texto.',
      multimedia: [],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      texto: 'Esta es una publicación con imagen y video.',
      multimedia: [
        { tipo: 'imagen', url: 'https://picsum.photos/200' },
        { tipo: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
      ],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      texto: 'Esta es una publicación con imagen.',
      multimedia: [
        { tipo: 'imagen', url: 'https://via.placeholder.com/150' },
      ],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      texto: 'Esta es una publicación con múltiples imágenes.',
      multimedia: [
        { tipo: 'imagen', url: 'https://picsum.photos/200' },
        { tipo: 'imagen', url: 'https://picsum.photos/id/237/200/300' }
      ],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    }
  ];

  selectedPublicacion: Publicacion | null = null;

  toggleLike(publicacion: Publicacion) {
    if (publicacion.liked) {
      publicacion.likes--;
    } else {
      publicacion.likes++;
    }
    publicacion.liked = !publicacion.liked;
  }

  openComentariosModal(publicacion: Publicacion) {
    this.selectedPublicacion = publicacion;
    const modal = new bootstrap.Modal(document.getElementById('comentariosModal')!);
    modal.show();
  }

  comentar() {
    if (this.selectedPublicacion && this.selectedPublicacion.nuevoComentario.trim()) {
      this.selectedPublicacion.comentarios.push({
        texto: this.selectedPublicacion.nuevoComentario,
        likes: 0,
        liked: false,
        usuario: {
          nombre: 'Usuario Ejemplo', // Puedes cambiar esto por el nombre del usuario actual
          fotoPerfil: 'https://via.placeholder.com/50' // Puedes cambiar esto por la URL de la foto de perfil del usuario actual
        }
      });
      this.selectedPublicacion.nuevoComentario = '';
    }
  }

  toggleLikeComentario(comentario: Comentario) {
    if (comentario.liked) {
      comentario.likes--;
    } else {
      comentario.likes++;
    }
    comentario.liked = !comentario.liked;
  }

  get nuevoComentario(): string {
    return this.selectedPublicacion?.nuevoComentario || '';
  }

  set nuevoComentario(value: string) {
    if (this.selectedPublicacion) {
      this.selectedPublicacion.nuevoComentario = value;
    }
  }
}
