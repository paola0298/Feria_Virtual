export class Product {
  id: number;
  nombre: string;
  idCategoria: number;
  idProductor: string;
  disponibilidad: number;
  precio: number;
  modoVenta: string;
  foto: string;

  constructor(
    nombre: string,
    idCategoria: number,
    idProductor: string,
    disponibilidad: number,
    precio: number,
    modoVenta: string,
    foto: string,
  ) {
    this.nombre = nombre;
    this.idCategoria = idCategoria;
    this.idProductor = idProductor;
    this.disponibilidad = disponibilidad;
    this.precio = precio;
    this.modoVenta = modoVenta;
    this.foto = foto;
  }
}
