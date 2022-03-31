import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios.model';
import { EmpresasService } from 'src/app/services/empresas.service';

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

  //Usuarios
  public EmpresasModelGet: Usuarios;
  public EmpresaModelPost: Usuarios;

  constructor(private _EmpresasService: EmpresasService) {
    this.EmpresaModelPost = new Usuarios('','','','','','',[{nombreProducto: '', nombreProveedor: '', stock:0}]);
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this._EmpresasService.obtenerEmpresas().subscribe(
      (response) => {
        this.EmpresasModelGet = response.mensaje;
        console.log(this.EmpresasModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postEmpresas(){
    this._EmpresasService.agregarEmpresas(this.EmpresaModelPost).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
