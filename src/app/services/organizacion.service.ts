import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  private apiUrl = 'http://localhost:9000/api/organizaciones';

  constructor(private http: HttpClient) { }
}
