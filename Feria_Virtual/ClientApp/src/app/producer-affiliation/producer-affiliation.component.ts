import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Producer } from '../models/producer';
import { RestclientService } from '../services/restclient.service';

@Component({
  selector: 'app-producer-affiliation',
  templateUrl: './producer-affiliation.component.html',
  styleUrls: ['./producer-affiliation.component.css']
})
export class ProducerAffiliationComponent implements OnInit {

  provinces = [];
  cantons = [];
  districts = [];
  deliveryZones = [];

  constructor(private utilsService: UtilsService, private restClientService: RestclientService) { }

  ngOnInit() {
    this.getProvinces();
  }

  /**
   * Metodo que se conecta con el servicio para enviar una solicitud de afiliacion de un productor
   * @param producer Productor a crear
   * @param htmlElements Elementos html input para limpiar los campos
   * @param selectElements Elementos html select para limpiar los campos
   */
  sendAffiliation(producer: Producer, htmlElements: HTMLInputElement[], selectElements: HTMLSelectElement[]) {
    const response = this.restClientService.sendAffiliationRequest(producer);
    response.subscribe(
      (value: any) => {
        this.utilsService.showInfoModal('Exito', 'Su solicitud esta siendo vertificada.', 'saveMsjLabel', 'msjText', 'saveMsj');
        this.utilsService.cleanField(htmlElements, selectElements, ['Seleccione una provincia', 'Seleccione un cantón', 'Seleccione un distrito']);
        this.deliveryZones = [];
    }, (error: any) => {
      console.log(error.statusText);
      console.log(error.status);
    });
  }

  /**
   * Metodo para guardar la solicitud de afiliacion de un productor
   */
  saveProducer(): void {
    const id = (document.getElementById('id') as HTMLInputElement);
    const name = (document.getElementById('name') as HTMLInputElement);
    const lastName1 = (document.getElementById('last-name1') as HTMLInputElement);
    const lastName2 = (document.getElementById('last-name2') as HTMLInputElement);
    const sinpe = (document.getElementById('sinpe') as HTMLInputElement);
    const phone = (document.getElementById('phone') as HTMLInputElement);
    const birth = (document.getElementById('birth') as HTMLInputElement);
    const province = (document.getElementById('province') as HTMLSelectElement);
    const canton = (document.getElementById('canton') as HTMLSelectElement);
    const district = (document.getElementById('district') as HTMLSelectElement);
    const pass = (document.getElementById('pass') as HTMLInputElement);
    const passConfirm = (document.getElementById('passConfirm') as HTMLInputElement);


    if (id.value === '' || name.value === '' || lastName1.value === '' || lastName2.value === '' || sinpe.value === '' ||
        phone.value === '' || birth.value === '' || this.deliveryZones.length === 0 || passConfirm.value === '' ||
        pass.value === '' || province.value === 'Seleccione una provincia' ||
        canton.value === 'Seleccione un cantón' || district.value === 'Seleccione un distrito') {
        this.utilsService.showInfoModal('Error', 'Por favor complete todos los campos.', 'saveMsjLabel', 'msjText', 'saveMsj');
        return;
    }

    if (passConfirm.value !== pass.value) {
      this.utilsService.showInfoModal('Error', 'La contraseña debe ser igual en ambos campos', 'saveMsjLabel', 'msjText', 'saveMsj');
      return;
    }

    const producer = new Producer(name.value, id.value, pass.value, lastName1.value, lastName2.value, sinpe.value,
      phone.value, birth.value, province.value, canton.value, district.value, this.deliveryZones);
    this.sendAffiliation(producer, [id, name, lastName1, lastName2, sinpe, phone, birth, pass, passConfirm],
      [province, canton, district]);
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
    console.log('loading canton');
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
    console.log(this.districts);
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


  addDeliveryZone() {
    console.log('Adding delivery zone');
    const newZone = (document.getElementById('delivery') as HTMLInputElement).value;
    if (newZone !== '') {
      this.deliveryZones.push(newZone);
      (document.getElementById('delivery') as HTMLInputElement).value = '';
    } else {
      this.utilsService.showInfoModal('Error', 'Por favor ingrese un lugar de entrega', 'saveMsjLabel', 'msjText', 'saveMsj');
    }

  }

  deleteDeliveryZone(zone: string) {
    console.log('removing ' + zone);
    const index = this.deliveryZones.indexOf(zone);
    this.deliveryZones.splice(index, 1);
  }

  closeModal(modal: string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }

}
