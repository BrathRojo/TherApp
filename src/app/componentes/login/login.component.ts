import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  selectedFile: File | null = null; // ✅ Se declara la variable para almacenar la imagen

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      usuEmailTlf: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // ✅ Método para enviar datos al backend
  onSubmit(): void {
    if (this.loginForm.valid) {
      const usuario = {
        usuEmailTlf: this.loginForm.get('usuEmailTlf')?.value,
        clave: this.loginForm.get('clave')?.value
      };

      this.auth.login(usuario.usuEmailTlf, usuario.clave).subscribe(
        response => {
          console.log('Sesión iniciada', response);
          // Redirigir al usuario a la página de inicio
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Usuario o contraseña incorrectos', error);
          this.snackBar.open('El correo de este usuario no ha sido confirmado', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
