import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { productosSucursales } from '../models/productosSucursal.model';

@Injectable({
  providedIn: 'root'
})

export class ProductosSucursalService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }

  obtenerProductos(id : String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/verProductosSucursales/'+ id, { headers: headersToken })
  }

  eliminarProducto(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.delete(this.url + '/eliminarProductosSucursales/' + id, { headers: headersToken })
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

  obtenerProductoId(id : String): Observable<any> {

    return this._http.get(this.url + '/verProductosSucuralesId/' + id, { headers: this.headersVariable })
  }

  vender(id : String, modeloProducto: productosSucursales, token): Observable<any> {
    let parametros = JSON.stringify(modeloProducto);
    console.log(parametros)
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.put(this.url + '/venta/' + id,parametros, { headers: headersToken })
  }

  obtenerProductosNombre(nombre: String, id:String, token): Observable<any>{
    console.log(token)
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/productoSucursalNombre/'+nombre+'/'+id, { headers: headersToken })
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


}
