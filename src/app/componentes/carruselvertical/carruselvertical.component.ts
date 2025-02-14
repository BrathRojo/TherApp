import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../interfaces/card';
import { TerapeutaService } from '../../services/terapeuta.service';
import { terapeutaMostrable } from '../../interfaces/terapeutaMostrable';

@Component({
  selector: 'app-carruselvertical',
  templateUrl: './carruselvertical.component.html',
  styleUrl: './carruselvertical.component.scss'
})
export class CarruselverticalComponent implements OnInit{

 terapeutas: terapeutaMostrable[] = [];
   cards: Card[] = [];
 
   @Input() datos: Card[] = [];
   @Output() datosActualizados = new EventEmitter<Card[]>(); // Notifica al padre
 
   constructor(private servicio: TerapeutaService) { }
 
   ngOnInit(): void {
     this.servicio.getTerapeutasParaMostrar().subscribe({
      next:(datos)=>{
        this.datos = datos
        .filter(t => !t.premium) // Filtramos los que tengan premium = true
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

   dividirEnGrupos(array: any[], tamanoGrupo: number): any[][] {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamanoGrupo) {
      grupos.push(array.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }
}
