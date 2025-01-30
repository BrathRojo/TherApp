import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() datos: Card = {foto: "", titulo: "", texto:"", precio:0, enlace:""};

}
