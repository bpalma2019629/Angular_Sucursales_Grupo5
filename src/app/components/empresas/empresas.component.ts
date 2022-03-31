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

  //Usuarios
  public EmpresasModelGet: Usuarios;

  constructor(private _EmpresasService: EmpresasService) {

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

}
