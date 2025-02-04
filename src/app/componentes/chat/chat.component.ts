import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  usuarioId!: number;
  receptorId!: number;
  mensajes: any[] = [];
  nuevoMensaje: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = Number(params['usuarioId']) || 0;
      this.receptorId = Number(params['receptorId']) || 0;

      if (this.usuarioId > 0 && this.receptorId > 0) {
        this.cargarMensajes();
      } else {
        console.error('Error: usuarioId o receptorId no son válidos.', this.usuarioId, this.receptorId);
      }
    });
  }

  cargarMensajes(): void {
    if (this.usuarioId > 0 && this.receptorId > 0) {
      this.chatService.obtenerMensajes(this.usuarioId, this.receptorId).subscribe({
        next: (data) => {
          console.log('Mensajes recibidos:', data); // 🔍 Log para verificar los mensajes
          if (Array.isArray(data)) {
            this.mensajes = [...data]; // ✅ Guardar todos los mensajes
          } else {
            console.error('La respuesta de la API no es un array:', data);
            this.mensajes = [];
          }
        },
        error: (error) => {
          console.error('Error al cargar los mensajes:', error);
          this.mensajes = [];
        }
      });
    }
  }

  enviarMensaje(): void {
    if (this.nuevoMensaje.trim() && this.usuarioId > 0 && this.receptorId > 0) {
      this.chatService.enviarMensaje(this.usuarioId, this.receptorId, this.nuevoMensaje).subscribe({
        next: (nuevoMensaje) => {
          console.log('Mensaje enviado correctamente:', nuevoMensaje);
          this.nuevoMensaje = '';
  
          // ✅ Agregamos el nuevo mensaje directamente en la lista
          this.mensajes.push(nuevoMensaje);
  
          // ✅ Recargar la lista de mensajes desde la API
          this.cargarMensajes();
        },
        error: (error) => {
          console.error('Error al enviar el mensaje:', error);
        }
      });
    } else {
      console.error('Error: No se puede enviar un mensaje vacío.');
    }
  }
  
}