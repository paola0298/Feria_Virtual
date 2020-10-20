import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { RestclientService } from 'src/app/services/restclient.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category'
import { error } from 'protractor';
import { read } from 'fs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  
  updating: boolean = false;
  categories = [];
  modesSale = ["Kilogramo", "Paquete", "Caja"];
  products:Product[] = [];
  actualProduct: Product;
  idActualProducer:string = window.localStorage.getItem("producerId");

  constructor(private utilsService: UtilsService, private restClientService:RestclientService) { }

  ngOnInit() {
    this.utilsService.configureContextMenu();
    this.getCategories();
    this.getProducts();
    
  }

  encodeImageFileAsURL(): Promise<string> {
    var promise = new Promise<string>(function (resolve, result) {
      var image = document.getElementById("image") as HTMLInputElement;
      var file = image.files[0];
      var reader = new FileReader();

      reader.onloadend = function() {
        console.log('File readed: ', reader.result);
        resolve(reader.result.toString());
      }
      reader.onerror = function () {
        resolve(null);
      }
      reader.readAsDataURL(file);
    });
    return promise;
  }

  /**
   * Metodo que se conecta con el servicio para crear un nuevo producto
   * @param producer Producto a crear
   * @param htmlElements Elementos html input para limpiar los campos
   * @param selectElements Elementos html select para limpiar los campos
   */
  createProduct(product:Product, htmlElements:HTMLInputElement[], selectElements:HTMLSelectElement[]) {
    var response = this.restClientService.createProduct(product);
    response.subscribe(
      (value:Product) => {
        this.getProducts();
        this.utilsService.showInfoModal("Exito", "Nuevo producto guardado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.utilsService.cleanField(htmlElements, selectElements, ["Seleccione una categoria", "Seleccione un modo de venta"]);

      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  /**
   * Metodo para obtener un producto desde el servicio
   * @param nameProduct Nombre del producto
   */
  getProduct(nameProduct:string) {
    var response = this.restClientService.getProduct(this.idActualProducer, nameProduct);
    response.subscribe(
      (value:Product) => {
        this.actualProduct = value;
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  /**
   * Metodo que se conecta con el servicio para modificar producto
   * @param producer Objeto tipo Product
   * @param htmlElements Elementos html input para limpiar los campos
   * @param selectElements Elementos html select para limpiar los campos
   */
  modifyProduct(product:Product, htmlElements:HTMLInputElement[], selectElements:HTMLSelectElement[]) {
    var response = this.restClientService.updateProduct(product);
    response.subscribe(
      (value:any) => {
        this.getProducts();
        this.utilsService.showInfoModal("Exito", "Producto actualizado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.utilsService.cleanField(htmlElements, selectElements, ["Seleccione una categoria", "Seleccione un modo de venta"]);
        this.updating = false;
        (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Guardar nuevo producto";
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Hubo un problema al actualizar el producto.", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  /**
   * Metodo para almacenar un nuevo producto
   */
  async saveProduct() {
    let name = (document.getElementById("productName") as HTMLInputElement);
    let availability = (document.getElementById("availability") as HTMLInputElement);
    let price = (document.getElementById("price") as HTMLInputElement);
    let image = document.getElementById("image") as HTMLInputElement;
    let category = (document.getElementById("category") as HTMLSelectElement);
    let saleMode = (document.getElementById("saleMode") as HTMLSelectElement);

    

    if (name.value == '' || availability.value == '' || price.value == '' || category.value == 'Seleccione una categoria' || 
    saleMode.value == 'Seleccione un modo de venta') {
      this.utilsService.showInfoModal("Error", "Por favor complete todos los campos.", "saveMsjLabel", "msjText", 'saveMsj');
      return;
    } 
    
    let availabilityN = Number(availability.value);
    let priceN = Number(price.value);
    let idCategory = this.getIdCategory(category.value);
    
    let imageUrl = await this.encodeImageFileAsURL();

    var product = new Product(name.value, idCategory, this.idActualProducer, availabilityN, priceN, 
      saleMode.value, imageUrl)

    if (this.updating) {
      this.modifyProduct(product, [name, availability, price, image], [category, saleMode])
    } else {
      this.createProduct(product, [name, availability, price, image], [category, saleMode])
    }
    
  }

  /**
   * Metodo para actualizar un producto seleccionado
   */
  updateProduct() {
    console.log(this.actualProduct.idCategoria);
    this.updating = true;
    (document.getElementById("saveButton") as HTMLButtonElement).textContent = "Actualizar producto";
    (document.getElementById("productName") as HTMLInputElement).value = this.actualProduct.nombre;
    (document.getElementById("availability") as HTMLInputElement).value = this.actualProduct.disponibilidad.toString();
    (document.getElementById("price") as HTMLInputElement).value = this.actualProduct.precio.toString();
    //(document.getElementById("productImage") as HTMLInputElement).value = this.actualProduct.image;
    (document.getElementById("category") as HTMLSelectElement).value = this.getNameCategory(this.actualProduct.idCategoria);
    (document.getElementById("saleMode") as HTMLSelectElement).value = this.actualProduct.modoVenta;
  }

  /**
   * Metodo para eliminar un producto
   */
  deleteProduct() {
    document.getElementById('optionMsj').style.setProperty('display', 'none');
    var response = this.restClientService.deleteProduct(this.actualProduct.nombre, this.idActualProducer);
    response.subscribe(
      (value:any) => {
        console.log("Deleted");
        this.utilsService.showInfoModal("Exito", "Producto eliminado correctamente.", "saveMsjLabel", "msjText", 'saveMsj');
        this.getProducts();
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Hubo un problema al eliminar el producto.", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  getIdCategory(category:string):number {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].nombre == category) {
        return this.categories[i].id;
      }
    }
    return -1;
  }

  getNameCategory(idCategory:number):string {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == idCategory) {
        return this.categories[i].nombre;
      }
    }
    return "";
  }

  /**
   * Metodo para obtener las categorias almacenadas
   */
  getCategories():void {
    //get categories saved
    var response = this.restClientService.getCategories();
    response.subscribe(
      (value:Category[]) => {
        this.categories = value;
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  getProducts():void {
    var response = this.restClientService.getProducerProducts(this.idActualProducer);
    response.subscribe(
      (value:Product[]) => {
        this.products = value;
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
      });
  }

  /**
   *Metodo que se llama cuando se presiona click derecho en el item de la tabla
   * @param event Evento de click derecho
   * @param product Producto seleccionado
   */
  onProducerClick(event:any, product:Product): boolean {
    this.utilsService.showContextMenu(event);
    this.getProduct(product.nombre);
    return false;
  }

  /**
   * Metodo para mostrar al usuario un modal para tomar una decision de si o no
   */
  askUser() {
    this.utilsService.showInfoModal("Eliminar", "Esta seguro que desea eliminar el producto: " + this.actualProduct.nombre,
    "optionMsjLabel", "optionText", "optionMsj");
  }

   /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }

}
