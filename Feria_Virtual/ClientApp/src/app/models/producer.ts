/* Esta clase representa a un productor */

export class Producer {
  nombre: string;
  identificacion: string;
  apellido1: string;
  apellido2: string;
  sinpe: string;
  telefono: string;
  fechaNacimiento: string;
  provincia: string;
  canton: string;
  distrito: string;
  lugaresEntrega: string[];
  afiliado: boolean;

  constructor(
    nombre: string,
    identificacion: string,
    apellido1: string,
    apellido2: string,
    sinpe: string,
    telefono: string,
    fechaNacimiento: string,
    provincia: string,
    canton: string,
    distrito: string,
    lugaresEntrega: string[]
  ) {
    this.nombre = nombre;
    this.identificacion = identificacion;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.sinpe = sinpe;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.provincia = provincia;
    this.canton = canton;
    this.distrito = distrito;
    this.lugaresEntrega = lugaresEntrega;
  }
}
