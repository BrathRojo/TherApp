import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) { }

  enviarSolicitud(solicitud: {
    email: string;
    apellidos: string;
    nColegiado: string;
    experiencia: string;
    especialidad: string;
    precio: number;
  }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/enviarsolicitud`, solicitud);
  }

  solicitudOrganizacion(solicitud: {
    email: string;
    cif: string;
    direccion: string;
    telefono: string;
    web: string;
  }): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/solicitudorganizacion`, solicitud);
  }

  recibirSolicitudes(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.apiUrl}/recogersolicitudes`);
 
  }

  recibirSolicitudesOrg(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.apiUrl}/recogersolicitudes`);
  }

  aprobarSolicitud(email: string): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/aprobarsolicitud`, email);
  }

  rechazarSolicitud(email: string): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/rechazarsolicitud`, email);
  }
}
