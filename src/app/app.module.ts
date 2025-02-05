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
import { HeaderComponent } from './componentes/header/header.component';
import { CardComponent } from './componentes/card/card.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { VerticalcardComponent } from './componentes/verticalcard/verticalcard.component';
import { CarruselverticalComponent } from './componentes/carruselvertical/carruselvertical.component';
import { BarrabusquedaComponent } from './componentes/barrabusqueda/barrabusqueda.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { FormularioCuentaComponent } from './componentes/formulario-cuenta/formulario-cuenta.component';
import { LoginComponent } from './componentes/login/login.component';
import { HeadersinbotonesComponent } from './componentes/headersinbotones/headersinbotones.component';

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
    HeaderComponent,
    CardComponent,
    CarruselComponent,
    HomeComponent,
    FooterComponent,
    VerticalcardComponent,
    CarruselverticalComponent,
    BarrabusquedaComponent,
    CursosComponent,
    ChatComponent,
    FormularioCuentaComponent,
    LoginComponent,
    HeadersinbotonesComponent,
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