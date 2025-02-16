import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:9000/api/usuarios';

  constructor(private http: HttpClient) {}

  getPerfilUsuario(nombre: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/get/${nombre}`);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario);
  }

  getNombreUsuario(): Observable<{ nombre: string }> {
    return this.http.get<{ nombre: string }>(this.apiUrl);
  }

  buscarUsuarios(query: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?query=${query}`);
  }

  obtenerSeguidoresComunes(usuarioId: number, buscadoId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/seguidores-comunes?usuarioId=${usuarioId}&buscadoId=${buscadoId}`);
  }

  obtenerUsuariosSeguidosSinConversacion(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/seguidos-sin-conversacion?usuarioId=${usuarioId}`);
  }

  obtenerMasEnTherApp(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/mas-en-therapp?usuarioId=${usuarioId}`);
  }
}
