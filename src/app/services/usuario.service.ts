import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  nombreUsuario: string;
  email: string;
  clave: string;
  fotoPerfil: string;
  rol: string;
  dni: string;
  fechaNacimiento: Date;
  telefono: string;
  ubicacion: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'http://localhost:9000/api/usuarios'; // URL del backend

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario);
  }

  getNombreUsuario(): Observable<{ nombre: string }> {
    return this.http.get<{ nombre: string }>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
}
