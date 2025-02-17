import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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

  constructor(private http: HttpClient, private servicio: UsuarioService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.nombreUsuario = this.route.snapshot.params['nombreUsuario'];
    this.servicio.getPerfilUsuario(this.nombreUsuario).subscribe(usuario => {
      this.foto = usuario.fotoPerfil ? usuario.fotoPerfil : 'assets/default.png';
      this.nombreUsuario = usuario.username;
      this.nombre = usuario.nombre;
      this.email = usuario.email;
      this.telefono = usuario.telefono;
      this.fechaNacimiento = usuario.fechaNacimiento;
      this.biografia = usuario.biografia ? usuario.biografia : 'Este usuario no tiene biografía';
      this.ubicacion = usuario.ubicacion ? usuario.ubicacion : 'No especificada';
    });
  }

  abrirModal() {
    const modalElement = document.getElementById('editarPerfilModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  actualizarPerfil() {
    const datosActualizados = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
      biografia: this.biografia,
      ubicacion: this.ubicacion
    };
  
    this.http.put(`http://localhost:9000/api/usuarios/${this.nombreUsuario}`, datosActualizados)
      .subscribe({
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

  // Subir foto al backend
  onSubirFoto() {
    if (!this.selectedFile) {
      alert('No has seleccionado ninguna foto.');
      return;
    }
    const formData = new FormData();
    formData.append('foto', this.selectedFile);

    this.http.post(`http://localhost:9000/api/usuarios/${this.nombreUsuario}/foto`, formData)
      .subscribe({
        next: (resp) => {
          console.log('Foto subida correctamente', resp);
          alert('Foto subida con éxito.');
          // Opcional: Recargar la foto del backend 
          // o reasignar this.foto = 'uploads/usuario_1_...' 
        },
        error: (err) => {
          console.error('Error al subir foto', err);
          alert('Error subiendo foto.');
        }
      });
  }

}
