import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  updating: boolean = false;
  categories = [];
  modesSale = ["Kilogramo", "Paquete", "Caja"];
  products = [{
    name:"Papa",
    availability:10,
    price:1000,
    image:"image",
    category:"Verdura",
    saleMode:"Kilogramo"
  }];
  actualProduct;

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

  getCategories():void {
    //get categories saved
  }

  setCategory(category: string):void {
    document.getElementById("categoryDropdown").textContent = category;
  }

  setSaleMode(saleMode: string):void {
    document.getElementById("saleModeDropdown").textContent = saleMode;
  }

  onProducerClick(event:any, product:any): boolean {
    this.showContextMenu(event);
    this.actualProduct = product;
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

  updateProduct() {
    this.updating = true;
    (document.getElementById("productName") as HTMLInputElement).value = this.actualProduct.name;
    (document.getElementById("availability") as HTMLInputElement).value = this.actualProduct.availability;
    (document.getElementById("price") as HTMLInputElement).value = this.actualProduct.price;
    //(document.getElementById("productImage") as HTMLInputElement).value = this.actualProduct.image;
    document.getElementById("categoryDropdown").textContent = this.actualProduct.category;
    document.getElementById("saleModeDropdown").textContent = this.actualProduct.saleMode;

  }

  cleanFields() {
    (document.getElementById("productName") as HTMLInputElement).value = "";
    (document.getElementById("availability") as HTMLInputElement).value = "";
    (document.getElementById("price") as HTMLInputElement).value = "";
    //(document.getElementById("productImage") as HTMLInputElement).value = this.actualProduct.image;
    document.getElementById("categoryDropdown").textContent = "Categoria";
    document.getElementById("saleModeDropdown").textContent = "Modo de venta";
  }

  askUser() {
    var modal = document.getElementById('optionMsj');
    modal.style.setProperty('display', 'block');
    modal.style.setProperty('opacity', '100');
    
    document.getElementById("optionMsjLabel").textContent = "Eliminar";
    document.getElementById("optionText").textContent = "Esta seguro que desea eliminar el producto: " + this.actualProduct.name;
  }

  deleteProduct() {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    const index = this.products.indexOf(this.actualProduct, 0);
    this.products.splice(index, 1);
  }

  saveProduct() {
    let name = (document.getElementById("productName") as HTMLInputElement).value;
    let availability = (document.getElementById("availability") as HTMLInputElement).value;
    let price = (document.getElementById("price") as HTMLInputElement).value;
    //(document.getElementById("productImage") as HTMLInputElement).value = this.actualProduct.image;
    let category = document.getElementById("categoryDropdown").textContent;
    let saleMode = document.getElementById("saleModeDropdown").textContent;

    if (name == '' || availability == '' || price == '') {
      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Error";
      document.getElementById("msjText").textContent = "Por favor complete todos los campos.";
    } else {
      let availabilityN = Number(availability);
      let priceN = Number(price);
      document.getElementById('saveMsj').style.setProperty('display', 'block');
      document.getElementById("saveMsjLabel").textContent = "Exito";

      var product = {
        name:name, availability:availabilityN, 
        price:priceN, image:'image', category:category, 
        saleMode:saleMode}

      if (this.updating) {
        document.getElementById("msjText").textContent = "Producto actualizado correctamente.";
        let indexProduct = this.products.indexOf(this.actualProduct);
        this.products[indexProduct] = product;
        this.updating = false;
      } else {
        document.getElementById("msjText").textContent = "Nuevo producto guardado correctamente.";
        this.products.push(product);
      }
      this.cleanFields();
    }
  }

  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

}
