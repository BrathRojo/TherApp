import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:9000/api/terapeutas'; // URL del backend

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }
}
