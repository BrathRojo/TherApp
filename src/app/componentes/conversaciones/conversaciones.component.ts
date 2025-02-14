import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service'; // Importa el servicio de chat
import { Usuario } from '../../interfaces/usuario'; // Importa el modelo de Usuario

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.scss']
})
export class ConversacionesComponent implements OnInit {
  userId: number = 0;
  conversaciones: Usuario[] = [];
  selectedConversacion?: Usuario;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('usuarioId'));
    if (this.userId > 0) {
      this.cargarConversaciones();
    }
  }

  cargarConversaciones(): void {
    this.chatService.obtenerConversaciones(this.userId).subscribe({
      next: (conversaciones) => {
        this.conversaciones = conversaciones;
      },
      error: (error) => {
        console.error('Error al cargar las conversaciones:', error);
      }
    });
  }

  seleccionarConversacion(conversacion: Usuario): void {
    this.selectedConversacion = conversacion;
  }
}