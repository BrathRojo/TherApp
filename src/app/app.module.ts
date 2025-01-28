import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscripcionComponent } from './componentes/subscripcion/subscripcion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    SubscripcionComponent,
    InicioComponent,
    NotFoundComponent,
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