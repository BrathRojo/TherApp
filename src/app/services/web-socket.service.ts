import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private mensajesSubject = new BehaviorSubject<string[]>([]);
  public mensajes$: Observable<string[]> = this.mensajesSubject.asObservable();

  constructor() {
    this.conectar();
  }

  conectar() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('Conectado al WebSocket');
      this.stompClient.subscribe('/topic/mensajes', (mensaje: any) => {
        const cuerpo = JSON.parse(mensaje.body);
        this.mensajesSubject.next([...this.mensajesSubject.value, cuerpo]);
      });
    });
  }

  enviarMensaje(mensaje: string) {
    this.stompClient.send('/app/mensaje', {}, JSON.stringify(mensaje));
  }
}
