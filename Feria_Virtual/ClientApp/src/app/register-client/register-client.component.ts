import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { RestclientService } from 'src/app/services/restclient.service';
import { Client } from '../models/client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  provinces = [];
  cantons = [];
  districts = [];
  created = false;

  constructor(private utilsService: UtilsService, private restClientService: RestclientService,
    private router: Router) { }

  ngOnInit() {
    this.getProvinces();
   }

   createClient(client: Client) {
     const response = this.restClientService.createClient(client);
     response.subscribe(
       (value: Client) => {
        this.created = true;
        this.utilsService.showInfoModal('Exito', 'Registro completado', 'saveMsjLabel', 'msjText', 'saveMsj');
       }, (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
       });
   }


  saveClient() {
    const idClient = (document.getElementById('idClient') as HTMLInputElement);
    const name = (document.getElementById('name') as HTMLInputElement);
    const lastName1 = (document.getElementById('last-name1') as HTMLInputElement);
    const lastName2 = (document.getElementById('last-name2') as HTMLInputElement);
    const username = (document.getElementById('username') as HTMLInputElement);
    const pass = (document.getElementById('pass') as HTMLInputElement);
    const passConfirm = (document.getElementById('passConfirm') as HTMLInputElement);
    const birth = (document.getElementById('birth') as HTMLInputElement);
    const province = document.getElementById('province') as HTMLSelectElement;
    const canton = document.getElementById('canton') as HTMLSelectElement;
    const district = document.getElementById('district') as HTMLSelectElement;
    const dir = (document.getElementById('dir') as HTMLInputElement);
    const phone = (document.getElementById('phone') as HTMLInputElement);

    if (idClient.value === '' || name.value === '' || lastName1.value === '' || lastName2.value === '' || username.value === '' ||
      phone.value === '' || birth.value === '' || dir.value === '' || pass.value === '' || passConfirm.value === '' || province.value === 'Seleccione una provincia' ||
      canton.value === 'Seleccione un cantón' || district.value === 'Seleccione un distrito' || dir.value === '') {
        this.utilsService.showInfoModal('Error', 'Por favor complete todos los campos.', 'saveMsjLabel', 'msjText', 'saveMsj');
        return;
    }

    if (pass.value !== passConfirm.value) {
      this.utilsService.showInfoModal('Error', 'La contraseña debe ser igual en ambos campos', 'saveMsjLabel', 'msjText', 'saveMsj');
      return;
    }
    const client = new Client(idClient.value, phone.value, birth.value, lastName1.value, lastName2.value,
      province.value, canton.value, district.value, username.value, pass.value, name.value, dir.value);
    this.createClient(client);
      // this.utilsService.cleanField([idClient, name, lastName1, lastName2, username, pass, phone, dir, passConfirm, birth],
      //   [province, canton, district], ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);

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
    const index = this.provinces.indexOf(province) + 1;
    this.getCantons(index.toString());
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    const idCanton = this.cantons.indexOf(canton) + 1;
    const idProvince = this.provinces.indexOf((document.getElementById('province') as HTMLSelectElement).value) + 1;
    console.log(idCanton + '\n' + idProvince);
    this.getDistricts(idCanton.toString(), idProvince.toString());
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
    if (this.created) {
      this.router.navigate(['']);
    }
  }
}
