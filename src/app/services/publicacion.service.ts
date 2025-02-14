import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private urlApi = 'http://localhost:9000/api/publicaciones';

  constructor(private http: HttpClient) { }

  publicar(publicacion: {}): Observable<any> {
    console.log('pub', publicacion);
    
    const usuario = localStorage.getItem('usuario');
    // return this.http.post<any>(this.urlApi + '?username=' + usuario, publicacion);
    return this.http.post<any>(this.urlApi + '?username=' + usuario, {
      "texto": "Texto de la publicación",
      "fechaPublicacion": "2023-10-01",
      "contenidos": [
        {
          "tipo": "foto",
          "url": "http://example.com/foto1.jpg"
        }
      ]
    });
  }
}