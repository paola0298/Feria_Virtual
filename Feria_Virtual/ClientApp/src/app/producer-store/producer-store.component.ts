import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { RestclientService } from '../services/restclient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-producer-store',
  templateUrl: './producer-store.component.html',
  styleUrls: ['./producer-store.component.css'],
})
export class ProducerStoreComponent implements OnInit {
  private products: Product[];
  private idActualProducer: string = window.localStorage.getItem('producerId');
  private idActualClient: string = window.localStorage.getItem('userId');
  private categories: Category[];

  constructor(
    private utilsService: UtilsService,
    private restClientService: RestclientService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    const responseCategories = this.restClientService.getCategories();
    responseCategories.subscribe(
      (valueCategories: Category[]) => {
        this.categories = valueCategories;
        const responseProd = this.restClientService.getProducerProducts(
          this.idActualProducer
        );
        responseProd.subscribe(
          (valueProd: Product[]) => {
            this.products = valueProd.filter(
              (prod: Product) => prod.idProductor === this.idActualProducer
            );
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

  parseCategory(id: number) {
    return this.categories.find((category: Category) => category.id === id)
      .nombre;
  }

  addToCart(product: Product) {
    this.restClientService
      .addProductToCart(this.idActualClient, {
        idCliente: this.idActualClient,
        idProducto: product.id,
        cantidad: 1,
      })
      .subscribe(
        (response: any) => {
          this.utilsService.showInfoModal(
            'Exito',
            'Se ha agregado ' + product.nombre + ' al carrito',
            'saveMsjLabel',
            'msjText',
            'saveMsj'
          );
        },
        (error: any) => {
          console.log(error.statusText);
          console.log(error.status);
        }
      );
  }

  /**
   * Metodo para cerrar un modal
   * @param id Id del modal a cerrar
   */
  closeModal(id: string): void {
    document.getElementById(id).style.setProperty('display', 'none');
  }
}
