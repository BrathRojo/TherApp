import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() datos: Card = {foto: "", titulo: "", texto:"", precio:0, enlace:""};
  apiUrl = environment.apiUrl;
}
