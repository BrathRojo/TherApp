import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private estadoSubject = new BehaviorSubject<boolean>(false);
  estado$ = this.estadoSubject.asObservable();  // 🔍 Cualquier componente puede suscribirse

  setEstado(valor: boolean) {
    this.estadoSubject.next(valor);  // 🔥 Cambia el estado
  }

  getEstado(): boolean {
    return this.estadoSubject.value; // ✅ Obtiene el estado actual (sin suscripción)
  }
}
