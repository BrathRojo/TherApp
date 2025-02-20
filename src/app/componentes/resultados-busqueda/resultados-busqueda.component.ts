import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  searchQuery: string = '';
  resultadosBusqueda: Usuario[] = [];
  seguidoresComunes: { [key: string]: Usuario[] } = {};
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.buscarUsuarios();
      }
    });
  }

  buscarUsuarios(): void {
    this.usuarioService.buscarUsuarios(this.searchQuery).subscribe({
      next: (usuarios: Usuario[]) => {
        this.resultadosBusqueda = usuarios;
        this.resultadosBusqueda.forEach(usuario => {
          this.obtenerSeguidoresComunes(usuario.id);
        });
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    });
  }

  obtenerSeguidoresComunes(buscadoId: number): void {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    this.usuarioService.obtenerSeguidoresComunes(usuarioId, buscadoId).subscribe({
      next: (seguidores: Usuario[]) => {
        this.seguidoresComunes[buscadoId] = seguidores;
      },
      error: (error) => {
        console.error('Error al obtener seguidores comunes:', error);
      }
    });
  }

  getSeguidoresComunesText(usuarioId: number): string {
    const seguidores = this.seguidoresComunes[usuarioId];
    if (!seguidores || seguidores.length === 0) {
      return '';
    }
    const nombres = seguidores.slice(0, 2).map(s => s.username).join(', ');
    const restantes = seguidores.length > 2 ? ` y ${seguidores.length - 2} personas más siguen a este usuario` : '';
    return `${nombres}${restantes}`;
  }

  verPerfil(username: string): void {
    this.router.navigate(['/perfil', username]);
  }
}
