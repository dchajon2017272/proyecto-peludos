import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Adopciones } from 'src/app/models/adopciones.models';
import { AdopcionesService } from 'src/app/services/adopciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.scss'],
  providers: [AdopcionesService]

})
export class AdopcionesComponent implements OnInit {
  public adopcionModelGet: Adopciones;
  public adopcionModelPost: Adopciones;
  public adopcionModelGetId: Adopciones;
  public token;
  public search;
  constructor(private _adopcionesService: AdopcionesService,private _usuarioService: UsuarioService) {
    this.adopcionModelPost = new Adopciones('','','','','','','','');
    this.adopcionModelGetId = new Adopciones('','','','','','','','');

    this.token = this._adopcionesService.obtenerToken();

   }

  ngOnInit(): void {
    this.getAdopciones();
  }

  getAdopciones() {
    
    this._adopcionesService.obtenerAdopciones(this.token).subscribe(
      (response)=>{
        this.adopcionModelGet = response.adopciones;
        console.log(this.adopcionModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )

  }

  postAdopciones(){
    this._adopcionesService.agregarAdopciones(this.adopcionModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getAdopciones();
      },
      (error)=>{
        console.log(<any>error);
      }
    )

  }


  getAdopcionesId(idAdopcion){
    this._adopcionesService.obtenerAdopcionesId(idAdopcion).subscribe(
      (response) => {
        console.log(response);
        this.adopcionModelGetId = response.mascota;

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
  

  putAdopciones(){
    this._adopcionesService.editarAdopciones(this.adopcionModelGetId).subscribe(
      (response)=>{
        
        console.log(response);
        this.getAdopciones()
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteAdopciones(idAdopcion) {
    this._adopcionesService.eliminarAdopciones(idAdopcion).subscribe(
      (response)=>{
        console.log(response);
        this.getAdopciones();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }


}
