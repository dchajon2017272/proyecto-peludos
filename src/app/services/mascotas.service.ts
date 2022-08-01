import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascotas } from '../models/mascotas.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
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

  obtenerMascotas(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/mascotas', { headers: headersToken} )

  }

agregarMascotas(modeloMascotas: Mascotas): Observable<any>{
  let parametros = JSON.stringify(modeloMascotas);

  return this._http.post(this.url + '/agregarMascota', parametros, {headers:this.headersToken})
}

obtenerMascotasId(id : String): Observable<any> {

  return this._http.get(this.url + '/mascotas/' + id, { headers: this.headersVariable })
}


editarMascotas(modeloMascotas: Mascotas): Observable<any> {
  let parametros = JSON.stringify(modeloMascotas);

  return this._http.put(this.url + '/editarMascota/' + modeloMascotas._id, parametros, {headers: this.headersVariable})
}

eliminarMascotas(id : String): Observable<any> {

  return this._http.delete(this.url + '/eliminarMascota/' + id, { headers: this.headersVariable })
}

}
