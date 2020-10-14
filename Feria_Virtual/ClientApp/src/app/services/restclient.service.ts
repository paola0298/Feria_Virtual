import { Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producer } from '../models/producer';
import { AfilliationRequest } from '../models/affiliationRequest';
import { Category } from '../models/category';
import { Product } from '../models/product';

/* Este servicio se utiliza para solicitar, enviar y recibir datos del servidor
mediante solicitudes HTTP como GET, POST, PUT y DELETE */

@Injectable({
  providedIn: 'root',
})
export class RestclientService {
  private PORT = 5050;

  constructor(protected http: HttpClient) {}

  // Requests para VISTA PRODUCTOR

  /**
   * Solicitud HTTP GET para obtener la lista de productores registrados
   */
  getProducers() {
    console.log('Obteniendo todos los productores');
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productores`);
  }

  /**
   * Solicitud HTTP POST para crear un productor
   * @param producer Objeto de tipo Producer
   */
  createProducer(producer: Producer) {
    console.log('Creando productor: ');
    console.log('\n');
    console.log(producer);
    console.log('\n');
    return this.http.post(
      `https://localhost:${this.PORT}/api/Productores`,
      JSON.stringify(producer)
    );
  }

  /**
   * Solicitud HTTP PUT para modificar un productor
   * @param producer Objeto de tipo Producer
   */
  updateProducer(producer: Producer) {
    console.log('Actualizando productor: ');
    console.log('\n');
    console.log(producer);
    console.log('\n');
    return this.http.put(
      `https://localhost:${this.PORT}/api/Productores/${producer.identificacion}`,
      JSON.stringify(producer)
    );
  }

  /**
   * Solicitud HTTP GET para obtener un productor
   * @param id id del productor específico que se desea obtener
   */
  getProducer(id: string) {
    console.log('Obteniendo productor id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productores/${id}`);
  }

  /**
   * Solicitud HTTP DELETE para eliminar un productor
   * @param id id del productor específico que se desea eliminar
   */
  deleteProducer(id: string) {
    console.log('Eliminando productor id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Productores/${id}`);
  }

  /**
   * Solicitud HTTP PUT para aceptar solicitud de afiliación
   * @param id Id de solicitud de afiliacion que se quiere aceptar
   */
  acceptAffiliationRequest(affiliationRequest: AfilliationRequest) {
    console.log('Aceptando solicitud: ');
    console.log('\n');
    console.log(affiliationRequest);
    console.log('\n');
    return this.http.put(
      `https://localhost:${this.PORT}/api/Afiliaciones/${affiliationRequest.id}`,
      JSON.stringify({
        id: affiliationRequest.id,
        estado: 1
      })
    );
  }

  /**
   * Solicitud HTTP PUT para rechazar solicitud de afiliación
   * @param id Id de solicitud de afiliacion que se quiere rechazar
   */
  rejectAffiliationRequest(
    affiliationRequest: AfilliationRequest,
    comment?: string
  ) {
    console.log('Rechazando solicitud: ');
    console.log('\n');
    console.log(affiliationRequest);
    console.log('\n');
    return comment
      ? this.http.put(
          `https://localhost:${this.PORT}/api/Afiliaciones/${affiliationRequest.id}`,
          JSON.stringify({
            id: affiliationRequest.id,
            estado: 2,
            comment: comment,
          })
        )
      : this.http.put(
          `https://localhost:${this.PORT}/api/Afiliaciones/${affiliationRequest.id}`,
          JSON.stringify({
            id: affiliationRequest.id,
            estado: 2,
          })
        );
  }

  /**
   * Solicitud HTTP GET para obtener todas las catregorías guardadas
   */
  getCategories() {
    console.log('Obteniendo todas las categorías');
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Categorias`);
  }

  /**
   * Solicitud HTTP GET para obtener una categoría específica
   * @param id Id de la categoría que se desea obtener
   */
  getCategory(id: number) {
    console.log('Obteniendo categoría id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Categorias/${id}`);
  }

  /**
   * Solicitud HTTP POST para crear una categoría
   * @param category Objeto de tipo Category
   */
  createCategory(category: Category) {
    console.log('Creando productor: ');
    console.log('\n');
    console.log(category);
    console.log('\n');
    return this.http.post(`https://localhost:${this.PORT}/api/Categorias`, JSON.stringify(category));
  }

  /**
   * Solicitud HTTP PUT para modificar una categoría
   * @param category Objeto de tipo Producer
   */
  updateCategory(category: Category) {
    console.log('Actualizando categoría: ');
    console.log('\n');
    console.log(category);
    console.log('\n');
    return this.http.put(
      `https://localhost:${this.PORT}/api/Categorias/${category.id}`,
      JSON.stringify(category)
    );
  }

  /**
   * Solicitud HTTP DELETE para eliminar una catergoría
   * @param id id de la categoría específica que se desea eliminar
   */
  deleteCategory(id: string) {
    console.log('Eliminando categoría id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Categorias/${id}`);
  }

  /**
   * Solicitud HTTP GET para obtener todos los productos guardados
   */
  getProducts() {
    console.log('Obteniendo todos los productos');
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productos`);
  }

  /**
   * Solicitud HTTP GET para obtener los productos de un productor específico
   * @param id Id del productor del que se desea obtener los productos
   */
  getProducerProducts(id: number) {
    console.log('Obteniendo productos del productor id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productos/productor/${id}`);
  }

  /**
   * Solicitud HTTP POST para crear un producto
   * @param product Objeto de tipo Product
   */
  createProduct(product: Product) {
    console.log('Creando producto: ');
    console.log('\n');
    console.log(product);
    console.log('\n');
    return this.http.post(`https://localhost:${this.PORT}/api/Productos`, JSON.stringify(product));
  }

  /**
   * Solicitud HTTP PUT para modificar un producto
   * @param product Objeto de tipo Producer
   */
  updateProduct(product: Product) {
    console.log('Actualizando producto: ');
    console.log('\n');
    console.log(product);
    console.log('\n');
    return this.http.put(
      `https://localhost:${this.PORT}/api/Productos/${product.id}`,
      JSON.stringify(product)
    );
  }

  /**
   * Solicitud HTTP DELETE para eliminar un producto
   * @param id id del producto específico que se desea eliminar
   */
  deleteProduct(id: string) {
    console.log('Eliminando producto id: ');
    console.log('\n');
    console.log(id);
    console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Productos/${id}`);
  }

}
