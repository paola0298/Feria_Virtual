import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { parseJSON } from 'jquery';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {
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
    
    document.getElementsByTagName('body')[0].addEventListener('click', (e: Event) => {
      var menu = document.getElementById('context-menu');
      if (menu.style.getPropertyValue('display') == 'block') {
        menu.style.setProperty('display', 'none');
      }
      var tds = document.getElementsByTagName('td');
      for (let i = 0; i < tds.length; i++) {
        tds[i].style.setProperty('box-shadow', 'none');
      }
    });

    var menuItems = document.getElementById('context-menu').getElementsByTagName('a');
    for (let i = 0; i<menuItems.length; i++) {
      menuItems[i].addEventListener('click', (e:Event) => {
        menuItems[i].parentElement.style.setProperty('display', 'none');
      })
    }


  }

  getProvinces() {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.provinces = Object.values(json);
      }
    }
  }

  getCantons(provinceId: string ): void {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + provinceId + '/cantones.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.cantons = Object.values(json);
      }
    }
  }

  getDistricts(idCanton: string, idProvince: string): void {
    const Http = new XMLHttpRequest();
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + idProvince + '/canton/' + idCanton + '/distritos.json';
    Http.open('GET', url);
    Http.send();
    var self = this;
    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(Http.responseText);
        self.districts = Object.values(json);
      }
    }
  }

  /**
   *Metodo que se llama cuando se presiona click derecho en el item de la tabla
   * @param event Evento de click derecho
   * @param producer Productor seleccionado
   */
  onProducerClick(event: any, producer: any): boolean {
    this.showContextMenu(event);
    // console.log(producer);
    this.actualProducer = producer;
    return false;
  }

  /**
   * Metodo para mostrar el menu contextual al presionar click derecho
   * @param event
   */
  showContextMenu(event: MouseEvent): boolean {
    var tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
      tds[i].style.setProperty('box-shadow', 'none');
    }
    
    var top = event.pageY - 10;
    var left = event.pageX - 120;

    var menu = document.getElementById('context-menu');
    menu.style.setProperty('display', 'block');
    menu.style.setProperty('top', top.toString() + 'px')
    menu.style.setProperty('left', left.toString() + 'px');
    return false;
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
   * Metodo para almacenar el nuevo productor
   */
  saveProducer(): void {
    let id = (document.getElementById("id") as HTMLInputElement).value;
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement).value;
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement).value;
    let sinpe = (document.getElementById("sinpe") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let birth = (document.getElementById("birth") as HTMLInputElement).value;
    let province = document.getElementById("provinceDDM").textContent;
    let canton = document.getElementById("cantonDDM").textContent;
    let district = document.getElementById("districtDDM").textContent;
    let dir = (document.getElementById("dir") as HTMLInputElement).value;
    let deliver = (document.getElementById("deliver") as HTMLInputElement).value;
    console.log('id:' + id + '\n' + 'name:' + name + '\n' + 'lastName1:' + lastName1 + '\n' +
      'lastName2:' + lastName2 + '\n' + 'sinpe:' + sinpe + '\n' + 'phone:' + phone + '\n' +
      'birth:' + birth + '\n' + 'province:' + province + '\n' + 'canton:' + canton + '\n' +
      'district:' + district + '\n' + 'dir:' + dir + '\n' + 'deliver:' + deliver);

    // TODO verificar que se haya ingresado alguna provincia, canton y distrito
    if (id == '' || name == '' || lastName1 == '' || lastName2 == '' || sinpe == '' || phone == '' || birth == '' ||
      dir == '' || deliver == '') {
      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Error al guardar el nuevo productor";
      document.getElementById("msjText").textContent = "Por favor complete todos los campos.";
    } else {
      // TODO guardar productor
      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Exito";
      document.getElementById("msjText").textContent = "Nuevo productor guardado correctamente.";
      // TODO actualizar la tabla de productores
    }

  }

  /**
   * Metodo para actualizar la informacion de un productor
   */
  updateProducer(): void {
    console.log("Updating producer: " + this.actualProducer.name);
    // Cargar los datos del productor en el formulario y deshabilitar el campo de id
  }

  /**
   * Metodo para eliminar a un productor
   */
  askUser(): void {
    console.log("Deleting producer: " + this.actualProducer.name);

    var modal = document.getElementById('optionMsj');
    modal.style.setProperty('display', 'block');
    modal.style.setProperty('opacity', '100');
    
    document.getElementById("optionMsjLabel").textContent = "Eliminar";
    document.getElementById("optionText").textContent = "Esta seguro que desea eliminar al productor con la identificacion " + this.actualProducer.id;
  }

  deleteProducer(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    console.log("Deleting producer: " + this.actualProducer.name);
    const index = this.producers.indexOf(this.actualProducer, 0);
    this.producers.splice(index, 1);
  }
}
