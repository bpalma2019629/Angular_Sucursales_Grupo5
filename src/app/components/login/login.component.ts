import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Usuarios } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmpresasService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuarios;

  tipos = [
    { nombreTipo: "Restaurante" },
    { nombreTipo: "Distribuidora" },
    { nombreTipo: "Banco" },
    { nombreTipo: "Supermercado" }
  ];


  constructor(
    private _EmpresasService:EmpresasService,
    private _router: Router
  ) {
    this.usuarioModel = new Usuarios(
      "",
      "",
      "",
      "",
      "",
      "",
      [{
        nombreProducto: "",
        nombreProveedor: "",
        stock: 0,
      }]
    )
  }

  ngOnInit(): void {
  }

  getToken(){
    this._EmpresasService.login(this.usuarioModel, "true").subscribe(
      (response)=>{
        console.log(response);
        localStorage.setItem("token", response.token)

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject)=>{
      this._EmpresasService.login(this.usuarioModel, "true").subscribe(
        (response)=>{
          // console.log(response);
          localStorage.setItem("token", response.token)
          resolve(response);
        },
        (error)=>{
          console.log(<any>error);

        }
      )
    })
  }

  login(){
    this._EmpresasService.login(this.usuarioModel, "false").subscribe(
      (response)=>{
        this.getTokenPromesa().then(respuesta=>{
          localStorage.setItem("identidad", JSON.stringify(response.usuario))

          if(this._EmpresasService.obtenerIdentidad().rol=="Admin"){
            this._router.navigate(['/empresas']);
          }else{
            this._router.navigate(['/dashboard']);
          }
        })

      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  postEmpresas(){
    this._EmpresasService.agregarEmpresas(this.usuarioModel).subscribe(
      (response)=>{
        console.log(response);

        const currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
