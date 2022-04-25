import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { productosSucursales } from 'src/app/models/productosSucursal.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos-sucursales',
  templateUrl: './productos-sucursales.component.html',
  styleUrls: ['./productos-sucursales.component.scss'],
  providers: [ProductosSucursalService]
})
export class ProductosSucursalesComponent implements OnInit {
  public productosModelGetId: productosSucursales;
  public productoSucursalModelPut: productosSucursales;
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
  refresh(): void { window.location.reload(); }


  getProductosSucursal(idSucursal){
    this._productoService.obtenerProductos(idSucursal, this._productoService.obtenerToken()).subscribe(
      (response) => {
        this.productosModelGet = response.productos;
        console.log(this.productosModelGet);
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

  deleteProductos(idProducto){
    this._productoService.eliminarProducto(idProducto, this._productoService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.refresh()
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

  getProductosId(idProducto){
    this._productoService.obtenerProductoId(idProducto).subscribe(
      (response)=>{
        console.log(response);
        this.productosModelGetId = response.productos;
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

  putVender(idProducto){
    this._productoService.vender(idProducto, this.productoSucursalModelPut, this._productoService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.refresh()
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
