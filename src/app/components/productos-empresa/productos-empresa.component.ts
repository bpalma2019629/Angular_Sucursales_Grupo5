import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/models/productosEmpresa.model';
import { sucursales } from 'src/app/models/sucursales.model';
import { productosSucursales } from 'src/app/models/productosSucursal.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductosEmpresaService } from 'src/app/services/productos-empresa.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos-empresa',
  templateUrl: './productos-empresa.component.html',
  styleUrls: ['./productos-empresa.component.scss'],
  providers: [ProductosEmpresaService]
})
export class ProductosEmpresaComponent implements OnInit {

  tipos = [
    {nombre: 'Nombre'},
    {nombre: 'Proveedor'},
    {nombre: 'Stock mayor a menor'},
    {nombre: 'Stock menor a mayor'}
  ]

  public productosModelGet: productos;
  public productosModelPost: productos;
  public productosModelGetId: productos;
  public sucursalesModelGet: sucursales;
  public productoSucursalModelPut: productosSucursales;
  public token;
  public tipoBusqueda;

  constructor(private _productosService: ProductosEmpresaService, private _dashboardService: DashboardService, private _router: Router) {
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

  ordenar(){
    this.getProductos();
    if(this.tipoBusqueda=="Stock mayor a menor"||this.tipoBusqueda=="Stock menor a mayor"){
      this._productosService.obtenerProductos(this._productosService.obtenerToken()).subscribe(
        (response) => {
          if(this.tipoBusqueda=="Stock mayor a menor"){
            this.productosModelGet = response.productos.sort((a, b) => b.stock - a.stock);
          }else{
            this.productosModelGet = response.productos.sort((a, b) => a.stock - b.stock);
          }

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
  }


  getProductosNombre(nombre){
    if(nombre){
      if(this.tipoBusqueda=="Nombre"||this.tipoBusqueda=="Proveedor"){
        this._productosService.obtenerProductosNombre(nombre, this.tipoBusqueda,  this._productosService.obtenerToken()).subscribe(
          (response)=>{
            this.productosModelGet = response.productos;
            console.log(this.productosModelGet);
          },
          (error)=>{
            this.getProductos();
          }
        )
      }
    }else{
      this.getProductos();
    }

  }

  postProductos(addProductoEmp){
    this._productosService.agregarProducto(this.productosModelPost, this._productosService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        addProductoEmp.reset();
        this.ordenar();
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
        this.ordenar();
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
        this.ordenar();
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
