import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:9000/api/messages';

  constructor(private http: HttpClient) {}

  // Método para obtener los mensajes
  obtenerMensajes(usuarioId: number, terapeutaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${terapeutaId}`);
  }

  // Método para enviar un nuevo mensaje
  enviarMensaje(usuarioId: number, terapeutaId: number, contenido: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${usuarioId}/${terapeutaId}`, {contenido});
  }
}
