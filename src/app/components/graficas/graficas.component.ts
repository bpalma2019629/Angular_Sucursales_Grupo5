import { Component, OnInit } from '@angular/core';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { productosSucursales } from 'src/app/models/productosSucursal.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [ProductosSucursalService]
})
export class GraficasComponent implements OnInit {
  public modelProductoGet:any = [];
  public token;
  chartOptions = {
    responsive: true,
  };
  //Nombres productos
  chartLabels:any = [];
  //cantidad de producto
  chartData:any = [];
  chartColors:any = [
    {
      backgroundColor: []
    }
  ];
  chartLegend = true;
  chartPlugins = [];;

  constructor(public _activatedRoute : ActivatedRoute,public _productoService : ProductosSucursalService)
  {this.token = this._productoService.obtenerToken() }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get('idSucursal'));
      this.getProductosSucursal(dataRuta.get('idSucursal'))
    })
  }

  getProductosSucursal(idSucursal){
    this._productoService.obtenerProductos(idSucursal,this._productoService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.modelProductoGet = response.productos;
        this.modelProductoGet.forEach(dato => {
          this.chartLabels.push(dato.nombreProducto);
          this.chartData.push(dato.cantidadVendida);
          this.chartColors[0].backgroundColor.push(`#${ Math.floor(Math.random()*16777215).toString(16)}`)
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.mensaje
        })
      }
    )
  }

}
