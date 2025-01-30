import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-verticalcard',
  templateUrl: './verticalcard.component.html',
  styleUrl: './verticalcard.component.scss'
})
export class VerticalcardComponent {

  @Input() datos: Card = {foto: "", titulo: "", texto:"", precio:0, enlace:""};

}
