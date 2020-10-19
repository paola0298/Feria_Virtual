export class Client {
    identificacion:string;
    telefono:string;
    fechaNacimiento:string;
    apellido1:string;
    apellido2:string;
    provincia:string;
    canton:string;
    distrito:string;
    usuario:string;
    password:string;
    nombre:string;

    constructor(
        identificacion:string,
        telefono:string,
        fechaNacimiento:string,
        apellido1:string,
        apellido2:string,
        provincia:string,
        canton:string,
        distrito:string,
        usuario:string,
        password:string,
        nombre:string

    ) {
        this.identificacion = identificacion;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.usuario = usuario;
        this.password = password;
        this.nombre = nombre;
    }
}