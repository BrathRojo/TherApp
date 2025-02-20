import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguidoresService {

  private apiUrl = 'http://localhost:9000/api/usuarios'; // URL del backend

  constructor(private http: HttpClient) { }

  seguirUsuario(usuarioId: number, seguidoId: number) {
    console.log('Seguir usuario', usuarioId, seguidoId);
    
    return this.http.post(`${this.apiUrl}/${seguidoId}/seguir?seguidorId=${usuarioId}`, {usuarioId});
  }

  dejarDeSeguirUsuario(usuarioId: number, seguidoId: number) {
    const url = `${this.apiUrl}/${seguidoId}/dejarDeSeguir?seguidorId=${usuarioId}`;
    console.log('Dejar de seguir usuario URL:', url);
    
    return this.http.delete(url).pipe(
      catchError(error => {
        console.error('Error al dejar de seguir usuario:', error);
        return throwError(error);
      })
    );
  }

  estaSiguiendo(usuarioId: number, seguidoId: number): Observable<boolean> {
    console.log(`${this.apiUrl}/${usuarioId}/${seguidoId}`);
    
    return this.http.get<boolean>(`${this.apiUrl}/${seguidoId}/${usuarioId}`);
  }
}
