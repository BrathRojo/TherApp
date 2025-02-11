import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../interfaces/card';
import { TerapeutaService } from '../../services/terapeuta.service';
import { Terapeuta } from '../../interfaces/terapeuta';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit {

  terapeutas: Terapeuta[] = [];
  cards: Card[] = [];

  @Input() datos: Card[] = [];
  @Output() datosActualizados = new EventEmitter<Card[]>(); // Notifica al padre

  constructor(private servicio: TerapeutaService, private servicio2: UsuarioService) { }

  ngOnInit(): void {
    this.servicio.getAllTerapeutas().subscribe({
      next: (terapeutas) => {
        if (!terapeutas || terapeutas.length === 0) {
          console.error("No se encontraron terapeutas.");
          return;
        }

        const usuarioRequests = terapeutas.map((terapeuta: Terapeuta) =>
          this.servicio2.getUsuarioById(terapeuta.id).pipe(
            catchError(error => {
              console.error(`Error al obtener usuario con ID ${terapeuta.id}:`, error);
              return of(null); // Devuelve `null` en lugar de romper el flujo
            })
          )
        );

        forkJoin(usuarioRequests).subscribe({
          next: (usuarios: (Usuario | null)[]) => {
            // Filtrar los usuarios que no sean nulos
            const usuariosFiltrados = usuarios.map(u => u ?? {} as Usuario); 
        
            this.terapeutas = terapeutas.map((terapeuta, index) => ({
              ...terapeuta,
              ...usuariosFiltrados[index]  // Ahora garantizamos que siempre haya un objeto
            }));
        
            this.cards = this.terapeutas.map((t) => ({
              foto: t.fotoPerfil ?? "assets/default-profile.png", // Si la foto es nula, ponemos una por defecto
              titulo: `${t.nombre ?? 'Desconocido'} ${t.apellidos ?? ''}`,
              texto: `${t.especialidad ?? 'Sin especialidad'} - ${t.experiencia ?? 'Sin experiencia'}`,
              precio: t.precio ?? 0, // Evitar errores si el precio es undefined
              enlace: "/"
            }));
        
            this.datosActualizados.emit(this.cards);
            console.log("Datos en carrusel:", this.cards);
          },
          error: (error) => {
            console.error("Error al obtener usuarios:", error);
          }
        });
      },
      error: (error) => {
        console.error("Error al obtener terapeutas:", error);
        this.terapeutas = [];
      }
    });
  }
}