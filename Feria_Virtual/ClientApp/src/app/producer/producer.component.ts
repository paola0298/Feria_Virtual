import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Producer } from 'src/app/models/producer';
import { RestclientService } from 'src/app/services/restclient.service';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {
  updating: boolean = false;
  provinces: string[] = [];
  cantons: string[] = [];
  districts: string[] = [];
  producers = [];
  actualProducer: Producer;
  deliveryZones:string[] = [];
  testProducer: Producer;


  constructor(private restClientService: RestclientService, private utilsService: UtilsService) { 
    // this.testProducer = new Producer("Paola", "4023900831", "Villegas", "Chacon", "123456789", "83216963", "1998-02-06", "Heredia", "Heredia", "Varablanca", ["Heredia"]);
  }

  ngOnInit(): void {
    this.utilsService.configureContextMenu();
    //Cargar las provincias al iniciar el componente
    this.getProvinces();
    this.loadProducers();
  }

  /**
   * Metodo que se conecta con el servicio para crear un nuevo productor
   * @param producer Productor a crear
   * @param htmlElements Elementos html input para limpiar los campos
   * @param selectElements Elementos html select para limpiar los campos
   */
  createProducer(producer:Producer, htmlElements:HTMLInputElement[], selectElements:HTMLSelectElement[]){
    var response = this.restClientService.createProducer(producer);
    response.subscribe(
      (value:Producer) => {
        console.log("Producer " + value);
        this.loadProducers();
        this.utilsService.showInfoModal("Exito", "Nueva productor guardado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.utilsService.cleanField(htmlElements,selectElements, 
          ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);
        this.deliveryZones = [];
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        if (error.status == 409)
          this.utilsService.showInfoModal("Error", "El productor ya existe", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  //Funciono: Ok, NoContent, Created
  //No funciono: BadRequest, NotFound, Conflict

  /**
   * Metodo para conectrase al servicio para obtener todos los productores registrados
   */
  loadProducers() {
    var response = this.restClientService.getProducers();
    response.subscribe(
      (value:Producer[]) => {
        console.log("Producers " + value);
        this.producers = value;
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  removeProducer(id:string) {
    var response = this.restClientService.deleteProducer(id);
    response.subscribe(
      (value:any) => {
        console.log("Deleted");
        this.utilsService.showInfoModal("Exito", "Productor eliminado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.loadProducers();
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Hubo un problema al eliminar al productor.", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  /**
   * Metodo que se conecta con el servicio para actualizar un productor
   * @param producer Productor a actualizar
   * @param htmlElements Elementos html input para limpiar los campos
   * @param selectElements Elementos html select para limpiar los campos
   */
  modifyProducer(producer:Producer, htmlElements:HTMLInputElement[], selectElements:HTMLSelectElement[]) {
    var response = this.restClientService.updateProducer(producer);
    response.subscribe(
      (value:any) => {
        console.log("Updated");
        this.utilsService.showInfoModal("Exito", "Productor actualizado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        document.getElementById("idProducer").removeAttribute('disabled');
        document.getElementById("pass").removeAttribute('disabled');
        document.getElementById("passConfirm").removeAttribute('disabled');
        this.utilsService.cleanField(htmlElements,selectElements, ["Seleccione una provincia", "Seleccione un cantón", "Seleccione un distrito"]);
        this.deliveryZones = [];
        this.loadProducers();
        this.updating = false;
        (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Guardar nuevo productor";
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Hubo un problema al actualizar al productor.", "saveMsjLabel", "msjText", 'saveMsj');
      }
    );
  }

  getProducer(id:string) {
    var response = this.restClientService.getProducer(id);
    response.subscribe(
      (value:Producer) => {
        this.actualProducer = value;
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  /**
   * Metodo para almacenar el nuevo productor
   */
  async saveProducer() {

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
    let pass = (document.getElementById("pass") as HTMLInputElement);
    let passConfirm = (document.getElementById("passConfirm") as HTMLInputElement);
    
    // TODO verificar que se haya ingresado alguna provincia, canton y distrito
    if (id.value == '' || name.value == '' || lastName1.value == '' || lastName2.value == '' || sinpe.value == '' || phone.value == '' || birth.value == '' || 
    this.deliveryZones.length == 0 || province.value == 'Seleccione una provincia' || canton.value == 'Seleccione un cantón' || 
    district.value == 'Seleccione un distrito') {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
        return;
    }

    var producer = new Producer(name.value, id.value, pass.value, lastName1.value, lastName2.value, 
      sinpe.value, phone.value, birth.value, province.value, canton.value, district.value,
      this.deliveryZones);
    
    if (this.updating) {
      producer.afiliado = true;
      producer.password = this.actualProducer.password;
      this.modifyProducer(producer, [id, name, lastName1, lastName2, sinpe, phone, birth, pass, passConfirm], [province, canton, district]);
    } else {
      if (pass.value == '' || passConfirm.value == '') {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
        return;
      }
      if (passConfirm.value != pass.value) {
        this.utilsService.showInfoModal("Error", "La contraseña debe ser igual en ambos campos", "saveMsjLabel", "msjText", 'saveMsj');
        return;
      }

      this.createProducer(producer, [id, name, lastName1, lastName2, sinpe, phone, birth, pass, passConfirm], [province, canton, district]);
    }
  }

  /**
   * Metodo para actualizar la informacion de un productor
   */
  updateProducer(): void {
    this.updating = true;
    (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Actualizar";
    this.loadCanton(this.actualProducer.provincia);
    this.loadDistrict(this.actualProducer.canton);

    document.getElementById("idProducer").setAttribute('disabled', 'true');
    document.getElementById("pass").setAttribute('disabled', 'true');
    document.getElementById("passConfirm").setAttribute('disabled', 'true');
    // Cargar los datos del productor en el formulario y deshabilitar el campo de id

    var birthDateTime = this.actualProducer.fechaNacimiento;
    var index = birthDateTime.indexOf("T");
    var birth = this.actualProducer.fechaNacimiento.substring(0, index);

    (document.getElementById("idProducer") as HTMLInputElement).value = this.actualProducer.identificacion;
    (document.getElementById("name") as HTMLInputElement).value = this.actualProducer.nombre;
    (document.getElementById("last-name1") as HTMLInputElement).value = this.actualProducer.apellido1;
    (document.getElementById("last-name2") as HTMLInputElement).value = this.actualProducer.apellido2;
    (document.getElementById("sinpe") as HTMLInputElement).value = this.actualProducer.sinpe;
    (document.getElementById("phone") as HTMLInputElement).value = this.actualProducer.telefono;
    (document.getElementById("birth") as HTMLInputElement).value = birth;

    (document.getElementById("province") as HTMLSelectElement).value = this.actualProducer.provincia;
    (document.getElementById("canton") as HTMLSelectElement).value = this.actualProducer.canton;
    (document.getElementById('district') as HTMLSelectElement).value = this.actualProducer.distrito;  

    

    this.deliveryZones = this.actualProducer.lugaresEntrega;
  }

  /**
   * Metodo para eliminar un productor
   */
  deleteProducer(): void {
    this.removeProducer(this.actualProducer.identificacion);
    document.getElementById('optionMsj').style.setProperty('display', 'none');
  }

  /**
   * Metodo para obtener las provincias
   */
  async getProvinces() {
    this.provinces = await this.utilsService.getProvinces();
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
  onProducerClick(event: any, producer: Producer): boolean {
    this.utilsService.showContextMenu(event);
    this.getProducer(producer.identificacion);
    return false;
  }
  
   /**
   * Metodo para mostrar al usuario un modal para tomar una decision de si o no
   */
  askUser(): void {
    this.utilsService.showInfoModal("Eliminar", "Esta seguro que desea eliminar al productor con la identificacion " + this.actualProducer.identificacion,
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
