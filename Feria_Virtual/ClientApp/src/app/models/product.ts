export class Product {
  id: number;
  idProductor: number;
  nombre: string;
  disponibilidad: number;
  precio: number;
  modoVenta: string;
  foto: string;

  constructor(
    id: number,
    idProductor: number,
    nombre: string,
    disponibilidad: number,
    precio: number,
    modoVenta: string,
    foto: string
  ) {
     this.id = id; 
    this.idProductor = idProductor;
    this.nombre = nombre;
    this.disponibilidad = disponibilidad;
    this.precio = precio;
    this.modoVenta = modoVenta;
    this.foto = foto;
  }
}
