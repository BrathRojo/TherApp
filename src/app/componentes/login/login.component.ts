import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
      selectedFile: File | null = null; // ✅ Se declara la variable para almacenar la imagen
    
      constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private http: HttpClient) {
        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          clave: ['', [Validators.required, Validators.minLength(8)]]
        });
      }
      // ✅ Método para enviar datos al backend
      onSubmit(): void {
        if (this.loginForm.valid) {
          const usuario = {
            email: this.loginForm.get('email')?.value,
            clave: this.loginForm.get('clave')?.value
          };
          
          // Enviar datos sin rol (Spring lo asignará)
          this.http.post('http://localhost:9000/api/usuarios/login', usuario).subscribe(
            response => {
              console.log('Sesión iniciada', response);
            },
            error => {
              console.error('Email o contraseña incorrectos', error);
            }
          );
        }
      }
}
