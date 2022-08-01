import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
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

  obtenerProductos(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/productos', { headers: headersToken} )

}

agregarProductos(modeloProductos: Productos): Observable<any>{
  let parametros = JSON.stringify(modeloProductos);

  return this._http.post(this.url + '/agregarProducto', parametros, {headers:this.headersToken})
}

obtenerProductosId(id : String): Observable<any> {

  return this._http.get(this.url + '/productos/' + id, { headers: this.headersVariable })
}


editarProductos(modeloProductos: Productos): Observable<any> {
  let parametros = JSON.stringify(modeloProductos);

  return this._http.put(this.url + '/editarProducto/' + modeloProductos._id, parametros, {headers: this.headersVariable})
}

eliminarProductos(id : String): Observable<any> {

  return this._http.delete(this.url + '/eliminarProducto/' + id, { headers: this.headersVariable })
}
}
