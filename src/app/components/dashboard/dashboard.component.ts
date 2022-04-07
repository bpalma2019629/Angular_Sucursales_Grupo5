import { Component, OnInit } from '@angular/core';
import { sucursales } from 'src/app/models/sucursales.model';
import { DashboardService } from 'src/app/services/dashboard.service';

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

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
  }



}
