import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:9000/api/messages/chat'; // 🔥 Ahora coincide con Spring Boot

  // ✅ Corregido: Obtener mensajes entre dos usuarios
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${receptorId}`);
  }

  // ✅ Corregido: Enviar mensaje entre dos usuarios
  enviarMensaje(usuarioId: number, receptorId: number, contenido: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${usuarioId}/${receptorId}`, { contenido });
  }
}
