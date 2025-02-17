import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerapeutaService } from '../../services/terapeuta.service';
import { terapeutaMostrable } from '../../interfaces/terapeutaMostrable';

@Component({
  selector: 'app-zonaadmin',
  templateUrl: './zonaadmin.component.html',
  styleUrl: './zonaadmin.component.scss'
})
export class ZonaadminComponent implements OnInit{

  constructor(private servicio: TerapeutaService) { }

  @Input() terapeutas: Array<{ nombre: string, apellidos: string, premium: boolean }> = [];

  ngOnInit(): void {
      this.servicio.getTerapeutasParaMostrar().subscribe({
        next: (terapeutas) => {
          this.terapeutas = terapeutas.map(t => ({
            nombre: t.nombre,
            apellidos: t.apellidos,
            premium: t.premium
          }));
        },
        error: (err) => console.error('Error al obtener terapeutas:', err)
      });
  }

  accordionItems = [
    { id: 1, title: 'Accordion Item #1', content: 'Este es el contenido del primer ítem.' },
    { id: 2, title: 'Accordion Item #2', content: 'Este es el contenido del segundo ítem.' },
    { id: 3, title: 'Accordion Item #3', content: 'Este es el contenido del tercer ítem.' }
  ];
}
