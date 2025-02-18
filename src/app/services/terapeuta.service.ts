import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Terapeuta } from '../interfaces/terapeuta';
import { terapeutaMostrable } from '../interfaces/terapeutaMostrable';

@Injectable({
  providedIn: 'root'
})
export class TerapeutaService {
  private apiUrl = 'http://localhost:9000/api/terapeutas'; // Asegúrate de que coincide con tu backend

  constructor(private http: HttpClient) {}

  getAllTerapeutas(): Observable<Terapeuta[]> {
    return this.http.get<Terapeuta[]>(this.apiUrl);
  }

  getTerapeutaById(id: number): Observable<Terapeuta> {
    return this.http.get<Terapeuta>(`${this.apiUrl}/${id}`);
  }

  addTerapeuta(terapeuta: Terapeuta): Observable<Terapeuta> {
    return this.http.post<Terapeuta>(this.apiUrl, terapeuta);
  }

  updateTerapeuta(id: number, terapeuta: Terapeuta): Observable<Terapeuta> {
    return this.http.put<Terapeuta>(`${this.apiUrl}/${id}`, terapeuta);
  }

  deleteTerapeuta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTerapeutasParaMostrar(): Observable<terapeutaMostrable[]>{
    return this.http.get<terapeutaMostrable[]>(`${this.apiUrl}/terapeutas`);
  }

  cambiarPremium(email: string): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/cambiarPremium`, email);
  }
}
