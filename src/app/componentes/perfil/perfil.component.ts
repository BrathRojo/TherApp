import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguidoresService } from '../../services/seguidores.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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

  constructor(private http: HttpClient, private usuarios: UsuarioService, private route: ActivatedRoute, private seguidores: SeguidoresService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombreUsuarioLogueado = localStorage.getItem('usuario')!;
      this.nombreUsuario = params['nombreUsuario'];
      this.cargarPerfil();
    });
  }

  cargarPerfil() {
    this.usuarios.getPerfilUsuario(this.nombreUsuario).subscribe(usuario => {
      this.id = usuario.id;
      this.foto = usuario.fotoPerfil ? usuario.fotoPerfil : 'assets/default.png';
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
}