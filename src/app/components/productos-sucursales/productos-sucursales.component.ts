import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { productosSucursales } from 'src/app/models/productosSucursal.model';

@Component({
  selector: 'app-productos-sucursales',
  templateUrl: './productos-sucursales.component.html',
  styleUrls: ['./productos-sucursales.component.scss'],
  providers: [ProductosSucursalService]
})
export class ProductosSucursalesComponent implements OnInit {
  public productosModelGet: productosSucursales;
  public token;
  constructor(
    public _activatedRoute : ActivatedRoute,
    public _productoService : ProductosSucursalService

  ) {
    this.token = this._productoService.obtenerToken()
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get('idSucursal'));
      this.getProductosSucursal(dataRuta.get('idSucursal'))
    })
  }

  getProductosSucursal(idSucursal){
    this._productoService.obtenerProductos(idSucursal, this._productoService.obtenerToken()).subscribe(
      (response) => {
        this.productosModelGet = response.productos;
        console.log(this.productosModelGet);
      },
      (error) => {

      }
    )
  }

}
