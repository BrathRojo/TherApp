import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { HomeComponent } from './componentes/home/home.component';
import { TerapeutasComponent } from './componentes/terapeutas/terapeutas.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { ChatComponent } from './componentes/chat/chat.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'terapeutas', component: TerapeutasComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'chat/:usuarioId/:receptorId', component: ChatComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
