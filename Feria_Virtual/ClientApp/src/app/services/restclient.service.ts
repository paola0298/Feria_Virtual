import { Injectable, Provider } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producer } from '../models/producer';
import { AfilliationRequest } from '../models/affiliationRequest';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Client } from '../models/client'

/* Este servicio se utiliza para solicitar, enviar y recibir datos del servidor
mediante solicitudes HTTP como GET, POST, PUT y DELETE */

@Injectable({
  providedIn: 'root',
})
export class RestclientService {
  private PORT = 5001;
  private options = {
    headers : {
      'Content-Type': 'application/json'
    }
  }

  constructor(protected http: HttpClient) {}

  // Requests para VISTA PRODUCTOR

  /**
   * Solicitud HTTP GET para obtener la lista de productores registrados
   */
  getProducers() {
    console.log('Obteniendo todos los productores');
    console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productores`, this.options);
  }

  /**
   * Solicitud HTTP POST para crear un productor
   * @param producer Objeto de tipo Producer
   */
  createProducer(producer: Producer) {
    console.log('Creando productor: ' + producer);
    // console.log('\n');
    // console.log(producer);
    // console.log('\n');
    return this.http.post(`https://localhost:${this.PORT}/api/Productores`, JSON.stringify(producer), this.options);
    
  }

  /**
   * Solicitud HTTP PUT para modificar un productor
   * @param producer Objeto de tipo Producer
   */
  updateProducer(producer: Producer) {
    console.log('Actualizando productor: ' + producer);
    // console.log('\n');
    // console.log(producer);
    // console.log('\n');
    return this.http.put(
      `https://localhost:${this.PORT}/api/Productores/${producer.identificacion}`,
      JSON.stringify(producer), this.options);
  }

