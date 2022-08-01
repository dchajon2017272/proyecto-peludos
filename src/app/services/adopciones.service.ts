import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adopciones } from '../models/adopciones.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdopcionesService {
  public url: String = 'https://veterinaria-peludos.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.obtenerToken()
  })
  public identidad;
  public token;
  constructor(public _http: HttpClient) { }

  obtenerToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerAdopciones(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/adopciones', { headers: headersToken} )

  }

agregarAdopciones(modeloAdopciones: Adopciones): Observable<any>{
  let parametros = JSON.stringify(modeloAdopciones);

  return this._http.post(this.url + '/agregarAdopcion', parametros, {headers:this.headersToken})
}

obtenerAdopcionesId(id : String): Observable<any> {

  return this._http.get(this.url + '/adopciones/' + id, { headers: this.headersVariable })
}


editarAdopciones(modeloAdopciones: Adopciones): Observable<any> {
  let parametros = JSON.stringify(modeloAdopciones);

  return this._http.put(this.url + '/editarAdopcion/' + modeloAdopciones._id, parametros, {headers: this.headersVariable})
}

eliminarAdopciones(id : String): Observable<any> {

  return this._http.delete(this.url + '/eliminarAdopcion/' + id, { headers: this.headersVariable })
}
}
