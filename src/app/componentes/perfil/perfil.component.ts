import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Ajusta esta interfaz a tu modelo de usuario real
interface Usuario {
  id: number;
  nombreUsuario: string;
  nombre: string;
  apellidos?: string;
  email: string;
  telefono?: string;
  fechaNacimiento?: string;  // o Date
  presentacion?: string;
  ubicacion?: string;
  fotoPerfil?: string;       // Ruta en BD, p.ej. "uploads/usuario_1.jpg"
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  foto: string = '';
  nombreUsuario: string = '';
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  telefono: string = '';
  fechaNacimiento: Date = new Date();
  presentacion: string = '';
  ubicacion: string = '';
  selectedFile?: File;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // 1️⃣ Supongamos que tienes el ID del usuario en una variable (p.e. 1).
    //    Aquí NO supongo route param ni nada. Cambia a tu gusto (login, etc.).
    const userId = 1;

    // 2️⃣ Llamamos al backend: GET /api/usuarios/1 (o el ID real)
    this.http.get<Usuario>(`http://localhost:9000/api/usuarios/${userId}`)
      .subscribe({
        next: (usuario) => {
          // Asignamos los datos
          this.nombreUsuario = usuario.nombreUsuario;
          this.nombre = usuario.nombre;
          this.apellidos = usuario.apellidos ?? '';
          this.email = usuario.email;
          this.telefono = usuario.telefono ?? '';
          this.fechaNacimiento = usuario.fechaNacimiento
            ? new Date(usuario.fechaNacimiento)
            : new Date();
          this.presentacion = usuario.presentacion ?? '';
          this.ubicacion = usuario.ubicacion ?? '';

          // 3️⃣ Para la foto:
          //    Si el backend guarda "fotoPerfil": "uploads/usuario_1_foto.jpg",
          //    necesitamos anteponer la URL base http://localhost:9000
          //    para que <img [src]="foto"> pueda mostrarla.
          if (usuario.fotoPerfil) {
            this.foto = `http://localhost:9000/${usuario.fotoPerfil}`;
          } else {
            // Si no tiene foto, podemos mostrar una por defecto
            this.foto = 'assets/ejemplo.jpg';
          }
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
          // Manejo de error, si quieres
        }
      });
  }

  // Cuando el usuario selecciona un archivo (nueva foto)
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Llamamos al backend: POST /api/usuarios/1/foto con formData
  onSubirFoto() {
    if (!this.selectedFile) {
      alert('No has seleccionado ninguna foto.');
      return;
    }
    
    const formData = new FormData();
    formData.append('foto', this.selectedFile);
  
    const userId = 1;
  
    this.http.post(`http://localhost:9000/api/usuarios/${userId}/foto`, formData)
      .subscribe({
        next: (resp) => {
          console.log('Foto subida', resp);
          alert('Foto cambiada con éxito');
          // Aquí no hay problema usando ! porque TypeScript ya sabe que no es undefined
          this.foto = `http://localhost:9000/uploads/usuario_${userId}_${this.selectedFile!.name}`;
        },
        error: (err) => {
          console.error('Error al subir foto', err);
          alert('Error subiendo foto');
        }
      });
  }  
}
