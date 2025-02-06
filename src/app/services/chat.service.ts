import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';  // ✅ Importar SockJS correctamente

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages/chat';
  private stompClient: Client; // ✅ Cliente WebSocket

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:9000/ws'), // 🔥 Sin withCredentials aquí
      reconnectDelay: 5000 // Reintentar conexión cada 5 segundos si se desconecta
    });

    this.stompClient.activate(); // 🔥 Iniciar WebSocket
  }

  // ✅ Enviar mensaje con credenciales en la solicitud HTTP
  enviarMensaje(usuarioId: number, receptorId: number, contenido: string, archivo?: File): Observable<any> {
    const formData = new FormData();
    if (contenido.trim()) {
      formData.append('contenido', contenido);
    }
    if (archivo) {
      formData.append('archivo', archivo);
    }

    return this.http.post<any>(`${this.apiUrl}/${usuarioId}/${receptorId}`, formData, {
      withCredentials: true  // ✅ Aquí sí usamos withCredentials
    });
  }
}
