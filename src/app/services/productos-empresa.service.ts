import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { productos } from '../models/productosEmpresa.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosEmpresaService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) { }

  obtenerProductos(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/verProductosEmpresa', { headers: headersToken })
  }

  obtenerProductoId(id : String): Observable<any> {

    return this._http.get(this.url + '/verProductosEmpresa/' + id, { headers: this.headersVariable })
  }

  agregarProducto(modeloProducto:productos, token): Observable<any>{
    let parametros = JSON.stringify(modeloProducto);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.post(this.url+'/agregarProducto', parametros, { headers: headersToken })
  }

  editarProducto(modeloProducto: productos, token): Observable<any> {
    let parametros = JSON.stringify(modeloProducto);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.put(this.url + '/editarProducto/' + modeloProducto._id, parametros, { headers: headersToken})
  }

  eliminarProducto(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.delete(this.url + '/eliminarProducto/' + id, { headers: headersToken })
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

}
