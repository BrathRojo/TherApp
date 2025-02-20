import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multimedia } from '../interfaces/multimedia';
import { Publicacion } from '../interfaces/publicacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  mostrarVideos(): Observable<Multimedia[]>{
    return this.http.get<Multimedia[]>(`${this.apiUrl}/cursos`);
  }

  }

