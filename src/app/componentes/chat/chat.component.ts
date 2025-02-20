import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() usuarioId!: number;
  @Input() receptorId!: number;
  @Input() nombreReceptor?: string;
  @Input() fotoReceptor?: string;
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  archivoSeleccionado?: File;
  roomId: string = '';
  conversacionActiva: boolean = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UsuarioService, private estado: EstadoService) { }

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
    this.estado.setEstado(false);
    this.estado.estado$.subscribe(valor => this.conversacionActiva = valor);
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
  
      this.chatService.obtenerMensajes(this.usuarioId, this.receptorId).subscribe({
        next: (data) => {
          console.log('🔍 Mensajes recibidos:', data);
  
          if (Array.isArray(data) && data.length > 0) {
            // 🔹 Transformar los mensajes para incluir un objeto `emisor` y `receptor`
            this.mensajes = data.map(mensaje => ({
              ...mensaje,
              emisor: { id: mensaje.emisorId, nombre: mensaje.emisorNombre },  // Crear un objeto con `id`
              receptor: { id: mensaje.receptorId, nombre: mensaje.receptorNombre } // Crear un objeto con `id`
            }));
  
            console.log("✅ Mensajes transformados:", this.mensajes);
          } else {
            console.warn('⚠️ No hay mensajes para mostrar.');
            this.mensajes = [];
          }
        },
        error: (error: any) => {
          console.error('🚨 Error al cargar los mensajes:', error);
        }
      });
    }
  }  
  
  cerrarChat() {
    // Añadir clase para la animación de cierre
    const header = document.querySelector('.header-chat');
    const mensajes = document.querySelector('.mensajes');
    if (header && mensajes) {
      header.classList.add('closing');
      mensajes.classList.add('closing');
    }
  
    // Esperar la animación antes de ocultar el chat
    setTimeout(() => {
      this.conversacionActiva = false;
      this.estado.setEstado(false);
    }, 500); // Esperar 500ms (la duración de la animación)
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

          this.cargarMensajes();
  
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
