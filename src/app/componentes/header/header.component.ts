import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  logged: boolean = false;

  usuario?: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(loggedIn => {
      this.logged = loggedIn;
    });
    if (this.logged) {
      this.usuario = localStorage.getItem('usuario') || '';
    }
  }

  redirectHome(): void {
    if (this.logged) {
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
