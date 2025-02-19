import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrl: './formulario-cuenta.component.scss'
})
export class FormularioCuentaComponent implements OnInit {

  registroForm: FormGroup;
  modoCambio: string = '';
  nombreUsuario: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private usuarioService: UsuarioService, private solicitudService: SolicitudesService) {
    this.registroForm = this.fb.group({
      nombre: [this.nombreUsuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      nColegiado: [''],
      experiencia: [''],
      especialidad: [''],
      precio: [''],
      apellidos: [''],
      email: [''],
      
      cif: [''],
      direccion: [''],
      telefono: [''],
      web: ['']
    });
  }

  formatCodigo(): void {
    let value = this.registroForm.get('nColegiado')?.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    this.registroForm.get('nColegiado')?.setValue(value, { emitEvent: false });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.modoCambio = params['modo'];
    });

    this.usuarioService.getNombreUsuario().subscribe(
      //del backend viene el usuario y una lista de las especialidades 
      (data: { nombre: string }) => {
        this.nombreUsuario = data.nombre;
      },
      error => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );

    if (this.modoCambio === "terapeuta") {
      this.registroForm.get('email')?.setValidators([Validators.required]);
      this.registroForm.get('nColegiado')?.setValidators([Validators.required, Validators.pattern('^[A-Z]{1,2}-[0-9]{1,5}$'), Validators.maxLength(8)]);
      this.registroForm.get('especialidad')?.setValidators([Validators.required]);
      this.registroForm.get('experiencia')?.setValidators([Validators.required]);
      this.registroForm.get('precio')?.setValidators([Validators.required]);
      this.registroForm.get('apellidos')?.setValidators([Validators.required]);
    }
    else {
      this.registroForm.get('cif')?.setValidators([Validators.required]);
      this.registroForm.get('direccion')?.setValidators([Validators.required]);
      this.registroForm.get('telefono')?.setValidators([Validators.required]);
    }
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      console.log("Formulario inválido");
      return;
    }
  
    const solicitud = {
      email: this.registroForm.get('email')?.value,
      apellidos: this.registroForm.get('apellidos')?.value,
      nColegiado: this.registroForm.get('nColegiado')?.value,
      experiencia: this.registroForm.get('experiencia')?.value,
      especialidad: this.registroForm.get('especialidad')?.value,
      precio: this.registroForm.get('precio')?.value
      
    };

    const solicitudOrg = {
      email: this.registroForm.get('email')?.value,
      cif: this.registroForm.get('cif')?.value,
      direccion: this.registroForm.get('direccion')?.value,
      telefono: this.registroForm.get('telefono')?.value,
      web: this.registroForm.get('web')?.value
    };
    
    if(solicitud != null){
      this.solicitudService.enviarSolicitud(solicitud).subscribe({
        next: () => {
          console.log("Solicitud enviada con éxito");
        },
        error: (error) => {
          console.error("Error al enviar la solicitud:", error);
        }
      });
    }
    else{
      this.solicitudService.solicitudOrganizacion(solicitudOrg).subscribe({
        next: ()=>{
          console.log("Solicitud enviada con éxito");
        },
        error: (error) => {
          console.error("Error al enviar la solicitud:", error);
        }
      });
    }
  }
}
