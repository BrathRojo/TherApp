import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { VideoService } from '../../services/video.service';
import { Multimedia } from '../../interfaces/multimedia';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{
  
  videos: Multimedia[] = [];

  publicaciones: Publicacion[] = [];

  constructor(private servicio: VideoService) { }

  ngOnInit(): void {
    // this.servicio.mostrarVideos().subscribe({
    //   next:(videos)=>{
    //     this.publicaciones = videos.map(v=>({
    //       titulo:v.titulo,
    //       multimedia:[v],
    //       likes:0,
    //       comentarios:[],
    //       mostrarInputComentario: false,
    //       nuevoComentario: '',
    //       liked: false
    //     }));
    //   },error: (err) => {
    //     console.error("Error cargando videos", err);
    //   }
    // })
  }

  filtros: string[] = ['Temática', 'Terapeuta', 'Valoración', 'Duración', 'Más nuevos', 'Nombre'];
}
