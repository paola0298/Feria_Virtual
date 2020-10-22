export class AfilliationRequest {
    id: number;
    estado: number;
    idProductor: number;
    comentario: string;

    constructor(id: number, estado: number, idProductor: number, comentario: string) {
        this.id = id;
        this.estado = estado;
        this.idProductor = idProductor;
        this.comentario = comentario;
    }
}
