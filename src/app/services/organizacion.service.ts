import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { solicitudOrganizacion } from '../interfaces/solicitudOrganizacion';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  private apiUrl = 'http://localhost:9000/api/organizaciones';

  constructor(private http: HttpClient) { }

  solicitudOrganizacion(solicitud: {
      email: string;
      cif: string;
      direccion: string;
      telefono: string;
      web: string;
    }): Observable<void>{
      return this.http.post<void>(`${this.apiUrl}/solicitudorganizacion`, solicitud);
    }

    recibirSolicitudes(): Observable<solicitudOrganizacion[]>{
      return this.http.get<solicitudOrganizacion[]>(`${this.apiUrl}/recogersolicitudes`);
    }

    aprobarSolicitud(cif: string, email: string): Observable<void>{
      return this.http.post<void>(`${this.apiUrl}/aprobarsolicitud`, {cif, email});
    }
  
    rechazarSolicitud(email: string): Observable<void>{
      return this.http.post<void>(`${this.apiUrl}/rechazarsolicitud`, email);
    }
}
