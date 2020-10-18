import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'
import { RestclientService } from 'src/app/services/restclient.service'
import { Category } from 'src/app/models/category'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  updating: boolean = false;
  actualCategory:Category;
  categories = []

  constructor(private utilsService: UtilsService, private restClientService: RestclientService) { }

  ngOnInit() {
    this.utilsService.configureContextMenu();
    this.loadCategories();
  }

  /**
   * Metodo para conectarse al servicio para obtener todas las categorias registradas
   */
  loadCategories() {
    var response = this.restClientService.getCategories();
    response.subscribe(
      (value:Category[]) => {
        this.categories = value;

      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  /**
   * Metodo que se conecta con el servicio para crear una nueva categoria
   * @param category Nueva categoria a incluir
   * @param inputElementName Elemnto html para limpiar los campos
   */
  createCategory(category:Category, inputElementName:HTMLInputElement) {
    var response = this.restClientService.createCategory(category);
    response.subscribe(
      (value:Category) => {
        this.loadCategories();
        this.utilsService.showInfoModal("Exito", "Nueva categoria guardada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.utilsService.cleanField([inputElementName], [], []);
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        if (error.status == 409)
          this.utilsService.showInfoModal("Error", "La categoria ya existe", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  /**
   * Metodo para conectarse al servicio y eliminar una categoria 
   * @param id Id de la categoria a eliminar 
   */
  removeCategory(id:number) {
    var response = this.restClientService.deleteCategory(id);
    response.subscribe(
      (value:any) => {
        this.utilsService.showInfoModal("Exito", "Categoria eliminada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.loadCategories();
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Hubo un problema al eliminar la categoria.", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  /**
   * Metodo que se conecta con el servicio para actualizar una categoria
   * @param category Categoria a actualizar
   * @param inputElementName Elemnto html para limpiar los campos
   */
  modifyCategory(category:Category, inputElementName:HTMLInputElement) {
    var response = this.restClientService.updateCategory(category);
    response.subscribe(
      (value:any) => {
        this.utilsService.showInfoModal("Exito", "Categoria actualizada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.utilsService.cleanField([inputElementName], [], []);
        this.loadCategories();
        this.updating = false;
        (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Guardar";
      });
  }

  /**
   * Metodo para obtener los datos ingresados por el usuario y almacenarlos
   */
  saveCategory(): void {
    let name = (document.getElementById("nameCategory") as HTMLInputElement);

    if (name.value == '') {
      this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
      return;
    }
    //TODO guardar categoria 
    var category = new Category(name.value);
    if (this.updating) {
      category.id = this.actualCategory.id;
      this.modifyCategory(category, name);
    } else {
      this.createCategory(category, name);
    }
  }


  /**
   * Metodo para actualizar una categoria
   */
  updateCategory(): void {
    console.log("Updating category: " + this.actualCategory.id + " " + this.actualCategory.nombre);
    (document.getElementById("nameCategory") as HTMLInputElement).value = this.actualCategory.nombre;
    (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Actualizar";
    this.updating = true;
  }

  /**
   * Metodo para eliminar una categoria
   */
  deleteCategory(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    this.removeCategory(this.actualCategory.id);
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

  /**
   * Metodo para mostrar el menu contextual en la tabla al presionar click derecho
   * @param event Evento del mouse 
   * @param category Categoria seleccionada
   */
  onCategoryClick(event:any, category:any):boolean {
    this.utilsService.showContextMenu(event);
    this.actualCategory = category;
    return false;
  }

  /**
   * Metodo para mostrar al usuario un modal para tomar una decision de si o no
   */
  askUser(): void {
    this.utilsService.showInfoModal("Eliminar", "Esta seguro que desea eliminar la categoria: " + this.actualCategory.nombre,
    "optionMsjLabel", "optionText", "optionMsj");
  }
}
