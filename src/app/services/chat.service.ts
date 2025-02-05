import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';  // ✅ Importar SockJS

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages/chat';
  private stompClient: Client; // ✅ Cliente WebSocket

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:9000/ws'),  // ✅ Conectar con SockJS
      reconnectDelay: 5000 // Reintentar conexión cada 5 segundos si se desconecta
    });

    this.stompClient.activate(); // 🔥 Iniciar WebSocket
  }

  // ✅ Obtener mensajes entre dos usuarios
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${receptorId}`);
  }

  // ✅ Enviar mensaje con o sin archivo
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

  // ✅ Escuchar mensajes en tiempo real
  subscribeToChat(usuarioId: number, callback: (mensaje: any) => void) {
    this.stompClient.subscribe(`/topic/chat/${usuarioId}`, message => {
      callback(JSON.parse(message.body));
    });
  }
}
