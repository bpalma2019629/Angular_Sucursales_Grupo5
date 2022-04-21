import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/models/productosEmpresa.model';
import { ProductosEmpresaService } from 'src/app/services/productos-empresa.service';


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
  public token;

  constructor(private _productosService: ProductosEmpresaService) {
    this.productosModelPost = new productos('','','',0,'');
    this.productosModelGetId = new productos('','','',0,'');
    this.token = this._productosService.obtenerToken()
  }

  getProductos(){
    this._productosService.obtenerProductos(this._productosService.obtenerToken()).subscribe(
      (response) => {
        this.productosModelGet = response.productos;
        console.log(this.productosModelGet);
      },
      (error) => {
        console.log(<any>error)
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
        console.log(<any>error);
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
        console.log(<any>error);
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
        console.log(<any>error);
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
        console.log(<any>error);
      }
    )
  }

  ngOnInit(): void {
    this.getProductos();
  }

}
