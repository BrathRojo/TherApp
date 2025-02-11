import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  // Campos que ya tenías
  foto: string;
  nombreUsuario: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  presentacion: string;
  ubicacion: string;

  // Nuevo: archivo seleccionado
  selectedFile?: File;

  constructor(private http: HttpClient) { 
    // Ejemplo estático: Podrías cargar datos reales desde un servicio
    this.foto = 'assets/ejemplo.jpg';
    this.nombreUsuario = 'didilombi';
    this.nombre = 'Didier';
    this.apellidos = 'Lombi Ocaña';
    this.email = 'didier.lombi@iesdoctorbalmis.com';
    this.telefono = '622400809';
    this.fechaNacimiento = new Date('2001-01-29');
    this.presentacion = 'El nuevo CEO de DeepSeek';
    this.ubicacion = 'Alicante';
  }

  ngOnInit() {
    // Aquí podrías llamar a un servicio para obtener datos del usuario 
    // por su id, y asignar this.foto = user.fotoPerfil, etc.
  }

  // Cuando el usuario selecciona un archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
  }

  // Subir foto al backend
  onSubirFoto() {
    if (!this.selectedFile) {
      alert('No has seleccionado ninguna foto.');
      return;
    }
    const formData = new FormData();
    formData.append('foto', this.selectedFile);

    // Asume que el id del usuario es 1 (¡ajusta según corresponda!)
    const userId = 1;

    this.http.post(`http://localhost:9000/api/usuarios/${userId}/foto`, formData)
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
