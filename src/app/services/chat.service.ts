import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AuthService } from './auth.service';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9000/api/messages';
  private stompClient: any;
  private messageSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:9000/chat-socket'; // Ensure the correct protocol
    const socket = new SockJS.default(url);
    this.stompClient = Stomp.over(socket);
  }


  joinRoom(roomId: string): Observable<any> {
    return new Observable(observer => {
      this.stompClient.connect(
        { 'Authorization': 'Bearer ' + this.auth.getToken() }, 
        () => {
          // Suscribirse al canal de mensajes
          this.stompClient.subscribe(`/topic/${roomId}`, (mensajes: any) => {
            const mensajeContenido = JSON.parse(mensajes.body);
            console.log(mensajeContenido);
            observer.next(mensajeContenido);  // Emitir los mensajes a los suscriptores
          });
        },
        (error: any) => {
          observer.error(error); // Si hay un error de conexión
        }
      );
    });
  }

  sendMessage(roomId: string, chatMessage: any) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }


  // Obtener mensajes entre dos usuarios
  obtenerMensajes(usuarioId: number, receptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat/${usuarioId}/${receptorId}`);
  }

  // ✅ Corregir la URL para enviar mensajes
  enviarMensaje(usuarioId: number, receptorId: number, contenido: string, archivo?: File): Observable<any> {
    const formData = new FormData();
    if (contenido) formData.append('contenido', contenido);
    if (archivo) formData.append('archivo', archivo);

    return this.http.post<any>(`${this.apiUrl}/chat/${usuarioId}/${receptorId}`, formData);
  }

  obtenerConversaciones(usuarioId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/conversaciones/${usuarioId}`);
  }
}