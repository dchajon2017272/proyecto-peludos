import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Citas } from 'src/app/models/citas.models';
import { CitasService } from 'src/app/services/citas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  providers: [CitasService]

})
export class CitasComponent implements OnInit {
  public citaModelGet: Citas;
  public citaModelPost: Citas;
  public token;
  public search;
  constructor(private _citasService: CitasService,private _usuarioService: UsuarioService) { 
    this.citaModelPost = new Citas('','','','','','','','','','');

    this.token = this._citasService.obtenerToken();
  }

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas() {
    this._citasService.obtenerCitas(this.token).subscribe(
      (response)=>{
        this.citaModelGet = response.citas;
        console.log(this.citaModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postCitas(){
    Swal.fire({
      title: 'Tú cita será programada',
      text: "Estás de acuerdo con los Términos y Condiciones?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5271FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy de acuerdo'
    }).then((result) => {
      if (result.isConfirmed) {
    this._citasService.agendarCitas(this.citaModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getCitas();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
    Swal.fire(
      'Realizada',
      'Tu cita ha sido agendada con éxito, deberás de mostrar este comprobante para el día de tu cita.',
      'success'
    )
  }
})
  }

  deleteCitas(idCita) {
    Swal.fire({
      title: '¿Estas Seguro que quieres cancelar la Cita?',
      text: "¡Esto no puede revertirse!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5271FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
    this._citasService.cancelarCitas(idCita).subscribe(
      (response)=>{
        console.log(response);
        this.getCitas();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
    Swal.fire(
      'Cancelada',
      'La cita ha sido cancelada',
      'success'
      
    )
  }
})
  }
}
