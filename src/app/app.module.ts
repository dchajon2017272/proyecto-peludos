import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { CitasComponent } from './components/citas/citas.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { VerCitaComponent } from './components/ver-cita/ver-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    PaginaInicioComponent,
    UsuariosComponent,
    ProductosComponent,
    MascotasComponent,
    AdopcionesComponent,
    CitasComponent,
    ActualizarUsuarioComponent,
    VerCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
