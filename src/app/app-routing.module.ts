import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { FormularioCuentaComponent } from './componentes/formulario-cuenta/formulario-cuenta.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { ChatComponent } from './componentes/chat/chat.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'index', redirectTo: '' },
  { path: 'home', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'terapeutas', component: PerfilComponent },
  { path: 'admin', component: RegistroComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'terapeutas', component: TerapeutasComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'chat/:usuarioId/:terapeutaId',component: ChatComponent },
  { path: 'cambioCuenta/:modo', component: FormularioCuentaComponent },
  { path: 'login', component: RegistroComponent },
  { path: 'validacion', component: RegistroComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
