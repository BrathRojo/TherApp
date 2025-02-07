import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat',
  template: `
    <div *ngFor="let mensaje of mensajes">{{ mensaje }}</div>
    <input [(ngModel)]="nuevoMensaje" placeholder="Escribe tu mensaje..." />
    <button (click)="enviar()">Enviar</button>
  `
})
export class ChatComponent {
  nuevoMensaje: string = '';
  mensajes: string[] = [];

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.mensajes$.subscribe(mensajes => {
      this.mensajes = mensajes;
    });
  }

  enviar() {
    if (this.nuevoMensaje.trim()) {
      this.webSocketService.enviarMensaje(this.nuevoMensaje);
      this.nuevoMensaje = '';
    }
  }
}
