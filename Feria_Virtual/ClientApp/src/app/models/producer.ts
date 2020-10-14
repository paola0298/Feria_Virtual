/* Esta clase representa a un productor */

export class Producer {
  nombre: string;
  identificacion: number;
  apellido1: string;
  apellido2: string;
  sinpeMovil: number;
  telefono: number;
  fechaNacimiento: string;
  provincia: string;
  canton: string;
  distrito: string;
  direccionExacta: string;
  lugaresEntrega: string[];

  constructor(
    nombre: string,
    identificacion: number,
    apellido1: string,
    apellido2: string,
    sinpeMovil: number,
    telefono: number,
    fechaNacimiento: string,
    provincia: string,
    canton: string,
    distrito: string,
    direccionExacta: string,
    lugaresEntrega: string[]
  ) {
    this.nombre = nombre;
    this.identificacion = identificacion;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.sinpeMovil = sinpeMovil;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.provincia = provincia;
    this.canton = canton;
    this.distrito = distrito;
    this.direccionExacta = direccionExacta;
    this.lugaresEntrega = lugaresEntrega;
  }
}
