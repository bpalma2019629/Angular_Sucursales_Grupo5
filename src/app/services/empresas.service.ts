import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios.model'

@Injectable({
  providedIn: 'root'
})


export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad;
  public token;

  constructor(public _http: HttpClient) { }

  login(empresa, obtenerToken = null): Observable<any> {
    if(obtenerToken != null){
      empresa.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(empresa);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
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

  obtenerEmpresas(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/empresas', { headers: headersToken })
  }

  agregarEmpresas(modeloUsuario: Usuarios): Observable<any>{
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url+'/registrar', parametros, {headers: this.headersVariable})
  }

  editarEmpresas(modeloUsuario: Usuarios, token): Observable<any>{
    let parametros = JSON.stringify(modeloUsuario);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.put(this.url+'/editarUsuario/'+modeloUsuario._id, parametros, {headers: headersToken})
  }

  agregarEmpresasAdmin(modeloUsuario: Usuarios, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization',token)
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url+'/agregarEmpresa', parametros, {headers: headersToken})
  }

  eliminarEmpresa(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.delete(this.url + '/eliminarUsuario/' + id, { headers: headersToken })
  }

  obtenerEmpresaId(id : String, token): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization',token)

    return this._http.get(this.url + '/empresaId/' + id, { headers: headersToken  })
  }
}
