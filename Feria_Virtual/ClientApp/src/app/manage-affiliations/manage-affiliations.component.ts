import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AfilliationRequest } from '../models/affiliationRequest';
import { Producer } from '../models/producer';
import { RestclientService } from '../services/restclient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-manage-affiliations',
  templateUrl: './manage-affiliations.component.html',
  styleUrls: ['./manage-affiliations.component.css'],
})
export class ManageAffiliationsComponent implements OnInit {
  private actualProducer: Producer;
  private actualAffiliationRequest: AfilliationRequest;
  private affiliations: AfilliationRequest[];

  constructor(
    private restClientService: RestclientService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.queryAffiliationRequests();
    this.utilsService.configureContextMenu();
  }

  queryAffiliationRequests() {
    const response = this.restClientService.getAffiliationRequests();
    response.subscribe(
      (affiliationsQuery: AfilliationRequest[]) => {
        this.affiliations = affiliationsQuery;
      },
      (error: any) => {
        console.log(error.statusText);
        console.log(error.status);
      }
    );
  }

  /**
   *Metodo que se llama cuando se presiona click derecho en el item de la tabla
   * @param event Evento de click derecho
   * @param affiliation Productor seleccionado
   */
  onAffiliationClick(event: any, affilition: AfilliationRequest) {
    this.utilsService.showContextMenu(event);
    this.restClientService
      .getProducer(affilition.idProductor.toString())
      .subscribe((producerQuery: Producer) => {
        this.actualProducer = producerQuery;
        this.actualAffiliationRequest = affilition;
      });
    return false;
  }

  accept() {
    this.actualAffiliationRequest.estado = 1;
    this.restClientService
      .acceptAffiliationRequest(this.actualAffiliationRequest)
      .subscribe(
        (response: any) => {
          this.queryAffiliationRequests();
        },
        (error: any) => {
          console.log(error.statusText);
          console.log(error.status);
          this.utilsService.showInfoModal(
            'Error',
            'Hubo un problema al actualizar al productor.',
            'saveMsjLabel',
            'msjText',
            'saveMsj'
          );
        }
      );
  }

  deny() {
    this.restClientService
      .rejectAffiliationRequest(this.actualAffiliationRequest)
      .subscribe(
        (response: any) => {
          this.queryAffiliationRequests();
          console.log(this.actualProducer);
          this.restClientService.deleteProducer(this.actualProducer.identificacion).subscribe(
            (responseDelete: any) => {
              console.log(response);
            },
            (error: any) => {
              console.log(error.statusText);
              console.log(error.status);
              this.utilsService.showInfoModal(
                'Error',
                'Hubo un problema al actualizar al productor.',
                'saveMsjLabel',
                'msjText',
                'saveMsj'
              );
            }
          );
        },
        (error: any) => {
          console.log(error.statusText);
          console.log(error.status);
          this.utilsService.showInfoModal(
            'Error',
            'Hubo un problema al actualizar al productor.',
            'saveMsjLabel',
            'msjText',
            'saveMsj'
          );
        }
      );
  }
}
