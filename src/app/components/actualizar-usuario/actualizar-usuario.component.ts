import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {
  user;
  token;
  public usuarioModelGet: Usuario;
  
  constructor(    public userRest: UsuarioService
    ) { }

  ngOnInit(): void {
    this.user = this.userRest.obtenerIdentidad();
    this.token = this.userRest.obtenerToken();
  }

  updateUser(){
    this.userRest.updateUser(this.user, this.user._id).subscribe({
      next: (response:any)=>{
        localStorage.setItem('identidad', JSON.stringify(this.user));
        Swal.fire(
          'Actualizado',
          'Usuario actualizado correctamente',
          'success'
         )
      },
      error: (err)=> alert(err.error.mensaje)
      
    })
  }

  deleteUsuarios(idUsuario) {
    this.userRest.eliminarUsuario(idUsuario).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  logOut(){
    localStorage.clear();
  }

}
