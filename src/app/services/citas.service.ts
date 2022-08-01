import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../models/citas.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
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

  obtenerCitas(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/citas', { headers: headersToken} )

  }

agendarCitas(modeloCitas: Citas): Observable<any>{
  let parametros = JSON.stringify(modeloCitas);

  return this._http.post(this.url + '/agendarCita', parametros, {headers:this.headersToken})
}

cancelarCitas(id : String): Observable<any> {

  return this._http.delete(this.url + '/cancelarCita/' + id, { headers: this.headersVariable })
}

obtenerCitasId(id : String): Observable<any> {

  return this._http.get(this.url + '/citas/' + id, { headers: this.headersVariable })
}


}
