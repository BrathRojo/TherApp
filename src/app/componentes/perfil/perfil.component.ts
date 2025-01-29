import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  foto: string;
  nombreUsuario: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  presentacion: string;
  ubicacion: string;

  constructor() { 
    this.foto = 'assets/ejemplo.jpg'
    this.nombreUsuario = 'didilombi';
    this.nombre = 'Didier';
    this.apellidos = 'Lombi';
    this.email = 'didier.lombi@iesdoctorbalmis.com';
    this.telefono = '622400809';
    this.fechaNacimiento = new Date('2001-01-29');
    this.presentacion = 'Soy un pelotudo que no sabe hacer nada, pero me gusta sqlear';
    this.ubicacion = 'Alicante';
  }

  ngOnInit() {
  }

}
