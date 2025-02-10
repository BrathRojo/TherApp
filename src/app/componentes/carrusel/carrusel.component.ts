import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';
import { TerapeutaService } from '../../services/terapeuta.service';
import { Terapeuta } from '../../interfaces/terapeuta';
import { UsuarioService } from '../../services/usuario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit{

  terapeutas:Terapeuta[] = [];

  cards:Card[] = [];

  constructor(private servicio: TerapeutaService, private servicio2: UsuarioService){}
  ngOnInit():void{
    
    this.servicio.getAllTerapeutas().subscribe({
      next: (datos) => {
        this.terapeutas = [...datos];

        this.cards = this.terapeutas.map(t =>({
          foto: t.fotoPerfil,
          titulo: t.nombre,
          texto: t.especialidad,
          precio: t.precio,
          enlace: "/"
        }));

        console.log("Cards generadas:", this.cards);
      },
      error: (error) => {
        console.log('error', error);
        this.terapeutas = [];
      }
    });
  }

    @Input() datos: Card[] = [];

}
