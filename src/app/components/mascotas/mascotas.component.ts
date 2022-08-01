import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Mascotas } from 'src/app/models/mascotas.models';
import { MascotasService } from 'src/app/services/mascotas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
  providers: [MascotasService]

})
export class MascotasComponent implements OnInit {
  
  public mascotaModelGet: Mascotas;
  public mascotaModelPost: Mascotas;
  public mascotaModelGetId: Mascotas;
  public token;
  public search;

  constructor(private _mascotasService: MascotasService,private _usuarioService: UsuarioService) { 
    this.mascotaModelPost = new Mascotas('','','','');
    this.mascotaModelGetId = new Mascotas('','','','');

    this.token = this._mascotasService.obtenerToken();

  }

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas() {
    
    this._mascotasService.obtenerMascotas(this.token).subscribe(
      (response)=>{
        this.mascotaModelGet = response.mascotas;
        console.log(this.mascotaModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )

  }

  postMascotas(){
    this._mascotasService.agregarMascotas(this.mascotaModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getMascotas();
      },
      (error)=>{
        console.log(<any>error);
      }
    )

  }


  getMascotasId(idMascota){
    this._mascotasService.obtenerMascotasId(idMascota).subscribe(
      (response) => {
        console.log(response);
        this.mascotaModelGetId = response.mascota;

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
  

  putMascotas(){
    this._mascotasService.editarMascotas(this.mascotaModelGetId).subscribe(
      (response)=>{
        
        console.log(response);
        this.getMascotas()
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteMascotas(idMascota) {
    Swal.fire({
      title: '¿Estas Seguro que quieres eliminar esta Mascota?',
      text: "¡Esto no puede revertirse!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5271FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
    this._mascotasService.eliminarMascotas(idMascota).subscribe(
      (response)=>{
        console.log(response);
        this.getMascotas();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
    Swal.fire(
      'Eliminado',
      'La mascota ha sido eliminada con éxito',
      'success'
      
    )
  }
})
  }

}
