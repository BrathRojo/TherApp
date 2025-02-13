import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from "../../services/usuario.service";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mostrarDatalist = false;
  selectedFile: File | null = null; // ✅ Guardamos el archivo aquí si se selecciona

  // Lista de provincias de ejemplo
  provincias: string[] = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
    "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria",
    "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada",
    "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida",
    "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense",
    "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife",
    "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo",
    "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      // ❌ Eliminamos 'fotoPerfil' del form control
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      ubicacion: ['']
    });
  }

  // ✅ Capturar el archivo seleccionado en selectedFile
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
  }


  // para que el datalist solo aparezca cuando el usuario escriba algo
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.mostrarDatalist = input.value.length > 0;
  }

  // ✅ Método para enviar datos al backend
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Datos del formulario
      const usuario = {
        username: this.registroForm.get('username')?.value,
        nombre: this.registroForm.get('nombre')?.value,
        email: this.registroForm.get('email')?.value,
        clave: this.registroForm.get('clave')?.value,
        telefono: this.registroForm.get('telefono')?.value,
        fechaNacimiento: this.registroForm.get('fechaNacimiento')?.value,
        ubicacion: this.registroForm.get('ubicacion')?.value
      };

      // Opcional: preparar para enviar foto como FormData si tu backend lo maneja
      // Si tu backend recibe multipart/form-data:
      /*
      const formData = new FormData();
      formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }
      // Y luego harías:
      // this.http.post('http://localhost:9000/api/usuarios/registro', formData)...
      */

      // Aquí, simplemente lo enviamos como JSON
      // (la foto se podría enviar luego o con un endpoint distinto)
      this.http.post('http://localhost:9000/api/usuarios/registro', usuario).subscribe({
        next: (response) => {
          console.log('✅ Usuario registrado con éxito:', response);
          this.snackBar.open('Registro exitoso. Redirigiendo...', 'Cerrar', { duration: 3000 });
          setTimeout(() => {
            this.router.navigate(['/']); // 🔄 Redirigir a la página de inicio
          }, 3000);
        },
        error: (error) => {
          console.error('🚨 Error al registrar usuario:', error);
          if (error.error && error.error.message) {
            this.snackBar.open(`Error en el registro: ${error.error.message}`, 'Cerrar', { duration: 4000 });
          } else {
            this.snackBar.open('Error en el registro. Inténtalo de nuevo.', 'Cerrar', { duration: 4000 });
          }
        }
      });
    }

  }
}
