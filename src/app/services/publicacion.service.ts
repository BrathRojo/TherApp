import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = `${environment.apiUrl}/publicaciones`;

  constructor(private http: HttpClient) {}

  crearPublicacion(formData: FormData): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.apiUrl, formData);
  }

  obtenerPublicaciones(id: number): Observable<Publicacion[]> {
    const url = `${this.apiUrl}/buscarpublicaciones/${id}`;
    console.log("URL enviada desde Angular:", url);  // 👈 DEBUG
    return this.http.get<Publicacion[]>(`${this.apiUrl}/buscarpublicaciones/${id}`);
  }
}
