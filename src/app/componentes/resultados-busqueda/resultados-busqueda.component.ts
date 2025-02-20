import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { SeguidoresService } from '../../services/seguidores.service';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  searchQuery: string = '';
  resultadosBusqueda: Usuario[] = [];
  seguidoresComunes: { [key: string]: Usuario[] } = {};
  siguiendo: { usuarioId: number, seguido: boolean }[] = [];
  nombreUsuarioLogueado?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private seguidorService: SeguidoresService
  ) {}

  ngOnInit(): void {
    this.nombreUsuarioLogueado = localStorage.getItem('usuario')!;

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
          this.seguidorService.estaSiguiendo(Number(localStorage.getItem('usuarioId'))!, usuario.id).subscribe(seguir => {
            this.siguiendo.push({usuarioId: usuario.id, seguido: seguir});
          });
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

  seguir(id: number) {
    this.seguidorService.seguirUsuario(Number(localStorage.getItem('usuarioId'))!, id).subscribe(() => {
      const usuarioSeguido = this.siguiendo.find(u => u.usuarioId === id);
      if (usuarioSeguido) {
        usuarioSeguido.seguido = true;
      } else {
        this.siguiendo.push({ usuarioId: id, seguido: true });
      }
    });
  }
  

  dejarDeSeguir(id: number) {
    this.seguidorService.dejarDeSeguirUsuario(Number(localStorage.getItem('usuarioId'))!, id).subscribe(() => {
      const usuarioSeguido = this.siguiendo.find(u => u.usuarioId === id);
      if (usuarioSeguido) {
        usuarioSeguido.seguido = false;
      }
    });
  }
  

  getEstaSiguiendo(usuarioId: number) {
    const esSeguidor = this.siguiendo.find(m => m.usuarioId === usuarioId);
    return esSeguidor?.seguido;
  }
}
