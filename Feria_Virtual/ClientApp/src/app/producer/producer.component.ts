import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  provinces = ['San Jose', 'Alajuela', 'Heredia', 'Cartago', 'Guanacaste', 'Puntarenas', 'Limon'];

  cantonSJ = ['San Jose', 'Escazu', 'Desamparados', 'Puriscal', 'Tarrazu', 'Aserri', 'Mora',
    'Goicoechea', 'Santa Ana', 'Alajuelita', 'Vazquez de Coronado', 'Acosta', 'Tibas', 'Moravia',
    'Montes de Oca', 'Turrubares', 'Dota', 'Curridabat', 'Perez Zeledon', 'Leon Cortes Castro'];
  cantonAlaj = ['Alajuela'];
  cantonHere = ['Heredia'];
  cantonCart = ['Cartago'];
  cantonGua = ['Guanacaste'];
  cantonPunt = ['Puntarenas'];
  cantonLim = ['Limon'];

  cantons = [];
  districts = [];

  

  constructor() { }

  ngOnInit(): void {
  }
  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  loadCanton(province: string): void {
    switch (province) {
      case this.provinces[0]:
        this.cantones = this.cantonSJ;
        break;
      case this.provinces[1]:
        this.cantones = this.cantonAlaj;
        break;
      case this.provinces[2]:
        this.cantones = this.cantonHere;
        break;
      case this.provinces[3]:
        this.cantones = this.cantonCart;
        break;
      case this.provinces[4]:
        this.cantones = this.cantonGua;
        break;
      case this.provinces[5]:
        this.cantones = this.cantonPunt;
        break;
      case this.provinces[6]:
        this.cantones = this.cantonLim;
        break;
    }
    
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    console.log(canton + ' selected!');
  }

}
