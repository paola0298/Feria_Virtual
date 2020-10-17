import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service'

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  private utilsService: UtilsService = new UtilsService();
  updating: boolean = false;
  provinces = [];
  cantons = [];
  districts = [];
  producers = [
    {
    id: 402390083,
    name: 'Paola',
    lastName: 'Villegas',
    lastName2: 'Chacon',
    sinpe: 123456789,
    phone: 83216963,
    birth: '1998-06-02',
    province: 'Heredia',
    canton: 'Central',
    district: 'Varablanca',
    dir: 'Minisuper Varablanca',
    deliver: ['Heredia']
    },
    {
      id: 122200589521,
      name: 'Marlon',
      lastName: 'Vega',
      lastName2: 'Chinchilla',
      sinpe: 123456789,
      phone: 70143773,
      birth: '1999-01-11',
      province: 'San José',
      canton: 'Escazú',
      district: 'San Antonio',
      dir: 'Residencial Vista de Oro',
      deliver: ['San Jose']
    }
  ];
  actualProducer;
  deliveryZones:string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.utilsService.configureContextMenu();

    //Cargar las provincias al iniciar el componente
    this.getProvinces();
  }

  /**
   * Metodo para almacenar el nuevo productor
   */
  saveProducer(): void {
    let id = (document.getElementById("idProducer") as HTMLInputElement);
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
    
    // TODO verificar que se haya ingresado alguna provincia, canton y distrito
    if (id.value == '' || name.value == '' || lastName1.value == '' || lastName2.value == '' || sinpe.value == '' || phone.value == '' || birth.value == '' ||
      dir.value == '' || this.deliveryZones.length == 0) {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
    } else {
      // TODO guardar productor
      let idN = Number(id.value);
      let phoneN = Number(phone.value);
      let sinpeN = Number(sinpe.value);
      var producer = {
        id: idN, name: name.value, lastName: lastName1.value, lastName2: lastName2.value,
        sinpe: sinpeN, phone: phoneN, birth: birth.value, province: province.value,
        canton: canton.value, district: district.value, dir: dir.value,
        deliver: this.deliveryZones};
      

      if (this.updating) {
        this.utilsService.showInfoModal("Exito", "Productor actualizado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        let indexProducer = this.producers.indexOf(this.actualProducer);
        this.producers[indexProducer] = producer;
        this.updating = false;
        document.getElementById("idProducer").removeAttribute('disabled');

      } else {
        this.utilsService.showInfoModal("Exito", "Nueva productor guardado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.producers.push(producer);
      }
      this.utilsService.cleanField([id, name, lastName1, lastName2, sinpe, phone, dir, birth],
        [province, canton, district], ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);
      this.deliveryZones = [];
    }
  }

  /**
   * Metodo para actualizar la informacion de un productor
   */
  updateProducer(): void {


    this.loadCanton(this.actualProducer.province);
    this.loadDistrict(this.actualProducer.canton);

    document.getElementById("idProducer").setAttribute('disabled', 'true');
    this.updating = true;
    // Cargar los datos del productor en el formulario y deshabilitar el campo de id
    (document.getElementById("idProducer") as HTMLInputElement).value = this.actualProducer.id;
    (document.getElementById("name") as HTMLInputElement).value = this.actualProducer.name;
    (document.getElementById("last-name1") as HTMLInputElement).value = this.actualProducer.lastName;
    (document.getElementById("last-name2") as HTMLInputElement).value = this.actualProducer.lastName2;
    (document.getElementById("sinpe") as HTMLInputElement).value = this.actualProducer.sinpe;
    (document.getElementById("phone") as HTMLInputElement).value = this.actualProducer.phone;
    (document.getElementById("birth") as HTMLInputElement).value = this.actualProducer.birth;
    (document.getElementById("dir") as HTMLInputElement).value = this.actualProducer.dir;

    (document.getElementById("province") as HTMLSelectElement).value = this.actualProducer.province;
    (document.getElementById("canton") as HTMLSelectElement).value = this.actualProducer.canton;
    (document.getElementById('district') as HTMLSelectElement).value = this.actualProducer.district;  

    this.deliveryZones = this.actualProducer.deliver;
    // console.log(document.getElementById("province").getAttribute("selected"));
  }

  /**
   * Metodo para eliminar un productor
   */
  deleteProducer(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.producers.indexOf(this.actualProducer, 0);
    this.producers.splice(index, 1);
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

    //document.getElementById("province").setAttribute("selected", province);
    var index = this.provinces.indexOf(province) + 1;
    console.log(index + ": index of province");
    this.getCantons(index.toString());
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    //document.getElementById("canton").setAttribute("selected", canton);
    var idCanton = this.cantons.indexOf(canton) + 1;
    var idProvince = this.provinces.indexOf((document.getElementById("province") as HTMLSelectElement).value) + 1;
    console.log("indice canton " + idCanton + '\n' + "indice provincia " +  idProvince);
    this.getDistricts(idCanton.toString(), idProvince.toString());
  }

  /**
   * Metodo para colocar el distrito seleccionado en el nombre del dropdown 
   * @param district
   */
  setActualDistrict(district: string): void {
    document.getElementById("district").setAttribute("selected", district);
  }

  /**
   *Metodo que se llama cuando se presiona click derecho en el item de la tabla
   * @param event Evento de click derecho
   * @param producer Productor seleccionado
   */
  onProducerClick(event: any, producer: any): boolean {
    this.utilsService.showContextMenu(event);
    this.actualProducer = producer;
    return false;
  }
  
   /**
   * Metodo para mostrar al usuario un modal para tomar una decision de si o no
   */
  askUser(): void {
    this.utilsService.showInfoModal("Eliminar", "Esta seguro que desea eliminar al productor con la identificacion " + this.actualProducer.id,
    "optionMsjLabel", "optionText", "optionMsj");
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
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

}
