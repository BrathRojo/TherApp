import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscripcionComponent } from './componentes/subscripcion/subscripcion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { TerapeutasComponent } from './componentes/terapeutas/terapeutas.component';
import { FormularioCuentaComponent } from './componentes/formulario-cuenta/formulario-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    SubscripcionComponent,
    InicioComponent,
    NotFoundComponent,
    PublicacionComponent,
    PerfilComponent,
    TerapeutasComponent,
    FormularioCuentaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }