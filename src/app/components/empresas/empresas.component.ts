import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [ EmpresasService ]
})
export class EmpresasComponent implements OnInit {

  tipos = [
    { nombreTipo: "Restaurante" },
    { nombreTipo: "Distribuidora" },
    { nombreTipo: "Banco" },
    { nombreTipo: "Supermercado" }
  ];

  public token;

  //Usuarios
  public EmpresasModelGet: Usuarios;
  public EmpresaModelPost: Usuarios;
  public EmpresasModelGetId: Usuarios;

  constructor(public _EmpresasService: EmpresasService) {
    this.EmpresaModelPost = new Usuarios('','','','','','',[{nombreProducto: '', nombreProveedor: '', stock:0}]);
    this.EmpresasModelGetId = new Usuarios('','','','','','',[{nombreProducto: '', nombreProveedor: '', stock:0}]);
    this.token = this._EmpresasService.obtenerToken()
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this._EmpresasService.obtenerEmpresas(this._EmpresasService.obtenerToken()).subscribe(
      (response) => {
        this.EmpresasModelGet = response.empresas;
        console.log(this.EmpresasModelGet);

      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })
      }
    )
  }

  getEmpresasId(idEmpresa){
    this._EmpresasService.obtenerEmpresaId(idEmpresa, this._EmpresasService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.EmpresasModelGetId = response.empresa;
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })
      }
    )
  }

  putEmpresas(){
    this._EmpresasService.editarEmpresas(this.EmpresasModelGetId, this._EmpresasService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })
      }
    )
  }


  postEmpresas(){
    this._EmpresasService.agregarEmpresasAdmin(this.EmpresaModelPost, this._EmpresasService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })
      }
    )
  }

  deleteEmpresas(idEmpresa){
    this._EmpresasService.eliminarEmpresa(idEmpresa, this._EmpresasService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })

      }
    )
  }

}
