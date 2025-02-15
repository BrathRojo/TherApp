import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.scss']
})
export class ConversacionesComponent implements OnInit {
  userId: number = 0;
  conversaciones: Usuario[] = [];
  conversacionesFiltradas: Usuario[] = [];
  usuariosSeguidosSinConversacion: Usuario[] = [];
  selectedConversacion?: Usuario;
  searchQuery: string = '';
  private searchTerms = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('usuarioId'));
    if (this.userId > 0) {
      this.cargarConversaciones();
      this.cargarUsuariosSeguidosSinConversacion();
    }

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => term.length > 0 ? this.usuarioService.buscarUsuarios(term) : [])
    ).subscribe({
      next: (usuarios: Usuario[]) => {
        this.conversacionesFiltradas = usuarios;
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    });
  }

  cargarConversaciones(): void {
    this.chatService.obtenerConversaciones(this.userId).subscribe({
      next: (conversaciones) => {
        this.conversaciones = conversaciones;
        this.conversacionesFiltradas = conversaciones;
      },
      error: (error) => {
        console.error('Error al cargar las conversaciones:', error);
      }
    });
  }

  cargarUsuariosSeguidosSinConversacion(): void {
    this.usuarioService.obtenerUsuariosSeguidosSinConversacion(this.userId).subscribe({
      next: (usuarios) => {
        this.usuariosSeguidosSinConversacion = usuarios;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios seguidos sin conversación:', error);
      }
    });
  }

  seleccionarConversacion(conversacion: Usuario): void {
    this.selectedConversacion = conversacion;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    if (this.searchQuery.length > 0) {
      this.searchTerms.next(this.searchQuery);
    } else {
      this.conversacionesFiltradas = this.conversaciones;
    }
  }

  abrirConversacion(usuario: Usuario): void {
    this.selectedConversacion = usuario;
    this.router.navigate(['/chat', usuario.id]);
  }
}