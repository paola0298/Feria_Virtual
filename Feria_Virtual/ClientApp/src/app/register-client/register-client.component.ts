import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  private utilsService: UtilsService = new UtilsService();
  provinces = [];
  cantons = [];
  districts = [];

  constructor() { }

  ngOnInit() {
    this.getProvinces();
   }

  saveClient() {
    let idClient = (document.getElementById("idClient") as HTMLInputElement);
    let name = (document.getElementById("name") as HTMLInputElement);
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement);
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement);
    let username = (document.getElementById("username") as HTMLInputElement);
    let pass = (document.getElementById("pass") as HTMLInputElement);
    let passConfirm = (document.getElementById("passConfirm") as HTMLInputElement);
    let birth = (document.getElementById("birth") as HTMLInputElement);
    let province = document.getElementById("province") as HTMLSelectElement;
    let canton = document.getElementById("canton") as HTMLSelectElement;
    let district = document.getElementById("district") as HTMLSelectElement;
    let dir = (document.getElementById("dir") as HTMLInputElement);
    let phone = (document.getElementById("phone") as HTMLInputElement);

    //TODO verificacion de contraseña sean igual
    if (idClient.value == '' || name.value == '' || lastName1.value == '' || lastName2.value == '' || username.value == '' || phone.value == '' || birth.value == '' ||
      dir.value == '' || pass.value == '' || passConfirm.value == '') {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');

    } else {
      this.utilsService.showInfoModal("Exito", "Registro completado", "saveMsjLabel", "msjText", 'saveMsj');
      let idN = Number(idClient.value);
      let phoneN = Number(phone.value);

      //TODO enviar solicitud de afiliacion
      
      this.utilsService.cleanField([idClient, name, lastName1, lastName2, username, pass, phone, dir, passConfirm, birth],
        [province, canton, district], ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);
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
    this.cantons = await this.utilsService.getCantons(provinceId);
  }

  /**
   * Metodo para obtener los distritos segun el canton seleccionado
   * @param idCanton Id del canton seleccionado
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  async getDistricts(idCanton: string, idProvince: string) {
    this.districts = await this.utilsService.getDistricts(idCanton, idProvince);
  }

  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  loadCanton(province: string): void {
    var index = this.provinces.indexOf(province) + 1;
    this.getCantons(index.toString());
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    var idCanton = this.cantons.indexOf(canton) + 1;
    var idProvince = this.provinces.indexOf((document.getElementById("province") as HTMLSelectElement).value) + 1;
    console.log(idCanton + '\n' + idProvince);
    this.getDistricts(idCanton.toString(), idProvince.toString());
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }
}
