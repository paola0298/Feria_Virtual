export class AfilliationRequest {
    id: number;
    estado: number;
    idProductor: number;

    constructor(id: number, estado: number, idProductor: number) {
        this.id = id;
        this.estado = estado;
        this.idProductor = idProductor;
    }
}
