import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { CitasComponent } from './components/citas/citas.component';
import { LoginComponent } from './components/login/login.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { UsuarioGuard } from './services/usuario.guard';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { VerCitaComponent } from './components/ver-cita/ver-cita.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pagina-inicio', component: PaginaInicioComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate:[UsuarioGuard]},
  { path: 'productos', component: ProductosComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'adopciones', component: AdopcionesComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'actualizar-usuario',component: ActualizarUsuarioComponent},
  { path: 'verCitas/:idCita', component: VerCitaComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
