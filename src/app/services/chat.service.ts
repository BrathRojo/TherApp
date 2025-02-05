import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages/chat';
  private stompClient: Client; // ✅ Cliente para WebSockets

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:9000/ws', // ✅ Conectar a WebSocket
      reconnectDelay: 5000 // Reintentar conexión cada 5 segundos si se desconecta
    });

    this.stompClient.activate(); // 🔥 Iniciar conexión con WebSockets
  }

  // ✅ Obtener mensajes entre dos usuarios (Método HTTP)
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${receptorId}`);
  }

  // ✅ Enviar mensaje con o sin archivo (Método HTTP)
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

  // ✅ Escuchar mensajes en tiempo real con WebSockets
  subscribeToChat(usuarioId: number, callback: (mensaje: any) => void) {
    this.stompClient.subscribe(`/topic/chat/${usuarioId}`, message => {
      callback(JSON.parse(message.body));
    });
  }
}
