import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-subscripcion',
  // standalone: true,
  // imports: [],
  templateUrl: './subscripcion.component.html',
  styleUrl: './subscripcion.component.scss'
})
export class SubscripcionComponent {
  subscripcionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.subscripcionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubscribe() {
    if (this.subscripcionForm.valid) {
      console.log('Correo de suscripción:', this.subscripcionForm.value);
    }
  }
}
