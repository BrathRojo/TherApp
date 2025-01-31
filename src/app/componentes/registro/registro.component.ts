import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfil: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      ubicacion: ['']
    });
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      this.usuarioService.registrarUsuario(this.registroForm.value).subscribe(
        response => {
          console.log('Usuario registrado con éxito', response);
        },
        error => {
          console.error('Error al registrar usuario', error);
        }
      );
    }
  }

  // onSubmit() {
  //   if (this.registroForm.valid) {
  //     console.log('Datos del formulario:', this.registroForm.value);
  //   }
  // }

  onSubmit(): void {
    if (this.registroForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombreUsuario', this.registroForm.get('nombreUsuario')?.value);
      formData.append('nombre', this.registroForm.get('nombre')?.value);
      formData.append('email', this.registroForm.get('email')?.value);
      formData.append('password', this.registroForm.get('password')?.value);
      formData.append('telefono', this.registroForm.get('telefono')?.value);
      formData.append('fotoPerfil', this.selectedFile);
  
      this.http.post('URL_DEL_SERVIDOR', formData).subscribe(response => {
        console.log('Registro exitoso:', response);
      });
    }
  }
}
