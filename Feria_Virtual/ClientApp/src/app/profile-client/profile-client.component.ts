import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { RestclientService } from 'src/app/services/restclient.service';
import { Client } from '../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {


  provinces: string[] = [];
  cantons: string[] = [];
  districts: string[] = [];
  actionFlag = false;
  actualClient: Client;
  updating = false;

  constructor(private changeDetection: ChangeDetectorRef, private utilsService: UtilsService,
    private restClientService: RestclientService, private router: Router) { }

  ngOnInit() {
    (document.getElementById('province') as HTMLSelectElement).disabled = true;
    (document.getElementById('canton') as HTMLSelectElement).disabled = true;
    (document.getElementById('district') as HTMLSelectElement).disabled = true;

    this.getClient();
  }

  /**
   * Metodo que se conecta al servicio para obtener la información del cliente actual
   */
  getClient() {
    const idClient = window.localStorage.getItem('userId');
    const response = this.restClientService.getClient(idClient);
    response.subscribe(
      (value: Client) => {
        this.actualClient = value;
        this.setData();
      }, (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
      });

  }

  /**
   * Metodo que se conecta al servicio para actualizar la información de un cliente
   * @param client Objeto tipo Client
   */
  updateClient(client: Client) {
    const response = this.restClientService.updateClient(client);
    response.subscribe(
      (value: any) => {
        this.utilsService.showInfoModal('Exito', 'Sus datos han sido actualizados correctamente.', 'saveMsjLabel', 'msjText', 'saveMsj');
      }, (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal('Error', 'No se han podido actualizar sus datos.', 'saveMsjLabel', 'msjText', 'saveMsj');

      });
  }

  /**
   * Metodo para mostrar los datos del cliente actual
   */
  async setData() {
    await this.loadProvinces();
    await this.loadCanton(this.actualClient.provincia);
    await this.loadDistrict(this.actualClient.canton);
    this.changeDetection.detectChanges();

    const birthDateTime = this.actualClient.fechaNacimiento;
    const index = birthDateTime.indexOf('T');
    const birth = birthDateTime.substring(0, index);

    (document.getElementById('idClient') as HTMLInputElement).value = this.actualClient.identificacion;
    (document.getElementById('name') as HTMLInputElement).value = this.actualClient.nombre;
    (document.getElementById('last-name1') as HTMLInputElement).value = this.actualClient.apellido1;
    (document.getElementById('last-name2') as HTMLInputElement).value = this.actualClient.apellido2;
    (document.getElementById('birth') as HTMLInputElement).value = birth;
    // (document.getElementById("dir") as HTMLInputElement).value = this.actualProducer.direccionExacta;
    (document.getElementById('phone') as HTMLInputElement).value = this.actualClient.telefono;
    (document.getElementById('dir') as HTMLInputElement).value = this.actualClient.direccionExacta;

    const provinceSelect = (document.getElementById('province') as HTMLSelectElement);
    provinceSelect.value = this.actualClient.provincia;
    const cantonSelect = (document.getElementById('canton') as HTMLSelectElement);
    cantonSelect.value = this.actualClient.canton;
    const districtSelect = (document.getElementById('district') as HTMLSelectElement);
    districtSelect.value = this.actualClient.distrito;

  }

  /**
   * Metodo para realizar la accion necesaria al presionar el boton de actualizar
   */
  updateData() {

    this.actionFlag = !this.actionFlag;
    const id = (document.getElementById('idClient') as HTMLInputElement);
    const name = (document.getElementById('name') as HTMLInputElement);
    const lastName1 = (document.getElementById('last-name1') as HTMLInputElement);
    const lastName2 = (document.getElementById('last-name2') as HTMLInputElement);
    const birth = (document.getElementById('birth') as HTMLInputElement);
    const dir = (document.getElementById('dir') as HTMLInputElement);
    const phone = (document.getElementById('phone') as HTMLInputElement);
    const province = (document.getElementById('province') as HTMLSelectElement);
    const canton = (document.getElementById('canton') as HTMLSelectElement);
    const district = (document.getElementById('district') as HTMLSelectElement);

    if (this.actionFlag) {
      this.setProfileEditable(id, name, lastName1, lastName2, birth, dir, phone, province, canton, district);
      this.updating = true;

    } else {
      this.saveProfileData(id, name, lastName1, lastName2, birth, dir, phone, province, canton, district);
      this.updating = false;
    }
  }

  /**
   * Metodo para hacer que el perfil del usuario se pueda editar
   * @param id HTMLInputElement de la identificacion
   * @param name HTMLInputElement del nombre
   * @param lastName1 HTMLInputElement del apellido1
   * @param lastName2 HTMLInputElement del apellido2
   * @param birth HTMLInputElement de la fecha de nacimiento
   * @param dir HTMLInputElement de la direccion exacta
   * @param phone HTMLInputElement del telefono
   * @param province HTMLSelectElement de la provincia
   * @param canton HTMLSelectElement del canton
   * @param district HTMLSelectElement del distrito
   */
  setProfileEditable(id: HTMLInputElement, name: HTMLInputElement, lastName1: HTMLInputElement, lastName2: HTMLInputElement,
    birth: HTMLInputElement, dir: HTMLInputElement, phone: HTMLInputElement, province: HTMLSelectElement,
    canton: HTMLSelectElement, district: HTMLSelectElement) {
      // id.removeAttribute("disabled");
      name.removeAttribute('disabled');
      lastName1.removeAttribute('disabled');
      lastName2.removeAttribute('disabled');
      birth.removeAttribute('disabled');
      dir.removeAttribute('disabled');
      phone.removeAttribute('disabled');
      province.disabled = false;
      canton.disabled = false;
      district.disabled = false;

  }

  /**
   * Metodo para obtener los nuevos datos del cliente y actualizarlo
   * @param id HTMLInputElement de la identificacion
   * @param name HTMLInputElement del nombre
   * @param lastName1 HTMLInputElement del apellido1
   * @param lastName2 HTMLInputElement del apellido2
   * @param birth HTMLInputElement de la fecha de nacimiento
   * @param dir HTMLInputElement de la direccion exacta
   * @param phone HTMLInputElement del telefono
   * @param province HTMLSelectElement de la provincia
   * @param canton HTMLSelectElement del canton
   * @param district HTMLSelectElement del distrito
   */
  saveProfileData(id: HTMLInputElement, name: HTMLInputElement, lastName1: HTMLInputElement, lastName2: HTMLInputElement,
    birth: HTMLInputElement, dir: HTMLInputElement, phone: HTMLInputElement, province: HTMLSelectElement,
    canton: HTMLSelectElement, district: HTMLSelectElement) {
      // id.setAttribute("disabled", "true");
      name.setAttribute('disabled', 'true');
      lastName1.setAttribute('disabled', 'true');
      lastName2.setAttribute('disabled', 'true');
      birth.setAttribute('disabled', 'true');
      dir.setAttribute('disabled', 'true');
      phone.setAttribute('disabled', 'true');
      province.disabled = true;
      canton.disabled = true;
      district.disabled = true;

      if (name.value === '' || lastName1.value === '' || lastName2.value === '' || birth.value === '' ||
      phone.value === '' || province.value === 'Seleccione una provincia' || canton.value === 'Seleccione un cantón' ||
      district.value === 'Seleccione un distrito' || dir.value === '') {
        this.utilsService.showInfoModal('Error', 'Por favor complete todos los campos.', 'saveMsjLabel', 'msjText', 'saveMsj');
        return;
      }

      const client = new Client(id.value, phone.value, birth.value, lastName1.value, lastName2.value, province.value,
        canton.value, district.value, this.actualClient.usuario, this.actualClient.password, name.value, dir.value);
      this.updateClient(client);
  }

  /**
   * Metodo que se conecta al servicio para eliminar la cuenta de un cliente
   */
  deleteAccount() {
    const response = this.restClientService.deleteClient(this.actualClient.identificacion);
    response.subscribe(
      (value: any) => {
        window.localStorage.clear();
        this.router.navigate(['']);
      }, (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal('Error', 'No se ha podido eliminar su cuenta.', 'saveMsjLabel', 'msjText', 'saveMsj');
      });
  }

  /**
   * Metodo para cargar las provincias
   */
  async loadProvinces() {
    this.provinces = await this.utilsService.getProvinces();
  }

  /**
   * Metodo para cargar los cantones de una provincia en específico
   * @param province Provincia
   */
  async loadCanton(province: string) {
    const index = this.provinces.indexOf(province) + 1;

    if (index === 0) {
      console.log('invalid province id: ' + index);
      return;
    }

    this.cantons = await this.utilsService.getCantons(index.toString());
  }

  /**
   * Metodo para cargar los distritos de un canton en especifico
   * @param canton Canton
   */
  async loadDistrict(canton: string) {
    //
    const cantonId = this.cantons.indexOf(canton) + 1;
    let provinceId;
    if (this.updating) {
      provinceId = this.provinces.indexOf((document.getElementById('province') as HTMLSelectElement).value) + 1;
    } else {
      provinceId = this.provinces.indexOf(this.actualClient.provincia) + 1;
    }


    if (cantonId === 0) {
      console.log('invalid canton id: ' + cantonId);
      return;
    }

    this.districts = await this.utilsService.getDistricts(cantonId.toString(), provinceId.toString());
    console.log('District loading done');
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

   /**
   * Metodo para mostrar al usuario un modal para tomar una decision de si o no
   */
  askUser(): void {
    this.utilsService.showInfoModal('Eliminar', '¿Esta seguro que desea eliminar su cuenta?',
    'optionMsjLabel', 'optionText', 'optionMsj');
  }
}
