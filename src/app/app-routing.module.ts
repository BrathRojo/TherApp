import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { FormularioCuentaComponent } from './componentes/formulario-cuenta/formulario-cuenta.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { TerapeutasComponent } from './componentes/terapeutas/terapeutas.component';
import { LoginComponent } from './componentes/login/login.component';
import { ConversacionesComponent } from './componentes/conversaciones/conversaciones.component';
import { ResultadosBusquedaComponent } from './componentes/resultados-busqueda/resultados-busqueda.component';
import { ZonaadminComponent } from './componentes/zonaadmin/zonaadmin.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'index', redirectTo: '' },
  { path: 'perfil/:nombreUsuario', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'terapeutas', component: TerapeutasComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'chat/:usuarioId',component: ConversacionesComponent },
  { path: 'zonaadmin', component: ZonaadminComponent},
  { path: 'cambioCuenta/:modo', component: FormularioCuentaComponent },
  { path: 'login', component: LoginComponent},
  { path: 'validacion', component: RegistroComponent },
  { path: 'resultados-busqueda', component: ResultadosBusquedaComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
