import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  public identidad; 
  constructor(
    private _router: Router
  ){}

  canActivate(){
    let identidad2 = this.obtenerIdentidad();

    if(identidad2.rol === 'Cliente' ){
      Swal.fire(
       'Acceso No Permitido',
       'Un cliente no puede acceder a esta sección',
       'error'
      )
      return false;
    }

    return true;
  }
  
  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  
}
