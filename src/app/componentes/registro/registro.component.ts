import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  // selectedFile: File | null = null; // Propiedad para almacenar el archivo seleccionado

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0]; // Captura el archivo seleccionado
  //   if (file) {
  //     this.selectedFile = file; // Guarda el archivo en la propiedad
  //     this.registroForm.patchValue({ fotoPerfil: file }); // Actualiza el campo en el formulario si es necesario
  //   }
  // }

  // previewUrl: string | ArrayBuffer | null = null;

// onFileSelected(event: any): void {
//   const file: File = event.target.files[0];
//   if (file) {
//     this.selectedFile = file;

//     const reader = new FileReader();
//     reader.onload = () => {
//       this.previewUrl = reader.result; // Almacena la URL de la imagen para la vista previa
//     };
//     reader.readAsDataURL(file); // Lee el archivo como URL base64
//   }
// }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos del formulario:', this.registroForm.value);
    }
  }

  // onSubmit(): void {
  //   if (this.registroForm.valid && this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('nombreUsuario', this.registroForm.get('nombreUsuario')?.value);
  //     formData.append('nombre', this.registroForm.get('nombre')?.value);
  //     formData.append('email', this.registroForm.get('email')?.value);
  //     formData.append('password', this.registroForm.get('password')?.value);
  //     formData.append('telefono', this.registroForm.get('telefono')?.value);
  //     formData.append('fotoPerfil', this.selectedFile);
  
  //     this.http.post('URL_DEL_SERVIDOR', formData).subscribe(response => {
  //       console.log('Registro exitoso:', response);
  //     });
  //   }
  // }
}
