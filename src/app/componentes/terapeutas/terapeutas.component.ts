import { Component } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-terapeutas',
  templateUrl: './terapeutas.component.html',
  styleUrl: './terapeutas.component.scss'
})
export class TerapeutasComponent {

  filtros: string[] = ['Especialidad', 'Ubicación', 'Valoración', 'Nº de reseñas', 'Más cercanos', 'Nombre', 'Precio'];

  misDatos: Card[] = [];

  actualizarDatos(nuevosDatos: Card[]) {
  this.misDatos = nuevosDatos;
}

}
