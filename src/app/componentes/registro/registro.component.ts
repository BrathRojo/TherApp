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
  selectedFile: File | null = null; // ✅ Se declara la variable para almacenar la imagen

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private http: HttpClient,private router: Router, private snackBar: MatSnackBar) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]], // Usamos "clave" como en el formulario
      fotoPerfil: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      ubicacion: [''],
      biografia: ['']
    });
  }

  //Método para capturar el archivo cuando el usuario sube una imagen
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ✅ Método para enviar datos al backend
  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario = {
        nombreUsuario: this.registroForm.get('nombreUsuario')?.value,
        nombre: this.registroForm.get('nombre')?.value,
        email: this.registroForm.get('email')?.value,
        clave: this.registroForm.get('clave')?.value,
        telefono: this.registroForm.get('telefono')?.value,
        fechaNacimiento: this.registroForm.get('fechaNacimiento')?.value,
        ubicacion: this.registroForm.get('ubicacion')?.value,
      };
      
      // Enviar datos sin rol (Spring lo asignará)
      this.http.post('http://localhost:9000/api/usuarios/registro', usuario).subscribe({
        next: (response) => {
          console.log('✅ Usuario registrado:', response);
          this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          setTimeout(() => this.router.navigate(['/home']), 3000);
        },
        error: (error) => {
          console.error('🚨 Error al registrar usuario:', error);
          this.snackBar.open('Error en el registro', 'Cerrar', { duration: 4000 });
        }
      });
    }
  }
}
