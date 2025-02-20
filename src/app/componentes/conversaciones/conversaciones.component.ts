import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EstadoService } from '../../services/estado.service';

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
  usuariosSeguidosSinConversacionFiltrados: Usuario[] = [];
  masEnTherApp: Usuario[] = [];
  masEnTherAppFiltrados: Usuario[] = [];
  selectedConversacion?: Usuario | null = null;//garantizar que no sea undefined
  searchQuery: string = '';
  private searchTerms = new Subject<string>();
  mensajesSinLeer: { usuarioId: number, cantidad: number }[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private usuarioService: UsuarioService,
    private estado: EstadoService
  ) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('usuarioId'));
    if (this.userId > 0) {
      this.cargarConversaciones();
      this.cargarUsuariosSeguidosSinConversacion();
      this.cargarMasEnTherApp();
    }

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => term.length > 0 ? this.usuarioService.buscarUsuarios(term) : [])
    ).subscribe({
      next: (usuarios: Usuario[]) => {
        this.filtrarResultados(usuarios);
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    });
  }

  cargarConversaciones(): void {
    this.chatService.obtenerConversaciones(this.userId).subscribe({
      next: (conversaciones) => {
        console.log('✅ Conversaciones recibidas:', conversaciones);  // 🔥 Muestra los datos en la consola
        this.conversaciones = conversaciones;  // 📌 Guardamos las conversaciones correctamente
        this.conversacionesFiltradas = conversaciones;
        this.conversacionesFiltradas.forEach(conversacion => {
          this.chatService.obtenerMensajesSinLeer(this.userId, conversacion.id).subscribe(cantidad => {
            this.mensajesSinLeer.push({usuarioId: conversacion.id, cantidad: cantidad});
            
            console.log(this.mensajesSinLeer);
          });
        });
      },
      error: (error) => {
        console.error('🚨 Error al cargar las conversaciones:', error);
      }
    });
    
  }  

  cargarUsuariosSeguidosSinConversacion(): void {
    this.usuarioService.obtenerUsuariosSeguidosSinConversacion(this.userId).subscribe({
      next: (usuarios) => {
        this.usuariosSeguidosSinConversacion = usuarios;
        this.usuariosSeguidosSinConversacionFiltrados = usuarios;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios seguidos sin conversación:', error);
      }
    });
  }

  cargarMasEnTherApp(): void {
    this.usuarioService.obtenerMasEnTherApp(this.userId).subscribe({
      next: (usuarios) => {
        this.masEnTherApp = usuarios;
        this.masEnTherAppFiltrados = usuarios;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios de "Más en TherApp":', error);
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
      this.usuariosSeguidosSinConversacionFiltrados = this.usuariosSeguidosSinConversacion;
      this.masEnTherAppFiltrados = this.masEnTherApp;
    }
  }

  filtrarResultados(usuarios: Usuario[]): void {
    this.conversacionesFiltradas = this.conversaciones.filter(conversacion =>
      conversacion.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      conversacion.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.usuariosSeguidosSinConversacionFiltrados = this.usuariosSeguidosSinConversacion.filter(usuario =>
      usuario.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      usuario.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.masEnTherAppFiltrados = usuarios.filter(usuario =>
      !this.usuariosSeguidosSinConversacion.some(u => u.id === usuario.id) &&
      !this.conversaciones.some(c => c.id === usuario.id)
    );
  }

  getCantidadMensajes(usuarioId: number) {
    const mensajeUsuario = this.mensajesSinLeer.find(m => m.usuarioId === usuarioId);
    return mensajeUsuario?.cantidad
  }

  //METODO ANTERIOR ANTERIOR 
  // abrirConversacion(usuario: Usuario): void {
  //   this.selectedConversacion = usuario;
  //   this.router.navigate(['/chat', usuario.id]);
  // }
  abrirConversacion(usuario: Usuario | null): void {
    if (usuario && usuario.id) {
      console.log("✅ Usuario seleccionado:", usuario);  // 🔥 Muestra el usuario seleccionado
      this.selectedConversacion = usuario;

      const mensajeUsuario = this.mensajesSinLeer.find(m => m.usuarioId === usuario.id);
      if (mensajeUsuario && mensajeUsuario?.cantidad !== 0) {
        mensajeUsuario.cantidad = 0;
      }

      this.estado.setEstado(true);
  
      // ✅ Pasar correctamente el `id` del usuario receptor a la URL
      this.router.navigate(['/chat', usuario.id]);
    } else {
      console.error('🚨 Error: usuario no válido en abrirConversacion');
      this.selectedConversacion = { 
        id: 0, 
        username: 'Desconocido', 
        nombre: 'Desconocido', 
        email: '', 
        fotoPerfil: '',
        telefono: '',
        fechaNacimiento: new Date(),
      };
    }
  }  
}