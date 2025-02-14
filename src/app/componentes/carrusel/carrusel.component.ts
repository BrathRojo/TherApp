import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../interfaces/card';
import { TerapeutaService } from '../../services/terapeuta.service';
import { terapeutaMostrable } from '../../interfaces/terapeutaMostrable';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit {

  terapeutas: terapeutaMostrable[] = [];
  cards: Card[] = [];

  @Input() datos: Card[] = [];
  @Output() datosActualizados = new EventEmitter<Card[]>(); // Notifica al padre

  constructor(private servicio: TerapeutaService) { }

  ngOnInit(): void {
    this.servicio.getTerapeutasParaMostrar().subscribe({
      next:(datos)=>{
        this.datos = datos
        .filter(t => t.premium) // Filtramos los que tengan premium = true
        .map(t => ({
          titulo: `${t.nombre} ${t.apellidos}`,
          foto: t.foto,
          texto: `Especialidad: ${t.especialidad} - Experiencia: ${t.experiencia}`,
          precio: t.precio,
          enlace: "/"
        }));

        this.datosActualizados.emit(this.datos);
      }
        })
  }
    }
 