import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.scss']
})
export class ConversacionesComponent implements OnInit {

  constructor(private routes: ActivatedRoute) {}

  conversaciones = [
    { id: 1, nombre: 'didier' },
    { id: 2, nombre: 'miguel' },
    { id: 3, nombre: 'lorensou' },
    // Agrega más conversaciones según sea necesario
  ];

  userId: number = 0;
  conversacionId: number = this.conversaciones[0].id;

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.userId = params['usuarioId'] || 0;
    });
  }

  seleccionarConversacion(conversacion: any): void {
    this.conversacionId = conversacion.id;
    console.log('Conversación seleccionada:', this.userId, this.conversacionId);
  }
}