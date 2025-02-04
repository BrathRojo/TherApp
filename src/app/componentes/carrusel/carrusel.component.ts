import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent {

  cards:Card[] = [
    {foto:"assets/terapeuta1.jpg", titulo:"Manolo Pérez", texto:"Psicólogo con más de 20 años de experiencia en clínicas especializadas en TCAs<br>Especialista en EMDR y mindfullness<br>Formación actualizada y constante ", precio:50, enlace:"/"}, 
    {foto:"assets/terapeuta2.jpg", titulo:"Nombre de persona 2", texto:"Datos de la persona 2", precio:200, enlace:"/"}, 
    {foto:"assets/terapeuta3.jpg", titulo:"Nombre de persona 3", texto:"Datos de la persona 3", precio:-1, enlace:"/"}];

    @Input() datos: Card[] = [];

}
