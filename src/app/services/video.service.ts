import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multimedia } from '../interfaces/multimedia';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = 'http://localhost:9000/api/usuarios';

  constructor(private http: HttpClient) { }

  mostrarVideos(): Observable<Multimedia[]>{
    return this.http.get<Multimedia[]>(`${this.apiUrl}/cursos`);
  }

  }

