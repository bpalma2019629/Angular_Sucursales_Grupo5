import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sucursales } from 'src/app/models/sucursales.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  providers: [DashboardService]
})
export class DashboardAdminComponent implements OnInit {

  public sucursalesModelGet: sucursales;
  public token;

  constructor(
    public _activatedRoute : ActivatedRoute,
    private _dashboardService: DashboardService,
    private _router: Router) {

      this.token = this._dashboardService.obtenerToken()
    }

    getSucursales(){
      this._activatedRoute.paramMap.subscribe((dataRuta) => {
        this._dashboardService.obtenerSucursales(this._dashboardService.obtenerToken(),dataRuta.get('idEmpresa')).subscribe(
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
      })

    }

    getSucursalesNombre(nombre){
      this._dashboardService.obtenerSucursalNombre(nombre,  this._dashboardService.obtenerToken()).subscribe(
        (response)=>{
          this.sucursalesModelGet = response.sucursales;
          console.log(this.sucursalesModelGet);
        },
        (error)=>{
          this.getSucursales();
        }
      )
    }

  ngOnInit(): void {
    if(this._dashboardService.obtenerIdentidad()==null){
      this._router.navigate(['/']);
    }else if(this._dashboardService.obtenerIdentidad().rol=="Empresa"){
      this._router.navigate(['/dashboard']);
    }else{
      this.getSucursales();
    }
  }

}
