import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { TerapeutaService } from '../../services/terapeuta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SeguidoresService } from '../../services/seguidores.service';
import * as bootstrap from 'bootstrap';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../interfaces/publicacion';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() publicaciones: Publicacion[] = [];
  
  nombreUsuarioLogueado: string = '';
  nombreUsuario: string = '';
  esTerapeuta: boolean = false;
  esPremium: boolean = false;
  modalInstance?: bootstrap.Modal;

  id: number = 0;
  foto?: string;
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  fechaNacimiento: Date = new Date();
  biografia?: string;
  ubicacion?: string;
  selectedFile?: File;
  siguiendo: boolean = false;

  numtarjeta: String = '';
  caducidad: Date = new Date();
  CCV: number = 0;

  constructor(
    private http: HttpClient,
    private usuarios: UsuarioService,
    private route: ActivatedRoute,
    private terapeutaService: TerapeutaService,
    private seguidores: SeguidoresService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreUsuarioLogueado = localStorage.getItem('usuario')!;
      this.nombreUsuario = params['nombreUsuario'];
      this.cargarPerfil();
      this.obtenerPublicaciones();

      // Verificar si el usuario logueado es terapeuta
      const usuarioId = Number(localStorage.getItem('usuarioId'));
      this.usuarios.esTerapeuta(usuarioId).subscribe((esTerapeuta: boolean) => {
        this.esTerapeuta = esTerapeuta;
        if (esTerapeuta) {
          this.terapeutaService.esPremium(usuarioId).subscribe((esPremium: boolean) => {
            this.esPremium = esPremium;
          });
        }
      });
    });
  }

  cargarPerfil() {
    this.usuarios.getPerfilUsuario(this.nombreUsuario).subscribe((usuario: Usuario) => {
      this.id = usuario.id;
      this.foto = usuario.fotoPerfil ? usuario.fotoPerfil : 'default.png';
      this.nombreUsuario = usuario.username;
      this.nombre = usuario.nombre;
      this.email = usuario.email;
      this.telefono = usuario.telefono;
      this.fechaNacimiento = usuario.fechaNacimiento;
      this.biografia = usuario.biografia ? usuario.biografia : 'Este usuario no tiene biografía';
      this.ubicacion = usuario.ubicacion ? usuario.ubicacion : 'No especificada';
      
      this.seguidores.estaSiguiendo(Number(localStorage.getItem('usuarioId'))!, this.id).subscribe(siguiendo => {
        this.siguiendo = siguiendo;
      });
    });
  }

  cambiarAPremium(){
    const datosBancarios = {
      numtarjeta: this.numtarjeta,
      caducidad: this.caducidad,
      CCV: this.CCV
    }

    this.terapeutaService.hacerPremium(this.email).subscribe({
      next: () => {
        alert('Pago realizado con éxito.');
        this.modalInstance?.hide();
      },
      error: err => {
        console.error('Error al realizar el pago:', err);
        alert('Hubo un error al actualizar el perfil.');
      }
    });
  }

  abrirModal() {
    const modalElement = document.getElementById('editarPerfilModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    };
  }

  abrirPasarela(){
    const modalElement = document.getElementById('pasarelaPagosModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    };
  }

  abrirModalCancelar() {
    const modalElement = document.getElementById('cancelarSuscripcionModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  cancelarSuscripcion() {
    this.terapeutaService.cancelarPremium(this.email).subscribe({
      next: () => {
        alert('Suscripción cancelada con éxito.');
        this.modalInstance?.hide();
        this.esPremium = false;
      },
      error: (err: any) => {
        console.error('Error al cancelar la suscripción:', err);
        alert('Hubo un error al cancelar la suscripción.');
      }
    });
  }

  actualizarPerfil() {
    const datosActualizados = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento instanceof Date 
        ? this.fechaNacimiento.toISOString().split('T')[0] // Convierte a formato YYYY-MM-DD
        : this.fechaNacimiento,
      biografia: this.biografia,
      ubicacion: this.ubicacion
    };
  
    this.usuarios.actualizarPerfil(this.nombreUsuario, datosActualizados).subscribe({
      next: () => {
        alert('Perfil actualizado con éxito.');
        this.modalInstance?.hide();
      },
      error: (err: any) => {
        console.error('Error al actualizar perfil:', err);
        alert('Hubo un error al actualizar el perfil.');
      }
    });
  }  

  triggerInput() {
    document.getElementById('fotoInput')?.click();
  }

  // Cuando el usuario selecciona un archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
    this.onSubirFoto();
  }

  seguir() {
    console.log(this.id);
    this.seguidores.seguirUsuario(Number(localStorage.getItem('usuarioId'))!, this.id).subscribe(() => {
      this.cargarPerfil();
    });
  }

  dejarDeSeguir() {
    console.log(this.id);
    this.seguidores.dejarDeSeguirUsuario(Number(localStorage.getItem('usuarioId'))!, this.id).subscribe(() => {
      this.cargarPerfil();
    });
  }

  // Subir foto al backend
  onSubirFoto() {
    if (!this.selectedFile) {
      alert('No has seleccionado ninguna foto.');
      return;
    }

    this.usuarios.cambiarFotoPerfil(this.nombreUsuario, this.selectedFile).subscribe(() => {
      this.cargarPerfil();
    });
  }

  obtenerPublicaciones(){
    const storedId = localStorage.getItem('usuarioId');
    this.id=Number(storedId);
    this.publicacionService.obtenerPublicaciones(this.id).subscribe({
      
      next:(publicaciones)=>{
        this.publicaciones = publicaciones.map(p=>({
          texto: p.texto,
          multimedia: [],
          likes: 0,
          comentarios: [],
          mostrarInputComentario: false,
          nuevoComentario:'',
          liked:false
        }));
      }
    })
  }

  abrirModalCambiarUsuario() {
    const modalElement = document.getElementById('cambiarUsuarioModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  cambiarAUsuario() {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    this.terapeutaService.eliminarTerapeuta(usuarioId).subscribe({
      next: () => {
        alert('Cuenta cambiada a usuario con éxito.');
        this.modalInstance?.hide();
        this.esTerapeuta = false;
        this.cdr.detectChanges(); // Refresca la vista
      },
      error: (err: any) => {
        console.error('Error al cambiar la cuenta a usuario:', err);
        alert('Hubo un error al cambiar la cuenta.');
      }
    });
  }
}