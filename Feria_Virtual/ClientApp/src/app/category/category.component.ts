import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private utilsService: UtilsService = new UtilsService();
  updating: boolean = false;
  actualCategory;
  categories = [{
    id:1,
    name:'verduras'
  }]
  isEnabled?: boolean = true;

  constructor() { }

  ngOnInit() {
    this.utilsService.configureContextMenu();
  }

  /**
   * Metodo para obtener los datos ingresados por el usuario y almacenarlos
   */
  saveCategory(): void {
    let id = (document.getElementById("idCategory") as HTMLInputElement);
    let name = (document.getElementById("nameCategory") as HTMLInputElement);

    if (id.value == '' || name.value == '') {
      this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
    } else {
      //TODO guardar categoria 
      let idN = Number(id.value);
      var category = {id:idN, name:name.value};

      if (this.updating) {
        this.utilsService.showInfoModal("Exito", "Categoria actualizada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        let indexCategory = this.categories.indexOf(this.actualCategory);
        this.categories[indexCategory] = category;
        this.updating = false;
        document.getElementById("idCategory").removeAttribute('disabled');
      } else {
        this.utilsService.showInfoModal("Exito", "Nueva categoria guardada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.categories.push(category);
      }
      this.utilsService.cleanField([id, name], [], []);
    }
  }

  /**
   * Metodo para actualizar una categoria
   */
  updateCategory(): void {
    console.log("Updating category: " + this.actualCategory.id + " " + this.actualCategory.name);
    (document.getElementById("idCategory") as HTMLInputElement).value = this.actualCategory.id;
    (document.getElementById("nameCategory") as HTMLInputElement).value = this.actualCategory.name;
    document.getElementById("idCategory").setAttribute('disabled', 'true');
    this.updating = true;
  }

  /**
   * Metodo para eliminar una categoria
   */
  deleteCategory(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.categories.indexOf(this.actualCategory, 0);
    this.categories.splice(index, 1);
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
    this.utilsService.showInfoModal("Eliminar", "Esta seguro que desea eliminar la categoria: " + this.actualCategory.name,
    "optionMsjLabel", "optionText", "optionMsj");
  }
}
