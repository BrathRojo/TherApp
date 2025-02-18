import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerapeutaService } from '../../services/terapeuta.service';
import { terapeutaMostrable } from '../../interfaces/terapeutaMostrable';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zonaadmin',
  templateUrl: './zonaadmin.component.html',
  styleUrl: './zonaadmin.component.scss'
})
export class ZonaadminComponent implements OnInit{

  email: String = '';

  constructor(private servicio: TerapeutaService, private usuarioService: UsuarioService, private snackBar: MatSnackBar) { }

  @Input() terapeutas: Array<{ nombre: string, apellidos: string, premium: boolean, email: string }> = [];

  ngOnInit(): void {
      this.cargarDatos();
  }

  cargarDatos() {
    this.servicio.getTerapeutasParaMostrar().subscribe({
      next: (terapeutas) => {
        this.terapeutas = terapeutas.map(t => ({
          nombre: t.nombre,
          apellidos: t.apellidos,
          premium: t.premium,
          email: t.email
        }));
      },
      error: (err) => console.error('Error al obtener terapeutas:', err)
    });
  }

  cambiarPremium(email: string){
    if(email){
      this.servicio.cambiarPremium(email).subscribe(
        response=>{
          console.log('Estado cambiado con éxito');
          this.snackBar.open('Cambio realizado con éxito', 'Cerrar', {duration:3000});
          this.cargarDatos();
        },
        error=>{
          console.log('Error al cambiar el estado');
          this.snackBar.open('Error al realizar el cambio', 'Cerrar', {duration:3000});
        }
      );
    }
  }


  onSubmit(){
    if(this.email){
      this.usuarioService.hacerAdmin(this.email).subscribe(
        response=>{
          console.log('Permisos concedidos con éxito');
          this.snackBar.open('Cambio realizado con éxito', 'Cerrar', {duration:3000});
          document.getElementById('email')!.innerText = '';
        },
        error=>{
          console.error('Error al conceder los permisos', error);
          this.snackBar.open('Error al realizar el cambio', 'Cerrar', {duration:3000});
        }
      );
    }
  }

  accordionItems = [
    { id: 1, title: 'Accordion Item #1', content: 'Este es el contenido del primer ítem.' },
    { id: 2, title: 'Accordion Item #2', content: 'Este es el contenido del segundo ítem.' },
    { id: 3, title: 'Accordion Item #3', content: 'Este es el contenido del tercer ítem.' }
  ];
}
