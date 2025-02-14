import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages';

  constructor(private http: HttpClient) {}

  // Obtener mensajes entre dos usuarios
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat/${usuarioId}/${receptorId}`);
  }

  //Ahora enviamos `multipart/form-data`
  enviarMensaje(usuarioId: number, receptorId: number, contenido: string, archivo?: File): Observable<any> {
    const formData = new FormData();
    if (contenido.trim()) {
      formData.append('contenido', contenido);
    }

    if (archivo) {
      formData.append('archivo', archivo);
    }

    return this.http.post<any>(`${this.apiUrl}/chat/${usuarioId}/${receptorId}`, formData);
  }

  obtenerConversaciones(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/conversaciones/${usuarioId}`);
  }
}