import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { sucursales } from '../models/sucursales.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public _http: HttpClient) { }

  obtenerSucursales(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/verSucursalesEmpresa', { headers: headersToken })
  }

  obtenerSucursalId(id : String): Observable<any> {

    return this._http.get(this.url + '/verSucursalesEmpresaId/' + id, { headers: this.headersVariable })
  }

  obtenerSucursalesAdmin(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/verSucursalesEmpresa'+id, { headers: headersToken })
  }

  agregarSucursal(modeloSucursal:sucursales, token): Observable<any>{
    let parametros = JSON.stringify(modeloSucursal);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.post(this.url+'/registrarSucursal', parametros, { headers: headersToken })
  }

  editarSucursal(modeloSucursal: sucursales, token): Observable<any> {
    let parametros = JSON.stringify(modeloSucursal);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.put(this.url + '/editarSucursal/' + modeloSucursal._id, parametros, { headers: headersToken})
  }

  eliminarSucursal(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.delete(this.url + '/eliminarSucursal/' + id, { headers: headersToken })
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
