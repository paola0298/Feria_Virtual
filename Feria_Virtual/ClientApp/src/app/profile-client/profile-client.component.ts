import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'
import { Producer } from '../models/producer';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  private utilsService: UtilsService = new UtilsService();
  provinces: string[] = [];
  cantons: string[] = [];
  districts: string[] = [];
  actionFlag: boolean = false;
  actualProducer: Producer;

  constructor(private changeDetection: ChangeDetectorRef) {
    // this.actualProducer = new Producer();
    // this.actualProducer.id = 402390083;
    // this.actualProducer.name = 'Paola';
    // this.actualProducer.lastName = 'Villegas';
    // this.actualProducer.lastName2 = 'Chacón';
    // this.actualProducer.sinpe = 123456789;
    // this.actualProducer.phone = 83216963;
    // this.actualProducer.birth = '1998-06-02';
    // this.actualProducer.province = 'Heredia';
    // this.actualProducer.canton = 'Central';
    // this.actualProducer.district = 'Varablanca';
    // this.actualProducer.dir = 'Minisuper Varablanca';
    // this.actualProducer.deliver = ['Heredia'];
  }

  ngOnInit() {
    (document.getElementById("province") as HTMLSelectElement).disabled=true;
    (document.getElementById("canton") as HTMLSelectElement).disabled=true;
    (document.getElementById("district") as HTMLSelectElement).disabled=true; 
    this.setData();
  }

  async setData() {
    await this.loadProvinces();
    await this.loadCanton(this.actualProducer.provincia);
    await this.loadDistrict(this.actualProducer.canton);
    this.changeDetection.detectChanges();
    (document.getElementById("idClient") as HTMLInputElement).value = this.actualProducer.identificacion;
    (document.getElementById("name") as HTMLInputElement).value = this.actualProducer.nombre;
    (document.getElementById("last-name1") as HTMLInputElement).value = this.actualProducer.apellido2;
    (document.getElementById("last-name2") as HTMLInputElement).value = this.actualProducer.apellido2;
    (document.getElementById("birth") as HTMLInputElement).value = this.actualProducer.fechaNacimiento;
    // (document.getElementById("dir") as HTMLInputElement).value = this.actualProducer.direccionExacta;
    (document.getElementById("phone") as HTMLInputElement).value = this.actualProducer.telefono;

    var provinceSelect = (document.getElementById("province") as HTMLSelectElement); 
    provinceSelect.value = this.actualProducer.provincia;
    var cantonSelect = (document.getElementById("canton") as HTMLSelectElement);
    cantonSelect.value = this.actualProducer.canton;
    var districtSelect = (document.getElementById("district") as HTMLSelectElement);
    districtSelect.value = this.actualProducer.distrito;

  }

  updateData() {

    this.actionFlag = !this.actionFlag;
    var id = (document.getElementById("idClient") as HTMLInputElement);
    var name = (document.getElementById("name") as HTMLInputElement);
    var lastName1 = (document.getElementById("last-name1") as HTMLInputElement);
    var lastName2 = (document.getElementById("last-name2") as HTMLInputElement);
    var birth = (document.getElementById("birth") as HTMLInputElement);
    var dir = (document.getElementById("dir") as HTMLInputElement);
    var phone = (document.getElementById("phone") as HTMLInputElement);
    var province = (document.getElementById("province") as HTMLSelectElement);
    var canton = (document.getElementById("canton") as HTMLSelectElement);
    var district = (document.getElementById("district") as HTMLSelectElement); 

    if (this.actionFlag) {
      this.setProfileEditable(id, name, lastName1, lastName2, birth, dir, phone, province, canton, district);

    } else { 
      this.saveProfileData(id, name, lastName1, lastName2, birth, dir, phone, province, canton, district);
    }
  }

  setProfileEditable(id : HTMLInputElement, name : HTMLInputElement, lastName1 : HTMLInputElement, lastName2 : HTMLInputElement, 
    birth : HTMLInputElement, dir : HTMLInputElement, phone : HTMLInputElement, province : HTMLSelectElement, 
    canton : HTMLSelectElement, district : HTMLSelectElement) {
      id.removeAttribute("disabled");
      name.removeAttribute("disabled");
      lastName1.removeAttribute("disabled");
      lastName2.removeAttribute("disabled");
      birth.removeAttribute("disabled");
      dir.removeAttribute("disabled");
      phone.removeAttribute("disabled");
      province.disabled=false;
      canton.disabled=false;
      district.disabled=false; 

  }

  saveProfileData(id : HTMLInputElement, name : HTMLInputElement, lastName1 : HTMLInputElement, lastName2 : HTMLInputElement, 
    birth : HTMLInputElement, dir : HTMLInputElement, phone : HTMLInputElement, province : HTMLSelectElement, 
    canton : HTMLSelectElement, district : HTMLSelectElement) {
      id.setAttribute("disabled", "true");
      name.setAttribute("disabled", "true");
      lastName1.setAttribute("disabled", "true");
      lastName2.setAttribute("disabled", "true");
      birth.setAttribute("disabled", "true");
      dir.setAttribute("disabled", "true");
      phone.setAttribute("disabled", "true");
      province.disabled=true;
      canton.disabled=true;
      district.disabled=true;
  }

  deleteAccount() {
    console.log("Deleting account...");
  }

  async loadProvinces() {
    this.provinces = await this.utilsService.getProvinces();
  }

  async loadCanton(province: string) {
    var index = this.provinces.indexOf(province) + 1;

    if (index == 0) {
      console.log('invalid province id: ' + index);
      return;
    }

    this.cantons = await this.utilsService.getCantons(index.toString());
  }

  async loadDistrict(canton: string) {
    var provinceId = this.provinces.indexOf(this.actualProducer.provincia) + 1;
    var cantonId = this.cantons.indexOf(canton) + 1;

    if (cantonId == 0) {
      console.log('invalid canton id: ' + cantonId);
      return;
    }

    // console.log('provinceId: ' + provinceId);
    // console.log('cantonId: ' + cantonId);

    this.districts = await this.utilsService.getDistricts(cantonId.toString(), provinceId.toString());
    console.log('District loading done');
  }

   /**
   * Metodo para obtener las provincias
   */
  // async getProvinces() {
  //   this.provinces = await this.utilsService.getProvinces();
  //   console.log(this.provinces);
  // }

  /**
   * Metodo para obtener los cantones segun la provincia seleccionada
   * @param provinceId Id de la provincia seleccionada
   */
  // async getCantons(provinceId: string) {
  //   this.cantons = await this.utilsService.getCantons(provinceId);
  // }

  /**
   * Metodo para obtener los distritos segun el canton seleccionado
   * @param idCanton Id del canton seleccionado
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  // async getDistricts(idCanton: string, idProvince: string) {
  //   this.districts = await this.utilsService.getDistricts(idCanton, idProvince);
  // }

  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  // loadCanton(province: string): void {
  //   var index = this.provinces.indexOf(province) + 1;
  //   this.getCantons(index.toString());
  // }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  // loadDistrict(canton: string): void {
  //   var idCanton = this.cantons.indexOf(canton) + 1;
  //   var idProvince = this.provinces.indexOf((document.getElementById("province") as HTMLSelectElement).value) + 1;
  //   this.getDistricts(idCanton.toString(), idProvince.toString());
  // }

}
