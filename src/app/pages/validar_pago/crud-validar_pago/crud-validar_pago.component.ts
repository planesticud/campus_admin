import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FORM_VALIDAR_PAGO } from './form-validar_pago';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { CoreService } from '../../../@core/data/core.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ReciboService } from '../../../@core/data/recibo.service';
import { PagoService } from '../../../@core/data/pago.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
import { EstadoRecibo } from '../../../@core/data/models/estado_recibo';

@Component({
  selector: 'ngx-crud-validar-pago',
  templateUrl: './crud-validar_pago.component.html',
  styleUrls: ['./crud-validar_pago.component.scss'],
})
export class CrudValidarPagoComponent implements OnInit {
  config: ToasterConfig;
  inscripcion_id: number;
  info_validar_pago: any;
  formValidarPago: any;
  regValidarPago: any;
  clean: boolean;
  temp: any;
  loading: boolean;

  @Input('inscripcion_id')
  set admision(inscripcion_id: number) {
    if (inscripcion_id !== undefined && inscripcion_id !== 0 && inscripcion_id.toString() !== '') {
      this.inscripcion_id = inscripcion_id;
      this.cargarPago();
    }
  }

  @Output() eventChange = new EventEmitter();

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private inscripcionService: InscripcionService,
    private personaService: CampusMidService,
    private coreService: CoreService,
    private reciboService: ReciboService,
    private pagoService: PagoService,
    private docPagService: DocumentoService,
    private nuxeoDocPag: NuxeoService,
    private programaService: ProgramaOikosService) {
    this.formValidarPago = FORM_VALIDAR_PAGO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadEstadoRecibo();
    this.loading = false;
  }

  construirForm() {
    this.formValidarPago.btn = this.translate.instant('GLOBAL.validar_pago');
    for (let i = 0; i < this.formValidarPago.campos.length; i++) {
      this.formValidarPago.campos[i].label = this.translate.instant('GLOBAL.' + this.formValidarPago.campos[i].label_i18n);
      this.formValidarPago.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formValidarPago.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formValidarPago.campos.length; index++) {
      const element = this.formValidarPago.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadEstadoRecibo(): void {
    let estado: Array<any> = [];
    this.reciboService.get('estado_recibo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          estado = <Array<EstadoRecibo>>res;
        }
        this.formValidarPago.campos[this.getIndexForm('EstadoRecibo')].opciones = estado;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.recibo') + '|' +
              this.translate.instant('GLOBAL.estado_recibo'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public cargarPago(): void {
    this.loading = true;
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0 &&
      this.inscripcion_id.toString() !== '') {
      this.inscripcionService.get('inscripcion?query=Id:' + this.inscripcion_id)
      .subscribe(ins_pos => {
        if (ins_pos !== null && JSON.stringify(ins_pos).toString() !== '[{}]') {
          const posgrado = <any>ins_pos[0];
          this.personaService.get('inscripcion/' + posgrado.Id).subscribe(persona => {
            if (persona !== null && JSON.stringify(persona).toString() !== '[{}]') {
              const personadata = <any>persona;
              posgrado.Persona = 1 * posgrado.PersonaId;
              posgrado.PersonaId = personadata.PersonaId.PrimerApellido.toUpperCase() + ' ' +
                personadata.PersonaId.SegundoApellido.toUpperCase() + ' ' +
                personadata.PersonaId.PrimerNombre.toUpperCase() + ' ' +
                personadata.PersonaId.SegundoNombre.toUpperCase();
              posgrado.NumeroIdentificacion = personadata.PersonaId.NumeroDocumento;
              posgrado.IdentificacionId = personadata.PersonaId.TipoIdentificacion.CodigoAbreviacion +
                ' ' + personadata.PersonaId.NumeroDocumento;
              this.programaService.get('dependencia/' + posgrado.ProgramaAcademicoId)
                .subscribe(res3 => {
                if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                  const programa = <any>res3;
                  posgrado.ProgramaAcademico = 1 * posgrado.ProgramaAcademicoId;
                  posgrado.ProgramaAcademicoId = programa.Nombre;
                  this.coreService.get('periodo/' + posgrado.PeriodoId)
                    .subscribe(res4 => {
                    if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                      const periodo = <any>res4;
                      posgrado.Periodo = 1 * posgrado.PeriodoId;
                      posgrado.PeriodoId = periodo.Nombre;
                      this.reciboService.get('recibo/' + posgrado.ReciboInscripcionId)
                      .subscribe(res5 => {
                        if (res5 !== null && JSON.stringify(res5).toString() !== '[{}]') {
                          const recibo = <any>res5;
                          posgrado.Recibo = recibo;
                          posgrado.Referencia = recibo.Referencia;
                          posgrado.ValorOrdinario = recibo.ValorOrdinario;
                          posgrado.FechaOrdinaria = recibo.FechaOrdinaria;
                          this.reciboService.get('tipo_recibo/' + recibo.TipoReciboId.Id)
                          .subscribe(res6 => {
                            if (res6 !== null && JSON.stringify(res6).toString() !== '[{}]') {
                              const tiporec = <any>res6;
                              posgrado.TipoRecibo = tiporec.Nombre;
                              posgrado.EstadoRecibo = recibo.EstadoReciboId;
                              if (recibo.Referencia.toString() !== '0') {
                                posgrado.TipoPago = 'Pago electrónico';
                                  for (let i = 0; i < this.formValidarPago.campos.length; i++) {
                                    this.formValidarPago.campos[i].deshabilitar = true;
                                  }
                                  this.info_validar_pago = posgrado;
                                  this.loading = false;
                              } else {
                                this.reciboService.get('pago_recibo?query=ReciboId:' + recibo.Id)
                                .subscribe(pagorec => {
                                  if (pagorec !== null && JSON.stringify(pagorec).toString() !== '[{}]') {
                                    const pago = <any>pagorec[0];
                                    posgrado.Pago = pago;
                                    posgrado.FechaPago = pago.FechaPago;
                                    posgrado.Comprobante = pago.Comprobante;
                                    this.reciboService.get('tipo_pago/' + pago.TipoPagoId.Id)
                                    .subscribe(tipopagorec => {
                                      if (tipopagorec !== null && JSON.stringify(tipopagorec).toString() !== '[{}]') {
                                        const tipopago = <any>tipopagorec;
                                        posgrado.TipoPago = tipopago.Nombre;

                                        this.formValidarPago.campos.push({
                                          etiqueta: 'mat-date',
                                          claseGrid: 'col-lg-3 col-md-6 col-sm-12 col-xs-12',
                                          nombre: 'FechaOrdinaria',
                                          label_i18n: 'fecha_recibo',
                                          placeholder_i18n: 'fecha_recibo',
                                          requerido: true,
                                          deshabilitar: true,
                                          tipo: 'text',
                                        }, {
                                          etiqueta: 'file',
                                          claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
                                          clase: 'form-control',
                                          nombre: 'Comprobante',
                                          label_i18n: 'comprobante',
                                          placeholder_i18n: 'comprobante',
                                          requerido: true,
                                          deshabilitar: true,
                                          tipo: 'pdf',
                                          tipoDocumento: 8,
                                          formatos: 'pdf',
                                          url: '',
                                          tamanoMaximo: 2,
                                        });

                                        this.construirForm();

                                        const files = []
                                        if (posgrado.Comprobante + '' !== '0') {
                                          files.push({ Id: posgrado.Comprobante, key: 'SoportePago' });
                                        }
                                        this.nuxeoDocPag.getDocumentoById$(files, this.docPagService)
                                          .subscribe(response => {
                                            const filesResponse = <any>response;
                                            if (Object.keys(filesResponse).length === files.length) {
                                              posgrado.Comprobante = filesResponse['SoportePago'] + '';

                                              if (periodo.Activo.toString() !== 'true') {
                                                for (let i = 0; i < this.formValidarPago.campos.length; i++) {
                                                  this.formValidarPago.campos[i].deshabilitar = true;
                                                }
                                              }
                                              this.info_validar_pago = posgrado;
                                              this.loading = false;
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
                                        this.translate.instant('GLOBAL.pago_recibo'),
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
                            this.translate.instant('GLOBAL.recibo'),
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
                          this.translate.instant('GLOBAL.periodo_id'),
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
                      this.translate.instant('GLOBAL.programa_academico'),
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
                  this.translate.instant('GLOBAL.inscripcion') + '|' +
                  this.translate.instant('GLOBAL.aspirante'),
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
              this.translate.instant('GLOBAL.inscripcion') + '|' +
              this.translate.instant('GLOBAL.idioma'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else {
      this.info_validar_pago = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateValidarConsignacion(infoConsignacion: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.actualizar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          if (infoConsignacion.EstadoRecibo.Id.toString() !== '3') {
            const reciboPut = <any> infoConsignacion.Recibo;
            reciboPut.EstadoReciboId = infoConsignacion.EstadoRecibo;
            this.reciboService.put('recibo', reciboPut)
            .subscribe(res => {
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.recibo') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.info_validar_pago = undefined;
              this.formValidarPago = FORM_VALIDAR_PAGO;
              this.clean = !this.clean;
              this.construirForm();
              this.eventChange.emit(true);
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.recibo'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
          } else {
            const pagPut = <any>infoConsignacion.Pago;
            pagPut.Aprobado = true;
            this.reciboService.put('pago_recibo', pagPut)
            .subscribe(res1 => {
              if (res1 !== null && JSON.stringify(res1).toString() !== '[{}]') {
                const recPut = <any>infoConsignacion.Recibo;
                recPut.EstadoReciboId = infoConsignacion.EstadoRecibo;
                this.reciboService.put('recibo', recPut)
                .subscribe(res2 => {
                  if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                    const insPut = <any>infoConsignacion;
                    insPut.EstadoInscripcionId = <any>{'Id': 3};
                    insPut.ProgramaAcademicoId = 1 * infoConsignacion.ProgramaAcademico;
                    insPut.PeriodoId = 1 * infoConsignacion.Periodo;
                    insPut.PersonaId = 1 * infoConsignacion.Persona;
                    this.inscripcionService.put('inscripcion', insPut)
                    .subscribe(res3 => {
                      if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                        this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                          this.translate.instant('GLOBAL.recibo') + ' ' +
                          this.translate.instant('GLOBAL.confirmarActualizar'));
                        this.info_validar_pago = undefined;
                        this.formValidarPago = FORM_VALIDAR_PAGO;
                        this.clean = !this.clean;
                        this.construirForm();
                        this.eventChange.emit(true);
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                            this.translate.instant('GLOBAL.inscripcion'),
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
                    footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                      this.translate.instant('GLOBAL.recibo'),
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
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.pago_recibo'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
          }
        }
      });
  }

  updateValidarRecibo(infoRecibo: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.actualizar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          const strcon = 'programa=' + infoRecibo.ProgramaAcademico +
            '&numeroIdentificacion=' + infoRecibo.NumeroIdentificacion +
            '&anio=' + infoRecibo.PeriodoId.split('-')[0] +
            '&periodo=' + infoRecibo.PeriodoId.split('-')[1] +
            '&referencia=' + infoRecibo.Referencia;
          this.pagoService.get('consulta.php?' + strcon)
            .subscribe(consulta => {
              const consulta_dato = <any>consulta;
              if (consulta_dato.estado === 'PAGO') {
                const info_comprobante = <any>{
                  ReciboId: {Id: 1 * infoRecibo.Recibo.Id},
                  TipoPagoId: {Id: 2},
                  Aprobado: true,
                  FechaPago: new Date(),
                };
                this.reciboService.post('pago_recibo', info_comprobante)
                  .subscribe(res_recibo_pago => {
                    const res_pag = <any>res_recibo_pago;
                    if (res_recibo_pago !== null && res_pag.Type !== 'error') {
                      const recPagPut = <any>infoRecibo.Recibo;
                      recPagPut.EstadoReciboId = <any>{'Id': 3};
                      this.reciboService.put('recibo', recPagPut).subscribe(recP2 => {
                        if (recP2 !== null && JSON.stringify(recP2).toString() !== '[{}]') {
                          const insPagPut = <any>infoRecibo;
                          insPagPut.EstadoInscripcionId = <any>{'Id': 3};
                          insPagPut.ProgramaAcademicoId = 1 * infoRecibo.ProgramaAcademico;
                          insPagPut.PeriodoId = 1 * infoRecibo.Periodo;
                          insPagPut.PersonaId = 1 * infoRecibo.Persona;
                          this.inscripcionService.put('inscripcion', insPagPut)
                          .subscribe(resP3 => {
                            if (resP3 !== null && JSON.stringify(resP3).toString() !== '[{}]') {
                              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                                this.translate.instant('GLOBAL.recibo') + ' ' +
                                this.translate.instant('GLOBAL.confirmarActualizar'));
                              this.info_validar_pago = undefined;
                              this.formValidarPago = FORM_VALIDAR_PAGO;
                              this.clean = !this.clean;
                              this.construirForm();
                              this.eventChange.emit(true);
                            }
                          },
                            (error: HttpErrorResponse) => {
                              Swal({
                                type: 'error',
                                title: error.status + '',
                                text: this.translate.instant('ERROR.' + error.status),
                                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                                  this.translate.instant('GLOBAL.inscripcion'),
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
                            footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                              this.translate.instant('GLOBAL.recibo'),
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
                        footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                          this.translate.instant('GLOBAL.recibo'),
                        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                      });
                    });
              } else {
                if (consulta_dato.estado !== 'NO PAGO') {
                  Swal({
                    type: 'error',
                    title: this.translate.instant('GLOBAL.error'),
                    text: this.translate.instant('ERROR.' + consulta_dato.estado),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.recibo'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
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
                    this.translate.instant('GLOBAL.recibo'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_validar_pago.Referencia !== 0) {
        if (this.info_validar_pago !== undefined) {
          this.updateValidarRecibo(event.data.InfoValidarPago);
        }
      } else {
        if (this.info_validar_pago !== undefined) {
          this.updateValidarConsignacion(event.data.InfoValidarPago);
        }
      }

    }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
