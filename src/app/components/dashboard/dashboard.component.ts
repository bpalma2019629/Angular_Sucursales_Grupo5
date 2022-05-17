import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sucursales } from 'src/app/models/sucursales.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  municipios = [
    {nombre: 'Amatitlan'},
    {nombre: 'Chinautla'},
    {nombre: 'Chuarrancho'},
    {nombre: 'Ciudad de Guatemala'},
    {nombre: 'Fraijanes'},
    {nombre: 'Mixco'},
    {nombre: 'Palencia'},
    {nombre: 'San Jose del Golfo'},
    {nombre: 'San Jose Pinula'},
    {nombre: 'San Juan Sacatepequez'},
    {nombre: 'San Miguel Petapa'},
    {nombre: 'San Pedro Ayampuc'},
    {nombre: 'San Pedro Sacatepequez'},
    {nombre: 'San Raymundo'},
    {nombre: 'Santa Catarina Pinula'},
    {nombre: 'Villa Canales'},
    {nombre: 'Villa Nueva'}
  ]

  public sucursalesModelGet: sucursales;
  public sucursalesModelPost: sucursales;
  public sucursalesModelGetId: sucursales;
  public token;

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router) {
    this.sucursalesModelPost = new sucursales('','', '', '', '')
    this.sucursalesModelGetId = new sucursales('','', '', '', '')
    this.token = this._dashboardService.obtenerToken()
   }

   getSucursales(){
    this._dashboardService.obtenerSucursales(this._dashboardService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalesModelGet = response.sucursales;
        console.log(this.sucursalesModelGet);

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

  getSucursalesId(idSucursal){
    this._dashboardService.obtenerSucursalId(idSucursal).subscribe(
      (response)=>{
        console.log(response);
        this.sucursalesModelGetId = response.sucursales;
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


  getSucursalesNombre(nombre){
    if(nombre){
      this._dashboardService.obtenerSucursalNombre(nombre,  this._dashboardService.obtenerToken()).subscribe(
        (response)=>{
          this.sucursalesModelGet = response.sucursales;
          console.log(this.sucursalesModelGet);
        },
        (error)=>{
          this.getSucursales();
        }
      )
    }else{
      this.getSucursales();
    }

  }

  postSucursales(addSucursalForm){
    this._dashboardService.agregarSucursal(this.sucursalesModelPost, this._dashboardService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '',
          text: "su sucursal se ha agregado exitosamente"
        })
        addSucursalForm.reset();
        this.getSucursales();
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

  putSucursal(){
    this._dashboardService.editarSucursal(this.sucursalesModelGetId, this._dashboardService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '',
          text: "su sucursal se ha editado exitosamente"
        })
        this.getSucursales();
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

  deleteSucursales(idSucursal){
    this._dashboardService.eliminarSucursal(idSucursal, this._dashboardService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '',
          text: "su sucursal se ha eliminado exitosamente"
        })
        this.getSucursales();
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


  ngOnInit(): void {
    this.getSucursales();
  }



}
