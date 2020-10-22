import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { Producer } from '../models/producer';
import { RestclientService } from '../services/restclient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-available-producers',
  templateUrl: './available-producers.component.html',
  styleUrls: ['./available-producers.component.css'],
})
export class AvailableProducersComponent implements OnInit {
  private producers: Producer[];
  private actualClient: Client;

  constructor(
    private restClientService: RestclientService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducers();
  }

  /**
   * Metodo para conectrase al servicio para obtener todos los productores registrados y filtrarlos por distrito
   */
  loadProducers() {
    const idClient = window.localStorage.getItem('userId');
    const response = this.restClientService.getClient(idClient);
    response.subscribe(
      (value: Client) => {
        this.actualClient = value;
        const responseProducers = this.restClientService.getProducers();
        responseProducers.subscribe(
          (valueProducers: Producer[]) => {
            this.producers = valueProducers.filter(
              (prod: Producer) =>
                this.actualClient.provincia === prod.provincia &&
                this.actualClient.canton === prod.canton &&
                this.actualClient.distrito === prod.distrito
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

  /**
   * Metodo para obtener la información del cliente actual
   */
  getClient() {
    const idClient = window.localStorage.getItem('userId');
    const response = this.restClientService.getClient(idClient);
    response.subscribe(
      (value: Client) => {
        this.actualClient = value;
      },
      (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
      }
    );
  }

  /**
   * Metodo que se llama cuando se presiona click en el item de la tabla
   * @param event Evento de click derecho
   * @param producer Productor seleccionado
   */
  onProducerClick(producer: Producer) {
    window.localStorage.setItem('producerId', producer.identificacion);
    this.router.navigate(['producer-store'] );
  }
}
