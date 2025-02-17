import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Publicacion } from '../../interfaces/publicacion';
import { Comentario } from '../../interfaces/comentario';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  @Input() publicacion!: Publicacion;
  publicaciones: Publicacion[] = [
    {
      titulo: 'Esta es una publicación de texto.',
      multimedia: [],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      titulo: 'Esta es una publicación con imagen y video.',
      multimedia: [
        { tipo: 'imagen', url: 'https://picsum.photos/200', titulo:'' },
        { tipo: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', titulo:'' }
      ],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      titulo: 'Esta es una publicación con imagen.',
      multimedia: [
        { tipo: 'imagen', url: 'https://via.placeholder.com/150', titulo:'' },
      ],
      likes: 0,
      comentarios: [],
      mostrarInputComentario: false,
      nuevoComentario: '',
      liked: false
    },
    {
      titulo: 'Esta es una publicación con múltiples imágenes.',
      multimedia: [
        { tipo: 'imagen', url: 'https://picsum.photos/200', titulo:'' },
        { tipo: 'imagen', url: 'https://picsum.photos/id/237/200/300', titulo:'' }
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
        mostrarCompleto: false, // 👈 Se agrega aquí
        usuario: {
          nombre: 'Usuario Ejemplo', // Cambiar por el usuario actual
          fotoPerfil: 'https://via.placeholder.com/50' // Cambiar por la foto del usuario
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

  toggleOpciones(index: number) {
    const opciones = document.getElementById(`opciones-${index}`);
  
    if (opciones) {
      opciones.style.display = opciones.style.display === 'block' ? 'none' : 'block';
    }
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