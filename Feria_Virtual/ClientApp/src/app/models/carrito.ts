export class Carrito {
    idCliente: string;
    idProducto: number;
    cantidad: number;

    constructor(idCliente: string, idProducto: number, cantidad: number) {
        this.idCliente = idCliente;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }
}