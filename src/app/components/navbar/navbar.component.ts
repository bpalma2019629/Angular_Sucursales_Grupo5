import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ EmpresasService ]
})
export class NavbarComponent implements OnInit {

  public identidad;
  public usuario;

  constructor(public _EmpresasService: EmpresasService) {
    this.identidad = this._EmpresasService.obtenerIdentidad();
   }


  ngOnInit(): void {
    this.usuario = this._EmpresasService.obtenerIdentidad().usuario;
  }

  logOut(){
    localStorage.clear();
  }

}
