export class Carrito {
    idCliente: string;
    nombreProducto: string;
    cantidad: number;

    constructor(idCliente: string, nombreProducto: string, cantidad: number) {
        this.idCliente = idCliente;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
    }
}