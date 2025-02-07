import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card';
import { TerapeutaService } from '../../services/terapeuta.service';
import { Terapeuta } from '../../interfaces/terapeuta';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit{

  terapeutas:Terapeuta[] = [];

  cards:Card[] = [];

  constructor(private servicio: TerapeutaService){}
  ngOnInit():void{
    
    this.servicio.getAllTerapeutas().subscribe({
      next: (datos) => {
        this.terapeutas = [...datos]
      },
      error: (error) => {
        console.log('error', error);
        this.terapeutas = [];
      }
    });

    for (let index = 0; index < this.terapeutas.length; index++) {
        this.cards.push({foto:this.terapeutas[index].fotoPerfil, titulo:this.terapeutas[index].nombre, texto:this.terapeutas[index].biografica,precio:this.terapeutas[index].precio, enlace:"/"});
      
    }
  }

  // cards:Card[] = [
  //   {foto:"assets/terapeuta1.jpg", titulo:this.terapeutas[0].nombre, texto:"Psicólogo con más de 20 años de experiencia en clínicas especializadas en TCAs<br>Especialista en EMDR y mindfullness<br>Formación actualizada y constante ", precio:50, enlace:"/"}, 
  //   {foto:"assets/terapeuta2.jpg", titulo:"Nombre de persona 2", texto:"Datos de la persona 2", precio:200, enlace:"/"}, 
  //   {foto:"assets/terapeuta3.jpg", titulo:"Nombre de persona 3", texto:"Datos de la persona 3", precio:-1, enlace:"/"}];

  

  


    @Input() datos: Card[] = [];

}
