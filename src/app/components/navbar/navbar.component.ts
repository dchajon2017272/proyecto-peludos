import { Component, OnInit } from '@angular/core';
import {UsuarioService} from 'src/app/services/usuario.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public identidad; 

  constructor(public _usuarioService: UsuarioService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
    this.identidad = this._usuarioService.obtenerIdentidad;
  }
  ngOnInit(): void {
    console.log(this.identidad)

  }

  logOut(){
    localStorage.clear();
  }

}
