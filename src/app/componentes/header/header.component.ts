import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  usuario?: string;
  searchQuery: string = '';
  resultadosBusqueda: Usuario[] = [];
  private searchTerms = new Subject<string>();

  constructor(private auth: AuthService, private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(loggedIn => {
      this.logged = loggedIn;
    });
    if (this.logged) {
      this.usuario = localStorage.getItem('usuario') || '';
    }

    this.searchTerms.pipe(
      debounceTime(300), // Espera 300ms después de cada pulsación de tecla
      distinctUntilChanged(), // Ignora si la consulta es la misma que la anterior
      switchMap((term: string) => term.length > 0 ? this.usuarioService.buscarUsuarios(term) : []) // Cambia a una nueva búsqueda observable solo si hay al menos un carácter
    ).subscribe({
      next: (usuarios: Usuario[]) => {
        this.resultadosBusqueda = usuarios;
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    });
  }

  redirectHome(): void {
    if (this.logged) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    if (this.searchQuery.length > 0) {
      this.searchTerms.next(this.searchQuery);
    } else {
      this.resultadosBusqueda = []; // Limpiar resultados si no hay caracteres
    }
  }

  buscarUsuarios(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/resultados-busqueda'], { queryParams: { query: this.searchQuery } });
    }
  }

  verPerfil(username: string): void {
    this.router.navigate(['/perfil', username]);
  }
}
