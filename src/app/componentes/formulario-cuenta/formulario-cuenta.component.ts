import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrl: './formulario-cuenta.component.scss'
})
export class FormularioCuentaComponent {
  registroForm: FormGroup;

  // en la pagina de perfil habrá un boton de cambiar cuenta a organizacion y otro para terapeuta
  // este boton te manda a este formulario que cambiara a traves de una variable tipoCambio para ahorrar componentes, y el formulario tendra los campos
  // exclusivos de organizacion/terapeuta ademas del nombre ya rellenado con el nombre actual por si el usuario quiere cambiarlo

  tipoCambio: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos del formulario:', this.registroForm.value);
    }
  }
}
