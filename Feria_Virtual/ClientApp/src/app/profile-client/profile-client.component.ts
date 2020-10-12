import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service'
import { Producer } from '../shared/models/producer';

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
    this.actualProducer = new Producer();
    this.actualProducer.id = 402390083;
    this.actualProducer.name = 'Paola';
    this.actualProducer.lastName = 'Villegas';
    this.actualProducer.lastName2 = 'Chacón';
    this.actualProducer.sinpe = 123456789;
    this.actualProducer.phone = 83216963;
    this.actualProducer.birth = '1998-06-02';
    this.actualProducer.province = 'Heredia';
    this.actualProducer.canton = 'Central';
    this.actualProducer.district = 'Varablanca';
    this.actualProducer.dir = 'Minisuper Varablanca';
    this.actualProducer.deliver = ['Heredia'];
  }

  ngOnInit() {
    (document.getElementById("province") as HTMLSelectElement).disabled=true;
    (document.getElementById("canton") as HTMLSelectElement).disabled=true;
    (document.getElementById("district") as HTMLSelectElement).disabled=true; 
    
    this.setData();
  }

  async setData() {
    await this.loadProvinces();
    await this.loadCanton(this.actualProducer.province);
    await this.loadDistrict(this.actualProducer.canton);
    this.changeDetection.detectChanges();
    (document.getElementById("idClient") as HTMLInputElement).value = this.actualProducer.id.toString();
    (document.getElementById("name") as HTMLInputElement).value = this.actualProducer.name;
    (document.getElementById("last-name1") as HTMLInputElement).value = this.actualProducer.lastName;
    (document.getElementById("last-name2") as HTMLInputElement).value = this.actualProducer.lastName2;
    (document.getElementById("birth") as HTMLInputElement).value = this.actualProducer.birth;
    (document.getElementById("dir") as HTMLInputElement).value = this.actualProducer.dir;
    (document.getElementById("phone") as HTMLInputElement).value = this.actualProducer.phone.toString();

    var provinceSelect = (document.getElementById("province") as HTMLSelectElement); 
    provinceSelect.value = this.actualProducer.province;
    var cantonSelect = (document.getElementById("canton") as HTMLSelectElement);
    cantonSelect.value = this.actualProducer.canton;
    var districtSelect = (document.getElementById("district") as HTMLSelectElement);
    districtSelect.value = this.actualProducer.district;

  }

  updateData() {

    this.actionFlag = !this.actionFlag;
    if (this.actionFlag) {
      (document.getElementById("idClient") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("name") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("last-name1") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("last-name2") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("birth") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("dir") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("phone") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("province") as HTMLSelectElement).disabled=false;
      (document.getElementById("canton") as HTMLSelectElement).disabled=false;
      (document.getElementById("district") as HTMLSelectElement).disabled=false; 

    } else {
      console.log("Saving...");
      
      (document.getElementById("idClient") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("name") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("last-name1") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("last-name2") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("birth") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("dir") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("phone") as HTMLInputElement).setAttribute("disabled", "true");
      (document.getElementById("province") as HTMLSelectElement).disabled=true;
      (document.getElementById("canton") as HTMLSelectElement).disabled=true;
      (document.getElementById("district") as HTMLSelectElement).disabled=true; 
    }

    


  }

  saveData() {
    console.log("saving data");
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
    var provinceId = this.provinces.indexOf(this.actualProducer.province) + 1;
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
