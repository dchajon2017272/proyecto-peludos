import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { Citas } from 'src/app/models/citas.models';

@Component({
  selector: 'app-ver-cita',
  templateUrl: './ver-cita.component.html',
  styleUrls: ['./ver-cita.component.scss'],
  providers: [CitasService]

})
export class VerCitaComponent implements OnInit {
  date: any;
  load: boolean = false; 

  public citaModelGetId: Citas;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _citasService: CitasService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idCita'));
      this.getCitaId(dataRuta.get('idCita'));
    })
  }

  getCitaId(idCita){
    this._citasService.obtenerCitasId(idCita).subscribe({
      next:(response:any)=>{
        this.date = response.cita;
        this.load = true;
      },
      error:(err)=>alert(err.error.mensaje)
    })
  }

}
