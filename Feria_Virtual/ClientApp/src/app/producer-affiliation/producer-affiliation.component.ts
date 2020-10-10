import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service'

@Component({
  selector: 'app-producer-affiliation',
  templateUrl: './producer-affiliation.component.html',
  styleUrls: ['./producer-affiliation.component.css']
})
export class ProducerAffiliationComponent implements OnInit {

  private utilsService: UtilsService = new UtilsService();
  provinces = [];
  cantons = [];
  districts = [];
  deliveryZones = [];

  constructor() { }

  ngOnInit() { 
    this.getProvinces();
  }

  /**
   * Metodo para guardar la solicitud de afiliacion de un productor
   */
  saveProducer(): void {
    let id = (document.getElementById("id") as HTMLInputElement);
    let name = (document.getElementById("name") as HTMLInputElement);
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement);
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement);
    let sinpe = (document.getElementById("sinpe") as HTMLInputElement);
    let phone = (document.getElementById("phone") as HTMLInputElement);
    let birth = (document.getElementById("birth") as HTMLInputElement);
    let province = (document.getElementById("province") as HTMLSelectElement);
    let canton = (document.getElementById("canton") as HTMLSelectElement);
    let district = (document.getElementById("district") as HTMLSelectElement);
    let dir = (document.getElementById("dir") as HTMLInputElement);
    let deliver = (document.getElementById("deliver") as HTMLInputElement);

    if (id.value == '' || name.value == '' || lastName1.value == '' || lastName2.value == '' || sinpe.value == '' || phone.value == '' || birth.value == '' ||
      dir.value == '' || this.deliveryZones.length == 0) {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');

    } else {
      this.utilsService.showInfoModal("Exito", "Su solicitud esta siendo vertificada.", "saveMsjLabel", "msjText", 'saveMsj');
      let idN = Number(id.value);
      let phoneN = Number(phone.value);
      let sinpeN = Number(sinpe.value);

      //TODO enviar solicitud de afiliacion
      this.utilsService.cleanField([id, name, lastName1, lastName2, sinpe, phone, dir, birth],
        [province, canton, district], ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);
      this.deliveryZones = [];
    }
  }

  /**
   * Metodo para obtener las provincias
   */
  async getProvinces() {
    this.provinces = await this.utilsService.getProvinces();
    console.log(this.provinces);
  }

  /**
   * Metodo para obtener los cantones segun la provincia seleccionada
   * @param provinceId Id de la provincia seleccionada
   */
  async getCantons(provinceId: string) {
    console.log("loading canton")
    this.cantons = await this.utilsService.getCantons(provinceId);
    console.log(this.cantons);
  }

  /**
   * Metodo para obtener los distritos segun el canton seleccionado
   * @param idCanton Id del canton seleccionado
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  async getDistricts(idCanton: string, idProvince: string) {
    this.districts = await this.utilsService.getDistricts(idCanton, idProvince);
    console.log(this.districts)
  }

  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  loadCanton(province: string): void {
    document.getElementById("province").setAttribute("selected", province);
    var index = this.provinces.indexOf(province) + 1;
    this.getCantons(index.toString());
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    document.getElementById("canton").setAttribute("selected", canton)
    var idCanton = this.cantons.indexOf(canton) + 1;
    var idProvince = this.provinces.indexOf(document.getElementById("province").getAttribute("selected")) + 1;
    console.log(idCanton + '\n' + idProvince);
    this.getDistricts(idCanton.toString(), idProvince.toString());
  }

  /**
   * Metodo para colocar el distrito seleccionado en el nombre del dropdown 
   * @param district
   */
  setActualDistrict(district: string): void {
    document.getElementById("district").setAttribute("selected", district);
  }

  addDeliveryZone() {
    console.log("Adding delivery zone");
    let newZone = (document.getElementById("delivery") as HTMLInputElement).value;
    if (newZone != '') {
      this.deliveryZones.push(newZone);
      (document.getElementById("delivery") as HTMLInputElement).value = "";
    } else {
      this.utilsService.showInfoModal("Error", "Por favor ingrese un lugar de entrega", "saveMsjLabel", "msjText", 'saveMsj');
    }
    
  }

  deleteDeliveryZone(zone: string) {
    console.log("removing " + zone);
    let index = this.deliveryZones.indexOf(zone);
    this.deliveryZones.splice(index, 1);
  }

  closeModal(modal:string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }
  
}
