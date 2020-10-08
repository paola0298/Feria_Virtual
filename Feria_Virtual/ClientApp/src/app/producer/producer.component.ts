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
    birth: '02-06-1998',
    province: 'Heredia',
    canton: 'Heredia',
    district: 'Vara Blanca',
    dir: 'Minisuper Vara Blanca',
    deliver: 'Heredia'
    },
    {
      id: 122200589521,
      name: 'Marlon',
      lastName: 'Vega',
      lastName2: 'Chinchilla',
      sinpe: 123456789,
      phone: 70143773,
      birth: '11-01-1999',
      province: 'San Jose',
      canton: 'Escazu',
      district: 'San Antonio',
      dir: 'Residencial Vista de Oro',
      deliver: 'San Jose'
    }
  ];
  actualProducer;

  constructor() { }

  ngOnInit(): void {
    this.utilsService.configureContextMenu();
  }

  async getProvinces() {
    this.provinces = await this.utilsService.getProvinces();
    console.log(this.provinces);
  }

  async getCantons(provinceId: string) {
    this.cantons = await this.utilsService.getCantons(provinceId);
  }

  async getDistricts(idCanton: string, idProvince: string) {
    this.districts = await this.utilsService.getDistricts(idCanton, idProvince);
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
   * Metodo para almacenar el nuevo productor
   */
  saveProducer(): void {
    let id = (document.getElementById("id") as HTMLInputElement);
    let name = (document.getElementById("name") as HTMLInputElement);
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement);
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement);
    let sinpe = (document.getElementById("sinpe") as HTMLInputElement);
    let phone = (document.getElementById("phone") as HTMLInputElement);
    let birth = (document.getElementById("birth") as HTMLInputElement);
    let province = document.getElementById("provinceDDM");
    let canton = document.getElementById("cantonDDM");
    let district = document.getElementById("districtDDM");
    let dir = (document.getElementById("dir") as HTMLInputElement);
    let deliver = (document.getElementById("deliver") as HTMLInputElement);
    

    

    // TODO verificar que se haya ingresado alguna provincia, canton y distrito
    if (id.value == '' || name.value == '' || lastName1.value == '' || lastName2.value == '' || sinpe.value == '' || phone.value == '' || birth.value == '' ||
      dir.value == '' || deliver.value == '') {
        this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
    } else {
      // TODO guardar productor
      let idN = Number(id.value);
      let phoneN = Number(phone.value);
      let sinpeN = Number(sinpe.value);

      var producer = {
        id: idN,
        name: name.value,      
        lastName: lastName1.value,
        lastName2: lastName2.value,
        sinpe: sinpeN,
        phone: phoneN,
        birth: birth.value,
        province: province.textContent,
        canton: canton.textContent,
        district: district.textContent,
        dir: dir.value,
        deliver: deliver.value};
      

      if (this.updating) {
        this.utilsService.showInfoModal("Exito", "Productor actualizado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');

        let indexProducer = this.producers.indexOf(this.actualProducer);
        this.producers[indexProducer] = producer;
        this.updating = false;
        document.getElementById("id").removeAttribute('disabled');

      } else {
        this.utilsService.showInfoModal("Exito", "Nueva productor guardado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.producers.push(producer);
      }
      this.utilsService.cleanField([id, name, lastName1, lastName2, sinpe, phone, dir, deliver],
        [province, canton, district], ["Provincia", "Canton", "Distrito"]);
    }
  }

  /**
   * Metodo para actualizar la informacion de un productor
   */
  updateProducer(): void {
    console.log("Updating producer: " + this.actualProducer);
    document.getElementById("id").setAttribute('disabled', 'true');
    this.updating = true;
    // Cargar los datos del productor en el formulario y deshabilitar el campo de id
    (document.getElementById("id") as HTMLInputElement).value = this.actualProducer.id;
    (document.getElementById("name") as HTMLInputElement).value = this.actualProducer.name;
    (document.getElementById("last-name1") as HTMLInputElement).value = this.actualProducer.lastName;
    (document.getElementById("last-name2") as HTMLInputElement).value = this.actualProducer.lastName2;
    (document.getElementById("sinpe") as HTMLInputElement).value = this.actualProducer.sinpe;
    (document.getElementById("phone") as HTMLInputElement).value = this.actualProducer.phone;
    (document.getElementById("birth") as HTMLInputElement).value = this.actualProducer.birth;
    document.getElementById("provinceDDM").textContent = this.actualProducer.province;
    document.getElementById("cantonDDM").textContent = this.actualProducer.canton;
    document.getElementById("districtDDM").textContent = this.actualProducer.district;
    (document.getElementById("dir") as HTMLInputElement).value = this.actualProducer.dir;
    (document.getElementById("deliver") as HTMLInputElement).value = this.actualProducer.deliver;
  }

  /**
   * Metodo para eliminar a un productor
   */
  askUser(): void {
    this.utilsService.configureDeleteModal("Esta seguro que desea eliminar al productor con la identificacion " + this.actualProducer.id);
  }

  deleteProducer(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.producers.indexOf(this.actualProducer, 0);
    this.producers.splice(index, 1);
  }

  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }
}
