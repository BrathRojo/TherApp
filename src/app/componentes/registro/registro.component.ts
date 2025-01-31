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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      fotoPerfil: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      ubicacion: ['', Validators.required],
      biografica: ['', Validators.required],
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

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos del formulario:', this.registroForm.value);
    }
  }
}
