import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss']
})
export class ResultadosBusquedaComponent implements OnInit {
  searchQuery: string = '';
  resultadosBusqueda: Usuario[] = [];

  constructor(
    private route: ActivatedRoute,
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
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    });
  }
}
