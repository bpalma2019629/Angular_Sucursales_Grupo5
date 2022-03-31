export class Usuarios{
  constructor(
    public _id: String,
    public nombreEmpresa: String,
    public usuario: String,
    public password: String,
    public rol: String,
    public tipo: String,
    public ProductosEmpresa: [{
        nombreProducto: String,
        nombreProveedor: String,
        stock: Number
    }]
  ){}
}
