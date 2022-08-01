import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]

})
export class UsuariosComponent implements OnInit {

  public usuarioModelGet: Usuario;
  public usuarioModelPost: Usuario;
  public usuarioModelGetId: Usuario;
  public identidad = localStorage.getItem('identidad');

  public token;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModelPost = new Usuario('','','',0,'','','');
    this.usuarioModelGetId = new Usuario('','','',0,'','','');

    this.token = this._usuarioService.obtenerToken();  
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    
    this._usuarioService.obtenerUsuarios(this.token).subscribe(
      (response)=>{
        this.usuarioModelGet = response.usuarios;
        console.log(this.usuarioModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )

  }

  postUsuarios(){
    this._usuarioService.agregarUsuario(this.usuarioModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getUsuarios();
      },
      (error)=>{
        console.log(<any>error);
      }
    )

  }

  getUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      (response) => {
        console.log(response);
        this.usuarioModelGetId = response.usuario;

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
  

  putUsuarios(){
    this._usuarioService.editarUsuarioAdmin(this.usuarioModelGetId).subscribe(
      (response)=>{
        
        console.log(response);
        this.getUsuarios()
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteUsuarios(idUsuario) {
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      (response)=>{
        console.log(response);
        this.getUsuarios();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
}
