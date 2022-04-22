export class productosSucursales{
  constructor(
    public _id: String,
    public nombreProducto: String,
    public stock: Number,
    public cantidadVendida: Number,
    public idSucursal: String,
    public nombreSucursal: String
  ){}
}
