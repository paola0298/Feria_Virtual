import { Injectable } from '@angular/core';
import { Producer } from 'src/app/models/producer';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  provinces = [];

  constructor() { }

  /**
   * Metodo para obtener las provincias a partir de json
   */
  async getProvinces(): Promise<string[]> {
    var url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    // let result = await this.makeRequest("GET", url);
    // //console.log(result);
    // return result;
    return this.makeRequest("GET", url);
  }

  /**
   * Metodo para obtener los cantones a partir de una provincia
   * @param provinceId Id de la provicia de la cual se desea conocer los cantones
   */
  async getCantons(provinceId: string): Promise<string[]> {
    var url = 'https://ubicaciones.paginasweb.cr/provincia/' + provinceId + '/cantones.json';
    // let result = await this.makeRequest("GET", url);
    // return result;
    return this.makeRequest("GET", url);
  }

  /**
   * Metodo para obtener los distritos a partir de una provincia y un canton
   * @param idCanton Id del canton del cual se desea conocer los distritos
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  async getDistricts(idCanton: string, idProvince: string): Promise<string[]> {
    var url = 'https://ubicaciones.paginasweb.cr/provincia/' + idProvince + '/canton/' + idCanton + '/distritos.json';
    // let result = await this.makeRequest("GET", url);
    // return result;
    return this.makeRequest("GET", url);
  }

  /**
   * Metodo para hacer una peticion a un url
   * @param method Metodo a utilizar
   * @param url Url al cual hacer la peticion
   */
  makeRequest(method: string, url: string): Promise<string[]> {
    var promise = new Promise<string[]>(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          var json = JSON.parse(this.responseText);
          resolve(Object.values(json));
        } else {
          var reason = {
            status: this.status,
            statusText: this.statusText
          };
          reject(reason);
        }
      };
      
      xhr.send();
    });

    return promise;
  }

  makeRequestProducers(method: string, url: string): Promise<Producer[]> {
    var promise = new Promise<Producer[]>(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          var json = JSON.parse(this.responseText);
          console.log(this.responseText);
          resolve(json);
        } else {
          var reason = {
            status: this.status,
            statusText: this.statusText
          };
          reject(reason);
        }
      };
      xhr.send();
    });
    return promise;
  }

  async getProducers(): Promise<Producer[]> {
    var url = "https://localhost:5001/api/Productores";
    return this.makeRequestProducers("GET", url);
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
    var top = event.pageY - 250;
    var left = event.pageX - 120;
    var menu = document.getElementById('context-menu');
    menu.style.setProperty('display', 'block');
    menu.style.setProperty('top', top.toString() + 'px')
    menu.style.setProperty('left', left.toString() + 'px');
    return false;
  }

  /**
   * Metodo para configurar el menu contextual
   */
  configureContextMenu() {
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

  /**
   * Metodo para limpiar los campos
   * @param htmlElements Elementos HTML Input
   * @param dropdownElements Elementos de dropdown
   * @param dropdownNewTag Nuevas etiquetas de los dropdowns
   */
  cleanField(htmlElements:HTMLInputElement[], dropdownElements:HTMLSelectElement[], dropdownNewTag:string[]) {
    htmlElements.forEach(element => {
      element.value = ""
    });

    for (let index = 0; index < dropdownElements.length; index++) {
      dropdownElements[index].value = dropdownNewTag[index]; 
    }

  }

  /**
   * Metodo para mostrar un modal
   * @param label Etiqueta del modal
   * @param content Contenido del modal
   * @param idLabel id de la etiqueta del modal
   * @param idContent id del contenido del modal
   * @param idElement id del modal
   */
  showInfoModal(label:string, content:string, idLabel:string, idContent:string, idElement:string) {
    var modal = document.getElementById(idElement);
    modal.style.setProperty('display', 'block');
    modal.style.setProperty('opacity', '100');
    document.getElementById(idLabel).textContent = label;
    document.getElementById(idContent).textContent = content;
  }

}
