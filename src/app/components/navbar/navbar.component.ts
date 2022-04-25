import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public identidad;

  constructor(public _EmpresasService: EmpresasService) {
    this.identidad = this._EmpresasService.obtenerIdentidad();
   }


  ngOnInit(): void {
  }

}
