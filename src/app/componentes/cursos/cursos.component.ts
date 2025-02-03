import { Component } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {

  filtros: string[] = ['Temática', 'Terapeuta', 'Valoración', 'Duración', 'Más nuevos', 'Nombre'];
}
