import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { TerapeutasComponent } from './componentes/terapeutas/terapeutas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'index', redirectTo: '' },
  { path: 'home', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'terapeutas', component: PerfilComponent },
  { path: 'admin', component: RegistroComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: RegistroComponent },
  { path: 'validacion', component: RegistroComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
