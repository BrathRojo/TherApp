import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headersinbotones',
  templateUrl: './headersinbotones.component.html',
  styleUrl: './headersinbotones.component.scss'
})
export class HeadersinbotonesComponent {

  constructor(private router: Router) { }

  redirectHome(): void {
      this.router.navigate(['/']);
  }

}
