import { Component, OnInit } from '@angular/core';
import { TerapeutaService } from '../../services/terapeuta.service';

@Component({
  selector: 'app-terapeutas',
  templateUrl: './terapeutas.component.html',
  styleUrls: ['./terapeutas.component.scss']
})
export class TerapeutasComponent implements OnInit {
  terapeutas: any[] = [];

  constructor(private terapeutaService: TerapeutaService) {}

  ngOnInit(): void {
    this.terapeutaService.getAllTerapeutas().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.terapeutas = data;
      },
      (error) => {
        console.error('Error al obtener terapeutas:', error);
      }
    );
  }
}
