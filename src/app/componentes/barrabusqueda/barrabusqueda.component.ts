import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barrabusqueda',
  templateUrl: './barrabusqueda.component.html',
  styleUrl: './barrabusqueda.component.scss'
})
export class BarrabusquedaComponent {

  @Input() datos: string[] = [];

}
