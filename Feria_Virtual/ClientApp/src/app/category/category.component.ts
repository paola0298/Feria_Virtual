import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service'

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
        document.getElementById("id").removeAttribute('disabled');
      } else {
        this.utilsService.showInfoModal("Exito", "Nueva categoria guardada correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.categories.push(category);
      }
      this.utilsService.cleanField([id, name], [], []);
    }
  }

  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

  onCategoryClick(event:any, category:any):boolean {
    this.utilsService.showContextMenu(event);
    this.actualCategory = category;
    return false;
  }



  updateProducer(): void {
    console.log("Updating category: " + this.actualCategory.id + " " + this.actualCategory.name);
    (document.getElementById("idCategory") as HTMLInputElement).value = this.actualCategory.id;
    (document.getElementById("nameCategory") as HTMLInputElement).value = this.actualCategory.name;
    document.getElementById("idCategory").setAttribute('disabled', 'true');
    this.updating = true;
  }

  askUser(): void {
    this.utilsService.configureDeleteModal("Esta seguro que desea eliminar la categoria: " + this.actualCategory.name);
  }

  deleteCategory(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.categories.indexOf(this.actualCategory, 0);
    this.categories.splice(index, 1);
  }

  
}
