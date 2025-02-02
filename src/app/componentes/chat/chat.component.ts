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
  terapeutaId!: number;
  mensajes: any[] = [];
  nuevoMensaje: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuarioId = +params['usuarioId']; // Obtiene el usuarioId de la URL
      this.terapeutaId = +params['terapeutaId']; // Obtiene el terapeutaId de la URL
  
      // Obtener los mensajes cuando se carga el componente
      this.chatService.obtenerMensajes(this.usuarioId, this.terapeutaId).subscribe(data => {
        // Verificar cómo se estructura el objeto
        console.log(data); // ver los datos para entender cómo están estructurados los mensajes
        // Asegurarse de que los mensajes son solo texto
        this.mensajes = data.map(mensaje => {
          return {
            ...mensaje,
            contenido: mensaje.contenido && typeof mensaje.contenido === 'string' ? mensaje.contenido : ''
          };
        });
      });
    });
  }
  
  

  // Enviar el mensaje al backend
  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      this.chatService.enviarMensaje(this.usuarioId, this.terapeutaId, this.nuevoMensaje).subscribe(mensaje => {
        this.mensajes.push(mensaje);  // Añadir el nuevo mensaje a la lista
        this.nuevoMensaje = '';  // Limpiar el campo de texto
      });
    }
  }
}
