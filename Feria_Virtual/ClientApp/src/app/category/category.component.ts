import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  updating: boolean = false;
  actualCategory;
  categories = [{
    id:1,
    name:'verduras'
  }]
  isEnabled?: boolean = true;

  constructor() { }

  ngOnInit() {
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

  saveCategory(): void {
    let id = (document.getElementById("idCategory") as HTMLInputElement).value;
    let name = (document.getElementById("nameCategory") as HTMLInputElement).value;

    

    console.log(id + '\n' + name);
    if (id == '' || name == '') {
      //document.getElementById('saveMsj').style.setProperty('display', 'block');
      var modal = document.getElementById('saveMsj');
      modal.style.setProperty('display', 'block');
      modal.style.setProperty('opacity', '100');
      document.getElementById("saveMsjLabel").textContent = "Error";
      document.getElementById("msjText").textContent = "Por favor complete todos los campos.";
    } else {
      //TODO guardar categoria 
      let idN = Number(id);
      var category = {id:idN, name:name};
      var modal = document.getElementById('saveMsj');
      modal.style.setProperty('display', 'block');
      modal.style.setProperty('opacity', '100');

      if (this.updating) {
        document.getElementById("saveMsjLabel").textContent = "Exito";
        document.getElementById("msjText").textContent = "Categoria actualizada correctamente.";
        let indexCategory = this.categories.indexOf(this.actualCategory);
        this.categories[indexCategory] = category;
        this.updating = false;
        document.getElementById("idCategory").setAttribute('disabled', 'false');
      } else {
        document.getElementById("saveMsjLabel").textContent = "Exito";
        document.getElementById("msjText").textContent = "Nueva categoria guardada correctamente.";
        this.categories.push(category);
      }
      this.cleanFields(); 
    }
  }

  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

  onCategoryClick(event:any, category:any):boolean {
    this.showContextMenu(event);
    this.actualCategory = category;
    return false;
  }

  showContextMenu(event:MouseEvent):boolean {
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

  updateProducer(): void {
    console.log("Updating category: " + this.actualCategory.id + " " + this.actualCategory.name);
    (document.getElementById("idCategory") as HTMLInputElement).value = this.actualCategory.id;
    (document.getElementById("nameCategory") as HTMLInputElement).value = this.actualCategory.name;
    document.getElementById("idCategory").setAttribute('disabled', 'true');
    this.updating = true;
  }

  askUser(): void {
    console.log("Deleting category: " + this.actualCategory.name);

    var modal = document.getElementById('optionMsj');
    modal.style.setProperty('display', 'block');
    modal.style.setProperty('opacity', '100');
    
    document.getElementById("optionMsjLabel").textContent = "Eliminar";
    document.getElementById("optionText").textContent = "Esta seguro que desea eliminar la categoria: " + this.actualCategory.name;
  }

  deleteCategory(): void {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.categories.indexOf(this.actualCategory, 0);
    this.categories.splice(index, 1);
  }

  cleanFields() {
    (document.getElementById("idCategory") as HTMLInputElement).value = "";
    (document.getElementById("nameCategory") as HTMLInputElement).value = "";
  }
}
