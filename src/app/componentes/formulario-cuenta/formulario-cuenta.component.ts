import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrl: './formulario-cuenta.component.scss'
})
export class FormularioCuentaComponent implements OnInit {

  registroForm: FormGroup;
  modoCambio: string = '';
  nombreUsuario: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private usuarioService: UsuarioService) {
    this.registroForm = this.fb.group({
      nombre: [this.nombreUsuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      numeroColegiado: [''],
      experiencia: [''],
      especialidad: [''],
      
      cif: [''],
      direccion: [''],
      telefono: [''],
      web: ['']
    });
  }

  formatCodigo(): void {
    let value = this.registroForm.get('numeroColegiado')?.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    this.registroForm.get('numeroColegiado')?.setValue(value, { emitEvent: false });
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
      this.registroForm.get('numeroColegiado')?.setValidators([Validators.required, Validators.pattern('^[A-Z]{1,2}-[0-9]{1,5}$'), Validators.maxLength(8)]);
      this.registroForm.get('especialidad')?.setValidators([Validators.required]);
    }
    else {
      this.registroForm.get('cif')?.setValidators([Validators.required]);
      this.registroForm.get('direccion')?.setValidators([Validators.required]);
      this.registroForm.get('telefono')?.setValidators([Validators.required]);
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Datos del formulario:', this.registroForm.value);
    }
  }
}
