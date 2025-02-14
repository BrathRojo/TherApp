import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.scss']
})
export class ConversacionesComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private usuarioService: UsuarioService) {}

  conversaciones = [
    { id: 1, nombre: 'didier', foto: 'assets/ejemplo.jpg' },
    { id: 2, nombre: 'miguel', foto: 'assets/default.png' },
    { id: 3, nombre: 'lorensou', foto: 'assets/default.png' },
    // Agrega más conversaciones según sea necesario
  ];

  userId: number = 0;
  conversacionId: number = this.conversaciones[0].id;

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.userId = params['usuarioId'] || 0;
    });

    this.usuarioService.getConversaciones(this.userId).subscribe(
      (data) => {
        this.conversaciones = data;
      }
    );
  }

  seleccionarConversacion(conversacion: any): void {
    this.conversacionId = conversacion.id;
    console.log('Conversación seleccionada:', this.userId, this.conversacionId);
  }
}