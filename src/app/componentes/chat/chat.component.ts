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
  archivoSeleccionado?: File;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = Number(params['usuarioId']) || 0;
      this.receptorId = Number(params['receptorId']) || 0;
  
      if (this.usuarioId > 0 && this.receptorId > 0) {
        this.cargarMensajes();
        this.suscribirseAlChat(); // ✅ Escuchar mensajes en tiempo real
      } else {
        console.error('Error: usuarioId o receptorId no son válidos.');
      }
    });
  }
  
  // ✅ Escuchar mensajes en tiempo real
  suscribirseAlChat(): void {
    this.chatService.subscribeToChat(this.usuarioId, (mensaje) => {
      console.log('📩 Mensaje recibido en tiempo real:', mensaje);
      this.mensajes.push(mensaje);
    });
  }
  

  cargarMensajes(): void {
    if (this.usuarioId > 0 && this.receptorId > 0) {
      this.chatService.obtenerMensajes(this.usuarioId, this.receptorId).subscribe({
        next: (data) => {
          console.log('🔍 Mensajes recibidos:', data);
          this.mensajes = Array.isArray(data) ? [...data] : [];
        },
        error: (error) => {
          console.error('🚨 Error al cargar los mensajes:', error);
          this.mensajes = [];
        }
      });
    }
  }

  seleccionarArchivo(event: any): void {
    if (event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];
    }
  }

  enviarMensaje(): void {
    if ((this.nuevoMensaje.trim() || this.archivoSeleccionado) && this.usuarioId > 0 && this.receptorId > 0) {
      this.chatService.enviarMensaje(this.usuarioId, this.receptorId, this.nuevoMensaje, this.archivoSeleccionado).subscribe({
        next: (mensajeEnviado) => {
          console.log('✅ Mensaje enviado:', mensajeEnviado);

          this.mensajes.push(mensajeEnviado);
          this.nuevoMensaje = '';
          this.archivoSeleccionado = undefined;

          setTimeout(() => {
            const chatContainer = document.querySelector('.chat-container');
            if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
          }, 100);
        },
        error: (error) => {
          console.error('🚨 Error al enviar el mensaje:', error);
        }
      });
    }
  }
}
