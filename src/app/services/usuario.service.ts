import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String = 'https://veterinaria-peludos.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.obtenerToken()
  })
  
  public identidad;
  public token;

  constructor(public _http: HttpClient) { }

  login(usuario, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
  }

  register(params){
    return this._http.post(this.url + '/agregarUsuarios', params, {headers:this.headersVariable})
  }

  updateUser(params, id){
    return this._http.put(this.url + '/editarUsuario/' + id, params, {headers:this.headersToken})
  }

  obtenerToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }


  obtenerUsuarios(token): Observable<any>{
      let headersToken = this.headersVariable.set('Authorization', token)

      return this._http.get(this.url + '/usuarios', { headers: headersToken} )

  }

  agregarUsuario(params): Observable<any>{
    return this._http.post(this.url + '/agregarUsuarios', params, {headers:this.headersVariable})
  }

  obtenerUsuarioId(id : String): Observable<any> {

    return this._http.get(this.url + '/usuarios/' + id, { headers: this.headersVariable })
  }


  editarUsuarioAdmin(modeloUsuario: Usuario): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.put(this.url + '/editarUsuarioAdmin/' + modeloUsuario._id, parametros, {headers: this.headersVariable})
  }

  eliminarUsuario(id : String): Observable<any> {

    return this._http.delete(this.url + '/eliminarUsuario/' + id, { headers: this.headersVariable })
  }
}
