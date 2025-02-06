import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages/chat';

  constructor(private http: HttpClient) {}

  // Obtener mensajes entre dos usuarios
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${receptorId}`);
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

    return this.http.post<any>(`${this.apiUrl}/${usuarioId}/${receptorId}`, formData);
  }
}