  /**
   * Solicitud HTTP GET para obtener un productor
   * @param id id del productor específico que se desea obtener
   */
  getProducer(id: string) {
    console.log('Obteniendo productor id: ' + id);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productores/${id}`, this.options);
  }

  /**
   * Solicitud HTTP DELETE para eliminar un productor
   * @param id id del productor específico que se desea eliminar
   */
  deleteProducer(id: string) {
    console.log('Eliminando productor id: ' + id);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Productores/${id}`, this.options);
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
      JSON.stringify(affiliationRequest), this.options);
  }

  /**
   * Solicitud HTTP PUT para rechazar solicitud de afiliación
   * @param id Id de solicitud de afiliacion que se quiere rechazar
   */
  rejectAffiliationRequest(affiliationRequest: AfilliationRequest, comment?: string) {
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
          }), this.options
        )
      : this.http.put(
          `https://localhost:${this.PORT}/api/Afiliaciones/${affiliationRequest.id}`,
          JSON.stringify({
            id: affiliationRequest.id,
            estado: 2,
          }), this.options
        );
  }

  /**
   * Solicitud HTTP GET para obtener todas las catregorías guardadas
   */
  getCategories() {
    console.log('Obteniendo todas las categorías');
    // console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Categorias`, this.options);
  }

  /**
   * Solicitud HTTP GET para obtener una categoría específica
   * @param id Id de la categoría que se desea obtener
   */
  getCategory(id: number) {
    console.log('Obteniendo categoría id: ' + id);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Categorias/${id}`, this.options);
  }

  /**
   * Solicitud HTTP POST para crear una categoría
   * @param category Objeto de tipo Category
   */
  createCategory(category: Category) {
    console.log('Creando categoria: ' + category);
    // console.log('\n');
    // console.log(category);
    // console.log('\n');
    return this.http.post(`https://localhost:${this.PORT}/api/Categorias`, JSON.stringify(category), this.options);
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
      JSON.stringify(category),
      this.options
    );
  }

  /**
   * Solicitud HTTP DELETE para eliminar una catergoría
   * @param id id de la categoría específica que se desea eliminar
   */
  deleteCategory(id: number) {
    console.log('Eliminando categoría id: ' + id);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Categorias/${id}`, this.options);
  }

  /**
   * Solicitud HTTP GET para obtener todos los productos guardados
   */
  getProducts() {
    console.log('Obteniendo todos los productos');
    // console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productos`, this.options);
  }

  /**
   * Solicitud HTTP GET para obtener los productos de un productor específico
   * @param id Id del productor del que se desea obtener los productos
   */
  getProducerProducts(id: string) {
    console.log('Obteniendo productos del productor id: ' + id);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.get(`https://localhost:${this.PORT}/api/Productos/productor/${id}`, this.options);
  }

  /**
   * Solicitud HTTP GET para obtener un producto de un productor específico
   * @param idProducer Id del productor del que se desea obtener el producto
   * @param nameProduct Nombre del producto que se desea obtener
   */
  getProduct(idProducer: string, nameProduct: string) {
    console.log("Obteniendo producto: " + nameProduct + " de productor: " + idProducer); 
    var url = `https://localhost:${this.PORT}/api/Productos/${nameProduct}/${idProducer}`;
    return this.http.get(url, this.options);
  }

  /**
   * Solicitud HTTP POST para crear un producto
   * @param product Objeto de tipo Product
   */
  createProduct(product: Product) {
    console.log('Creando producto: ' + product.nombre);
    // console.log('\n');
    // console.log(product);
    // console.log('\n');
    return this.http.post(`https://localhost:${this.PORT}/api/Productos`, JSON.stringify(product), this.options);
  }

  /**
   * Solicitud HTTP PUT para modificar un producto
   * @param product Objeto de tipo Producer
   */
  updateProduct(product: Product) {
    console.log('Actualizando producto: ' + product.nombre);
    // console.log('\n');
    // console.log(product);
    // console.log('\n');
    return this.http.put(`https://localhost:${this.PORT}/api/Productos/${product.nombre}/${product.idProductor}`, JSON.stringify(product), this.options);
  }

  /**
   * Solicitud HTTP DELETE para eliminar un producto
   * @param id id del producto específico que se desea eliminar
   */
  deleteProduct(nombre: string, idProducer:string) {
    console.log('Eliminando producto: ' + nombre);
    // console.log('\n');
    // console.log(id);
    // console.log('\n');
    return this.http.delete(`https://localhost:${this.PORT}/api/Productos/${nombre}/${idProducer}`, this.options);
  }

  /**
   * Solicitud HTTP POST para iniciar sesion
   * @param id Nombre de usuario
   * @param pass Contraseña
   */
  loginClient(id:string, pass:string) {
    var url = `https://localhost:${this.PORT}/api/ClienteLog`;
    var auth = {
      id: id,
      password: pass
    }
    return this.http.post(url, JSON.stringify(auth), this.options);
  }

  /**
   * Solicitud HTTP GET para obtener un cliente específico
   * @param id Id del cliente que se desea obtener
   */
  getClient(id:string) {
    var url = `https://localhost:${this.PORT}/api/Clientes/${id}`;
    return this.http.get(url, this.options);
  }

  /**
   * Solicitud HTTP GET para obtener todos los clientes guardados
   */
  getClients() {
    var url = `https://localhost:${this.PORT}/api/Clientes`;
    return this.http.get(url, this.options);
  }

  /**
   * Solicitud HTTP POST para crear un cliente
   * @param client Objeto de tipo Client
   */
  createClient(client:Client) {
    console.log('Creando cliente ' + client.nombre);
    var url = `https://localhost:${this.PORT}/api/Clientes`;
    return this.http.post(url, JSON.stringify(client), this.options);
  }

  /**
   * Solicitud HTTP PUT para modificar un cliente
   * @param client Objeto de tipo Client
   */
  updateClient(client:Client) {
    console.log('Actualizando cliente ' + client.nombre);
    var url = `https://localhost:${this.PORT}/api/Clientes/${client.identificacion}`;
    return this.http.put(url, JSON.stringify(client), this.options);
  }

  /**
   * Solicitud HTTP DELETE para eliminar un cliente
   * @param id id del cliente específico que se desea eliminar
   */
  deleteClient(id:string) {
    console.log('Eliminando cliente id: ' + id);
    var url = `https://localhost:${this.PORT}/api/Clientes/${id}`;
    return this.http.delete(url, this.options);
  }

  /**
   * Solicitud HTTP POST para enviar una solicitud de afiliación de un productor
   * @param producer Objeto de tipo Producer
   */
  sendAffiliationRequest(producer:Producer) {
    console.log('Enviando solicitud de afiliacion id: ' + producer.identificacion);
    var url = `https://localhost:${this.PORT}/api/Afiliaciones`;
    return this.http.post(url, JSON.stringify(producer), this.options);
  }
}
