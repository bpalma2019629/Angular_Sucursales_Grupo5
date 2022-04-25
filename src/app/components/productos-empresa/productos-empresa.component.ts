import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/models/productosEmpresa.model';
import { sucursales } from 'src/app/models/sucursales.model';
import { productosSucursales } from 'src/app/models/productosSucursal.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductosEmpresaService } from 'src/app/services/productos-empresa.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-productos-empresa',
  templateUrl: './productos-empresa.component.html',
  styleUrls: ['./productos-empresa.component.scss'],
  providers: [ProductosEmpresaService]
})
export class ProductosEmpresaComponent implements OnInit {

  public productosModelGet: productos;
  public productosModelPost: productos;
  public productosModelGetId: productos;
  public sucursalesModelGet: sucursales;
  public productoSucursalModelPut: productosSucursales;
  public token;

  constructor(private _productosService: ProductosEmpresaService, private _dashboardService: DashboardService) {
    this.productosModelPost = new productos('','','',0,'');
    this.productosModelGetId = new productos('','','',0,'');
    this.productoSucursalModelPut = new productosSucursales('', '', 0, 0, '', '')
    this.token = this._productosService.obtenerToken()
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

  putEnviarProducto(idProducto){
    this._productosService.enviarProducto(idProducto, this.productoSucursalModelPut, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
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


  getProductos(){
    this._productosService.obtenerProductos(this._productosService.obtenerToken()).subscribe(
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

  getProductosId(idProducto){
    this._productosService.obtenerProductoId(idProducto).subscribe(
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

  postProductos(){
    this._productosService.agregarProducto(this.productosModelPost, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
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

  putProducto(){
    this._productosService.editarProducto(this.productosModelGetId, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
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

  deleteProductos(idProducto){
    this._productosService.eliminarProducto(idProducto, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductos();
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
    this.getProductos();
  }

}
