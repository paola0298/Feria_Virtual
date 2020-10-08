import { Injectable } from '@angular/core';
import { utils } from 'protractor';

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
    let result = await this.makeRequest("GET", url);
    console.log(result);
    return result;
  }

  /**
   * Metodo para obtener los cantones a partir de una provincia
   * @param provinceId Id de la provicia de la cual se desea conocer los cantones
   */
  async getCantons(provinceId: string): Promise<string[]> {
    var url = 'https://ubicaciones.paginasweb.cr/provincia/' + provinceId + '/cantones.json';
    let result = await this.makeRequest("GET", url);
    return result;
  }

  /**
   * Metodo para obtener los distritos a partir de una provincia y un canton
   * @param idCanton Id del canton del cual se desea conocer los distritos
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  async getDistricts(idCanton: string, idProvince: string) {
    var url = 'https://ubicaciones.paginasweb.cr/provincia/' + idProvince + '/canton/' + idCanton + '/distritos.json';
    let result = await this.makeRequest("GET", url);
    return result;
  }

  /**
   * Metodo para hacer una peticion a un url
   * @param method Metodo a utilizar
   * @param url Url al cual hacer la peticion
   */
  makeRequest(method, url): Promise<string[]> {
    var self = this;
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          var json = JSON.parse(xhr.responseText);
          resolve(Object.values(json));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.send();
    });
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
  cleanField(htmlElements:HTMLInputElement[], dropdownElements:HTMLElement[], dropdownNewTag:string[]) {
    htmlElements.forEach(element => {
      element.value = ""
    });

    for (let index = 0; index < dropdownElements.length; index++) {
      dropdownElements[index].textContent = dropdownNewTag[index];
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
