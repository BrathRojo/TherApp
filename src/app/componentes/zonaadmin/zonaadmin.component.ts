import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerapeutaService } from '../../services/terapeuta.service';
import { terapeutaMostrable } from '../../interfaces/terapeutaMostrable';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../interfaces/solicitud';
import { OrganizacionService } from '../../services/organizacion.service';
import { solicitudOrganizacion } from '../../interfaces/solicitudOrganizacion';

@Component({
  selector: 'app-zonaadmin',
  templateUrl: './zonaadmin.component.html',
  styleUrls: ['./zonaadmin.component.scss']
})
export class ZonaadminComponent implements OnInit {

  email: String = '';

  constructor(private servicio: TerapeutaService, private organizacionService: OrganizacionService, private usuarioService: UsuarioService, private solicitudService: SolicitudesService
    , private snackBar: MatSnackBar) { }

  @Input() terapeutas: Array<{ nombre: string, apellidos: string, premium: boolean, email: string }> = [];
  @Input() solicitudes: Solicitud[] = [];
  @Input() solicitudesOrg: solicitudOrganizacion[] = [];

  ngOnInit(): void {
      this.cargarDatos();
      this.cargarSolicitudes();
      this.cargarSolicitudesOrg();
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

  cargarSolicitudes(){
    this.solicitudService.recibirSolicitudes().subscribe({
      next:(solicitudes)=>{
        this.solicitudes = solicitudes.map(s=>({
          id: s.id,
          email: s.email,
          apellidos: s.apellidos,
          nColegiado: s.nColegiado,
          experiencia: s.experiencia,
          especialidad: s.especialidad,
          precio: s.precio,
          usuario_id: s.usuario_id
        }));
      },
      error: (err) => console.error('Error al obtener solicitudes:', err)
    })
  }

  cargarSolicitudesOrg(){
    this.organizacionService.recibirSolicitudes().subscribe({
      next:(solicitudesOrg)=>{
        this.solicitudesOrg = solicitudesOrg.map(s=>({
          email:s.email,
          cif: s.cif,
          direccion: s.cif,
          telefono: s.telefono,
          web: s.web
        }));
      },
      error: (err) => console.error('Error al obtener solicitudes:', err)
    })
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

  aprobarSolicitud(email: string){
    if(email){
      this.solicitudService.aprobarSolicitud(email).subscribe(
        response=>{
          console.log('Estado cambiado con éxito');
          this.snackBar.open('Cambio realizado con éxito', 'Cerrar', {duration:3000});
          this.cargarSolicitudes(); // Recargar las solicitudes después de aprobar
        },
        error=>{
          console.log('Error al cambiar el estado');
          this.snackBar.open('Error al realizar el cambio', 'Cerrar', {duration:3000});
        }
      );
    }
  }

  aprobarSolicitudOrg(cif: string, email:string){
      this.organizacionService.aprobarSolicitud(cif, email).subscribe(
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

  rechazarSolicitudOrg(cif: string){
      this.organizacionService.rechazarSolicitud(cif).subscribe(
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

  rechazarSolicitud(email: string){
    if(email){
      this.solicitudService.rechazarSolicitud(email).subscribe(
        response=>{
          console.log('Estado cambiado con éxito');
          this.snackBar.open('Cambio realizado con éxito', 'Cerrar', {duration:3000});
          this.cargarSolicitudes(); // Recargar las solicitudes después de rechazar
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

}
