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
    const url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    // let result = await this.makeRequest("GET", url);
    // //console.log(result);
    // return result;
    return this.makeRequest('GET', url);
  }

  /**
   * Metodo para obtener los cantones a partir de una provincia
   * @param provinceId Id de la provicia de la cual se desea conocer los cantones
   */
  async getCantons(provinceId: string): Promise<string[]> {
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + provinceId + '/cantones.json';
    // let result = await this.makeRequest("GET", url);
    // return result;
    return this.makeRequest('GET', url);
  }

  /**
   * Metodo para obtener los distritos a partir de una provincia y un canton
   * @param idCanton Id del canton del cual se desea conocer los distritos
   * @param idProvince Id de la provincia a la que pertenece el canton
   */
  async getDistricts(idCanton: string, idProvince: string): Promise<string[]> {
    const url = 'https://ubicaciones.paginasweb.cr/provincia/' + idProvince + '/canton/' + idCanton + '/distritos.json';
    // let result = await this.makeRequest("GET", url);
    // return result;
    return this.makeRequest('GET', url);
  }

  /**
   * Metodo para hacer una peticion a un url
   * @param method Metodo a utilizar
   * @param url Url al cual hacer la peticion
   */
  makeRequest(method: string, url: string): Promise<string[]> {
    const promise = new Promise<string[]>(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          const json = JSON.parse(this.responseText);
          resolve(Object.values(json));
        } else {
          const reason = {
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


  /**
   * Metodo para mostrar el menu contextual al presionar click derecho
   * @param event
   */
  showContextMenu(event: MouseEvent): boolean {
    const tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
      tds[i].style.setProperty('box-shadow', 'none');
    }
    const top = event.pageY - 250;
    const left = event.pageX - 120;
    const menu = document.getElementById('context-menu');
    menu.style.setProperty('display', 'block');
    menu.style.setProperty('top', top.toString() + 'px');
    menu.style.setProperty('left', left.toString() + 'px');
    return false;
  }

  /**
   * Metodo para configurar el menu contextual
   */
  configureContextMenu() {
    document.getElementsByTagName('body')[0].addEventListener('click', (e: Event) => {
      const menu = document.getElementById('context-menu');

      if (menu != null) {
        if (menu.style.getPropertyValue('display') === 'block') {
          menu.style.setProperty('display', 'none');
        }
        const tds = document.getElementsByTagName('td');
        for (let i = 0; i < tds.length; i++) {
          tds[i].style.setProperty('box-shadow', 'none');
        }
      }
    });

    const menuItems = document.getElementById('context-menu').getElementsByTagName('a');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', (e: Event) => {
        menuItems[i].parentElement.style.setProperty('display', 'none');
      });
    }
  }

  /**
   * Metodo para limpiar los campos
   * @param htmlElements Elementos HTML Input
   * @param dropdownElements Elementos de dropdown
   * @param dropdownNewTag Nuevas etiquetas de los dropdowns
   */
  cleanField(htmlElements: HTMLInputElement[], dropdownElements: HTMLSelectElement[], dropdownNewTag: string[]) {
    htmlElements.forEach(element => {
      element.value = '';
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
  showInfoModal(label: string, content: string, idLabel: string, idContent: string, idElement: string) {
    const modal = document.getElementById(idElement);
    modal.style.setProperty('display', 'block');
    modal.style.setProperty('opacity', '100');
    document.getElementById(idLabel).textContent = label;
    document.getElementById(idContent).textContent = content;
  }

}
