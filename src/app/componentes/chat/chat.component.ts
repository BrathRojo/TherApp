import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() usuarioId!: number;
  @Input() receptorId!: number;
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  archivoSeleccionado?: File;
  roomId: string = '';
  private roomSubscription: any;  // Variable para guardar la suscripción

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = Number(localStorage.getItem('usuarioId')) || 0;
      this.receptorId = Number(params['receptorId']) || 0;
      
      this.roomId = this.usuarioId > this.receptorId ? `${this.receptorId}-${this.usuarioId}` : `${this.usuarioId}-${this.receptorId}`;
      this.chatService.joinRoom(this.roomId);

      console.log("🛠 Usuario ID:", this.usuarioId, "Receptor ID:", this.receptorId);

      if (this.usuarioId > 0 && this.receptorId > 0) {
        this.cargarMensajes();
      } else {
        console.warn('⚠️ ID de usuario o receptor no válido. Mensajes no cargados.');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receptorId'] && changes['receptorId'].currentValue > 0) {
      console.log("🔄 Cambio detectado en receptorId:", changes['receptorId'].currentValue);
      this.cargarMensajes(); // Recargar la conversación
    }
  }

  cargarMensajes(): void {
    if (this.usuarioId > 0 && this.receptorId > 0) {
      console.log("🔄 Cargando mensajes entre", this.usuarioId, "y", this.receptorId);

      // Verificar si ya estamos suscritos a esta roomId
      if (this.roomSubscription) {
        this.roomSubscription.unsubscribe();  // Desuscribirse de la anterior suscripción
      }
      this.chatService.obtenerMensajes(this.usuarioId, this.receptorId).subscribe(data =>
        this.mensajes = data
      );

      this.roomId = this.usuarioId > this.receptorId ? `${this.receptorId}-${this.usuarioId}` : `${this.usuarioId}-${this.receptorId}`;
      
      // Suscribirse al WebSocket
      this.roomSubscription = this.chatService.joinRoom(this.roomId).subscribe({
        next: (data: any) => {
          console.log('🔍 Mensajes recibidos:', data);
          this.mensajes = data || [];
        },
        error: (error: any) => {
          console.error('🚨 Error al cargar los mensajes:', error);
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
          this.chatService.sendMessage(this.roomId, { message: this.nuevoMensaje, user: this.usuarioId });
          this.mensajes.push(mensajeEnviado); // Añadir el mensaje al array local
          this.nuevoMensaje = '';
          this.archivoSeleccionado = undefined;

          // 🔽 Auto-scroll al último mensaje enviado
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
