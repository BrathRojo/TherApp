import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguidoresService } from '../../services/seguidores.service';
import * as bootstrap from 'bootstrap';
import { TerapeutaService } from '../../services/terapeuta.service';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../interfaces/publicacion';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() publicaciones: Publicacion[] = [];

  nombreUsuarioLogueado?: string;
  siguiendo: boolean = false;

  id: number = 0;
  foto?: string;
  nombreUsuario: string = '';
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  fechaNacimiento: Date = new Date();
  biografia?: string;
  ubicacion?: string;
  selectedFile?: File;
  modalInstance?: bootstrap.Modal;

  numtarjeta: String = '';
  caducidad: Date = new Date();
  CCV: number = 0;

  constructor(private http: HttpClient, private authService: AuthService, private usuarios: UsuarioService, private publicacionService: PublicacionService, private route: ActivatedRoute, private terapeutaService: TerapeutaService, private seguidores: SeguidoresService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreUsuarioLogueado = localStorage.getItem('usuario')!;
      this.nombreUsuario = params['nombreUsuario'];
      this.cargarPerfil();
      this.obtenerPublicaciones();
    });
  }

  cargarPerfil() {
    this.usuarios.getPerfilUsuario(this.nombreUsuario).subscribe(usuario => {
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
      error: err => {
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
          // multimedia: p.tipo && p.url ? [{ tipo: p.tipo, url: p.url }] : [],
          likes: 0,
          comentarios: [],
          mostrarInputComentario: false,
          nuevoComentario:'',
          liked:false,
          nombre:p.nombre,
          foto:p.foto || 'default.png'
        }));
      }

      
    })
    console.log(this.publicaciones[0].foto);
  }

}