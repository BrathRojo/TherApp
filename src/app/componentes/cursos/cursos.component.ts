import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { VideoService } from '../../services/video.service';
import { Multimedia } from '../../interfaces/multimedia';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {

  publicaciones: Publicacion = {texto:"", multimedia:[], likes:0, comentarios:[], mostrarInputComentario: false, nuevoComentario: "", liked:false};

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    // this.videoService.mostrarVideos().subscribe({
    //   next: (videos: Multimedia[]) => {
    //     // Transformamos cada objeto Multimedia en una Publicacion
    //     this.publicaciones = videos.map(video => ({
    //       texto: video.titulo, // Puedes personalizar este texto
    //       multimedia: [video], // Se incluye el video o imagen
    //       likes: 0,
    //       comentarios: [],
    //       mostrarInputComentario: false,
    //       nuevoComentario: '',
    //       liked: false
    //     }));
    //   },
    //   error: (err) => {
    //     console.error("Error cargando videos", err);
    //   }
    // });
  }


  filtros: string[] = ['Temática', 'Terapeuta', 'Valoración', 'Duración', 'Más nuevos', 'Nombre'];
}
