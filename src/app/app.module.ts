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
import { TerapeutasComponent } from './componentes/terapeutas/terapeutas.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CardComponent } from './componentes/card/card.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { VerticalcardComponent } from './componentes/verticalcard/verticalcard.component';
import { CarruselverticalComponent } from './componentes/carruselvertical/carruselvertical.component';
import { BarrabusquedaComponent } from './componentes/barrabusqueda/barrabusqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    SubscripcionComponent,
    InicioComponent,
    NotFoundComponent,
    PublicacionComponent,
    TerapeutasComponent,
    HeaderComponent,
    CardComponent,
    CarruselComponent,
    HomeComponent,
    FooterComponent,
    VerticalcardComponent,
    CarruselverticalComponent,
    BarrabusquedaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }