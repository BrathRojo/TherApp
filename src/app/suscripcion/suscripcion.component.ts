import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-suscripcion',
  // standalone: true,
  // imports: [],
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.scss'
})
export class SuscripcionComponent {
  suscripcionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.suscripcionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubscribe() {
    if (this.suscripcionForm.valid) {
      console.log('Correo de suscripción:', this.suscripcionForm.value);
    }
  }
}
