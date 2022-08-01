import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  user: Usuario;

  public usuarioModelGet: Usuario;



  constructor(private _usuarioService: UsuarioService,private _router: Router) {
    this.user = new Usuario(
      "",
      "",
      "",
      0,
      "",
      "",
      ""
    );
   }

  ngOnInit(): void {
  }

  registro(){
    this._usuarioService.register(this.user).subscribe({
      next: (response:any)=>{
        Swal.fire(
          'Registro Completado',
          'Usuario creado correctamente',
          'success'
         )
        //alert('Usuario creado correctamente, ya puedes iniciar sesión con el correo: '+ response.usuario.email)
        localStorage.setItem("identidad", JSON.stringify(response.usuario))

        this._router.navigate(['/pagina-inicio']);
      },
      error: (error)=>alert(error.error.mensaje),
      
    })
  }

}
