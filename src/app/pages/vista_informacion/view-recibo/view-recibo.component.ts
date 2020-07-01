import { Component, OnInit, Input } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ReciboService } from '../../../@core/data/recibo.service';
import { UserService } from '../../../@core/data/users.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-recibo',
  templateUrl: './view-recibo.component.html',
  styleUrls: ['./view-recibo.component.scss'],
})
export class ViewReciboComponent implements OnInit {
  info_recibo: any;
  info_pago: any;
  ente: number;
  inscripcion_id: number;
  docPago = [];

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
  }

  @Input('inscripcion_id')
  set info2(info2: number) {
    this.inscripcion_id = info2;
    if (this.inscripcion_id !== null && this.inscripcion_id !== 0 &&
      this.inscripcion_id.toString() !== '') {
      this.loadData();
    }
  }

  constructor(private translate: TranslateService,
    private inscripcionService: InscripcionService,
    private reciboService: ReciboService,
    private documentoRec: DocumentoService,
    private nuxeoRec: NuxeoService,
    private sanitization: DomSanitizer,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  public cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitization.bypassSecurityTrustUrl(oldURL);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.inscripcionService.get('inscripcion/?query=Id:' + this.inscripcion_id +
      '&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          const inscripcionrec = <any>res[0];
          if (inscripcionrec.ReciboInscripcionId !== 0) {
            this.reciboService.get('recibo?query=Id:' + inscripcionrec.ReciboInscripcionId)
            .subscribe(reci => {
              if (reci !== null && JSON.stringify(reci).toString() !== '[{}]') {
                const recibo = <any>reci[0];
                this.reciboService.get('estado_recibo?query=Id:' + recibo.EstadoReciboId.Id)
                .subscribe(est_reci => {
                  if (est_reci !== null && JSON.stringify(est_reci).toString() !== '[{}]') {
                    recibo.EstadoReciboId = <any>est_reci[0];
                    this.reciboService.get('tipo_recibo?query=Id:' + recibo.TipoReciboId.Id)
                    .subscribe(tip_reci => {
                      if (tip_reci !== null && JSON.stringify(tip_reci).toString() !== '[{}]') {
                        recibo.TipoReciboId = <any>tip_reci[0];
                        this.info_recibo = recibo;
                        if (recibo.Referencia !== 0) {
                          this.reciboService.get('tipo_pago?query=Nombre:Pago electrónico')
                          .subscribe(tip_pago => {
                            if (tip_pago !== null && JSON.stringify(tip_pago).toString() !== '[{}]') {
                              this.info_pago = <any>{'TipoPagoId': <any>tip_pago[0]};
                            }
                          },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.tipo_pago'),
                              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                            });
                          });
                        } else {
                          this.reciboService.get('pago_recibo?query=ReciboId:' + this.info_recibo.Id)
                          .subscribe(pago_rec => {
                            if (pago_rec !== null && JSON.stringify(pago_rec).toString() !== '[{}]') {
                              this.info_pago = <any>pago_rec[0];
                              this.reciboService.get('tipo_pago?query=Id:' + this.info_pago.TipoPagoId.Id)
                              .subscribe(tip_pago => {
                                if (tip_pago !== null && JSON.stringify(tip_pago).toString() !== '[{}]') {
                                  this.info_pago.TipoPagoId = <any>tip_pago[0];
                                  const soportesP = [];
                                  if (this.info_pago.Comprobante + '' !== '0') {
                                    soportesP.push({ Id: this.info_pago.Comprobante, key: 'SoportePago' });
                                  }

                                  this.nuxeoRec.getDocumentoById$(soportesP, this.documentoRec)
                                    .subscribe(responseP => {
                                      this.docPago = <Array<any>>responseP;
                                      if (this.docPago['SoportePago'] !== undefined && this.info_pago.Comprobante > 0) {
                                        this.info_pago.Comprobante = this.cleanURL(this.docPago['SoportePago'] + '');
                                      }
                                    },
                                      (error: HttpErrorResponse) => {
                                        Swal({
                                          type: 'error',
                                          title: error.status + '',
                                          text: this.translate.instant('ERROR.' + error.status),
                                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                            this.translate.instant('GLOBAL.recibo') + '|' +
                                            this.translate.instant('GLOBAL.soporte_documento'),
                                          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                                        });
                                      });
                                }
                              },
                              (error: HttpErrorResponse) => {
                                Swal({
                                  type: 'error',
                                  title: error.status + '',
                                  text: this.translate.instant('ERROR.' + error.status),
                                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                    this.translate.instant('GLOBAL.tipo_pago'),
                                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                                });
                              });
                            }
                          },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.tipo_pago'),
                              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                            });
                          });
                        }
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.tipo_recibo'),
                          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                        });
                      });
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.estado_recibo'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.recibo'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
          }
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.inscripcion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
