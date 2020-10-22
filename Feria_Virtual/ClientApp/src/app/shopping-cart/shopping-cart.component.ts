import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  totalProduct = 0;
  total = 0;
  productQuantity = 1;

  productsQuantity: number[] = [1, 2];


  constructor() {
    // var p1: Product = new Product();
    // var p2: Product = new Product();

    // p1.name = "Papa";
    // p1.price = 1000;
    // p1.availability = 10;
    // p1.category = "Verdura";
    // p1.saleMode = "Kilogramo";
    // p1.image = "https://encolombia.com/wp-content/uploads/2013/01/Papa.jpg";

    // p2.name = "Aguacate";
    // p2.price = 1000;
    // p2.availability = 10;
    // p2.category = "Fruta";
    // p2.saleMode = "Unidad";
    // p2.image = "https://as01.epimg.net/deporteyvida/imagenes/2017/07/23/portada/1500819395_065005_1500819504_noticia_normal.jpg";

    // this.products.push(p1, p2);
   }

  ngOnInit() {
    // this.calculateTotal();
  }

  calculateTotal() {

    const elements = document.getElementsByClassName('productQuantity');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement;
      element.value = this.productsQuantity[i].toString();
    }

    const quantity = (document.getElementById('productQuantity') as HTMLInputElement);
    const self = this;
    quantity.onchange = function (this: GlobalEventHandlers, ev: Event) {
      console.log((document.getElementById('productQuantity') as HTMLInputElement).value);
    };
  }

  removeProduct(product: Product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

}
