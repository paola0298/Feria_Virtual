import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producer-affiliation',
  templateUrl: './producer-affiliation.component.html',
  styleUrls: ['./producer-affiliation.component.css']
})
export class ProducerAffiliationComponent implements OnInit {

  provinces = [];
  cantons = [];
  districts = [];

  constructor() { }

  ngOnInit() {
  }

  getProvinces() {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.provinces = Object.values(json);
      }
    }
  }

  getCantons(provinceId: string ): void {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + provinceId + '/cantones.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.cantons = Object.values(json);
      }
    }
  }

  getDistricts(idCanton: string, idProvince: string): void {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + idProvince + '/canton/' + idCanton + '/distritos.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.districts = Object.values(json);
      }
    }
  }

  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  loadCanton(province: string): void {

    document.getElementById("provinceDDM").textContent = province;
    var index = this.provinces.indexOf(province) + 1;
    this.getCantons(index.toString());
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    document.getElementById("cantonDDM").textContent = canton;
    var idCanton = this.cantons.indexOf(canton) + 1;
    var idProvince = this.provinces.indexOf(document.getElementById("provinceDDM").textContent) + 1;
    console.log(idCanton + '\n' + idProvince);
    this.getDistricts(idCanton.toString(), idProvince.toString());
  }

  /**
   * Metodo para colocar el distrito seleccionado en el nombre del dropdown 
   * @param district
   */
  setActualDistrict(district: string): void {
    document.getElementById("districtDDM").textContent = district;
  }

  saveProducer(): void {
    let id = (document.getElementById("id") as HTMLInputElement).value;
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement).value;
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement).value;
    let sinpe = (document.getElementById("sinpe") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let birth = (document.getElementById("birth") as HTMLInputElement).value;
    let province = document.getElementById("provinceDDM").textContent;
    let canton = document.getElementById("cantonDDM").textContent;
    let district = document.getElementById("districtDDM").textContent;
    let dir = (document.getElementById("dir") as HTMLInputElement).value;
    let deliver = (document.getElementById("deliver") as HTMLInputElement).value;

    if (id == '' || name == '' || lastName1 == '' || lastName2 == '' || sinpe == '' || phone == '' || birth == '' ||
      dir == '' || deliver == '') {
      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Error";
      document.getElementById("msjText").textContent = "Por favor complete todos los campos.";
    } else {
      let idN = Number(id);
      let phoneN = Number(phone);
      let sinpeN = Number(sinpe);

      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Exito";
      document.getElementById("msjText").textContent = "Su solicitud esta siendo vertificada."; 

      //TODO enviar solicitud de afiliacion
    }

  }

  cleanFields() {
    (document.getElementById("id") as HTMLInputElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("last-name1") as HTMLInputElement).value = "";
    (document.getElementById("last-name2") as HTMLInputElement).value = "";
    (document.getElementById("sinpe") as HTMLInputElement).value = "";
    (document.getElementById("phone") as HTMLInputElement).value = "";
    (document.getElementById("birth") as HTMLInputElement).value = "";
    document.getElementById("provinceDDM").textContent = "Provincia";
    document.getElementById("cantonDDM").textContent = "Canton";
    document.getElementById("districtDDM").textContent = "Distrito";
    (document.getElementById("dir") as HTMLInputElement).value = "";
    (document.getElementById("deliver") as HTMLInputElement).value = "";
  }

}
