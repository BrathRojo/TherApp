import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  @Input() publicaciones: Publicacion[] = [];

  id: number = 0;

  constructor(private publicacionService: PublicacionService){}

  ngOnInit(){
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones(){
    const storedId = localStorage.getItem('usuarioId');
    this.id=Number(storedId);
    console.log(this.id);
    this.publicacionService.obtenerPublicacionesdeSeguidos(this.id).subscribe({
      
      next:(publicaciones)=>{
        this.publicaciones = publicaciones.map(p=>({
          texto: p.texto,
          multimedia: [],
          // multimedia: p.tipo && p.url ? [{ tipo: p.tipo, url: p.url }] : [],
          likes: 0,
          comentarios: [],
          mostrarInputComentario: false,
          nuevoComentario:'',
          liked:false,
          nombre: p.nombre,
          foto: p.foto || 'default.png'
        }));
        console.log(this.id);
      }
    })
  }
}
