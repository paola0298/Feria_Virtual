import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../models/carrito';
import { Product } from '../models/product';
import { RestclientService } from '../services/restclient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  private cartProducts: Carrito[];
  private products: Product[] = [];
  private idActualClient: string = window.localStorage.getItem('userId');
  private total: number;

  constructor(
    private utilsService: UtilsService,
    private restClientService: RestclientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    this.restClientService.getClientCart(this.idActualClient).subscribe(
      (clientCartQuery: Carrito[]) => {
        this.cartProducts = clientCartQuery;
        this.cartProducts.forEach(
          (cp: Carrito) => {
            this.restClientService
              .getProduct(cp.idProducto)
              .subscribe((productQuery: Product) => {
                this.products.push(productQuery as Product);
                this.getTotal();
              });
          },
          (error: any) => {
            console.log(error.statusText);
            console.log(error.status);
          }
        );
      },
      (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
      }
    );
  }

  calculateTotal(event: any, productId: number) {
    this.cartProducts.find(
      (cp: Carrito) => cp.idProducto === productId
    ).cantidad = event.target.valueAsNumber;
    this.getTotal();
  }

  removeProduct(product: Product) {
    this.restClientService
      .deleteCartProduct(this.idActualClient, product.id.toString())
      .subscribe(
        (res: any) => {
          console.log(res);
          this.cartProducts = [];
          this.products = [];
          this.getCartProducts();
        },
        (error: any) => {
          console.log(error.statusText);
          console.log(error.status);
        }
      );
  }

  getProductQuantityFromCart(productId: number) {
    return this.cartProducts.find((cp: Carrito) => productId === cp.idProducto)
      .cantidad;
  }

  getTotal() {
    this.total = 0;
    if (this.cartProducts.length > 0) {
      this.cartProducts.forEach((cp: Carrito) => {
        this.total =
          this.total +
          this.products.find((product: Product) => cp.idProducto === product.id)
            .precio *
            cp.cantidad;
      });
    }
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  continueShopping() {
    this.router.navigate(['available-producers'] );
  }

  pay() {
    this.restClientService.createOrder(this.idActualClient).subscribe((res: any) => {
      this.router.navigate(['menu-client']);
    });
  }
}
