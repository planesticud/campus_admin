import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { CoreService } from '../../../@core/data/core.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ReciboService } from '../../../@core/data/recibo.service';
import { ToasterConfig } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-validar-pago',
  templateUrl: './list-validar_pago.component.html',
  styleUrls: ['./list-validar_pago.component.scss'],
})
export class ListValidarPagoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  data: any;
  posgrados = [];
  periodo = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private inscripcionesService: InscripcionService,
    private personaService: CampusMidService,
    private coreService: CoreService,
    private reciboService: ReciboService,
    private programaService: ProgramaOikosService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
  }

  cargarCampos() {
    this.settings = {
      actions: {
        add: false,
        edit: true,
        delete: false,
        columnTitle: '',
      },
      noDataMessage: 'No se encuentran datos (No data found)',
      edit: {
        editButtonContent: '<i class="nb-compose" title="' + this.translate.instant('GLOBAL.validar_pago') + '"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('id'),
          width: '5%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        IdentificacionId: {
          title: this.translate.instant('GLOBAL.numero_identificacion'),
          width: '10%',
          valuePrepareFunction: (value) => {
            if (value) {
              return value;
            }
          },
        },
        PersonaId: {
          title: this.translate.instant('GLOBAL.aspirante'),
          width: '25%',
          valuePrepareFunction: (value) => {
            if (value.PrimerApellido) {
              return value.PrimerApellido.toUpperCase() + ' ' +
                value.SegundoApellido.toUpperCase() + ' ' +
                value.PrimerNombre.toUpperCase() + ' ' +
                value.SegundoNombre.toUpperCase();
            } else {
              return value;
            }
          },
        },
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          width: '25%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        ReciboInscripcionId: {
          title: this.translate.instant('GLOBAL.referencia'),
          width: '10%',
          valuePrepareFunction: (value) => {
            if (value.Referencia !== undefined) {
              if (value.Referencia.toString() === '0') {
                return 'Consignación';
              } else {
                return value.Referencia;
              }
            }
            return value.Referencia;
          },
        },
        EstadoRecibo: {
          title: this.translate.instant('GLOBAL.estado_recibo'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
      },
    };
  }

  loadData(query?: string): void {
    if (query) {
      this.inscripcionesService.get(query).subscribe(resins => {
        if (resins !== null && JSON.stringify(resins).toString() !== '[{}]') {
          this.data = <Array<any>>resins;
          this.data.forEach(element => {
            this.personaService.get('inscripcion/' + element.Id).subscribe(persona => {
              if (persona !== null && JSON.stringify(persona).toString() !== '[{}]') {
                const personadata = <any>persona;
                element.PersonaId = personadata.PersonaId;
                element.IdentificacionId = personadata.PersonaId.TipoIdentificacion.CodigoAbreviacion +
                  ' ' + personadata.PersonaId.NumeroDocumento;
                this.programaService.get('dependencia/' + element.ProgramaAcademicoId)
                  .subscribe(res3 => {
                    if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                      element.ProgramaAcademicoId = <any>res3;
                      this.coreService.get('periodo/' + element.PeriodoId).subscribe(res4 => {
                          if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                            element.PeriodoId = <any>res4;
                            this.reciboService.get('recibo/' + element.ReciboInscripcionId).subscribe(res5 => {
                              if (res5 !== null && JSON.stringify(res5).toString() !== '[{}]') {
                                element.ReciboInscripcionId = <any>res5;
                                this.reciboService.get('estado_recibo/' + element.ReciboInscripcionId.EstadoReciboId.Id)
                                .subscribe(res6 => {
                                  if (res6 !== null && JSON.stringify(res6).toString() !== '[{}]') {
                                    element.EstadoRecibo = <any>res6;
                                    this.source.load(this.data);
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
          });
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
    } else {
      this.inscripcionesService.get('inscripcion?query=EstadoInscripcionId:2&limit=0')
      .subscribe(resins => {
        if (resins !== null && JSON.stringify(resins).toString() !== '[{}]') {
          this.data = <Array<any>>resins;
          this.data.forEach(element => {
            this.personaService.get('inscripcion/' + element.Id).subscribe(persona => {
              if (persona !== null && JSON.stringify(persona).toString() !== '[{}]') {
                const personadata = <any>persona;
                element.PersonaId = personadata.PersonaId;
                element.IdentificacionId = personadata.PersonaId.TipoIdentificacion.CodigoAbreviacion +
                  ' ' + personadata.PersonaId.NumeroDocumento;
                this.programaService.get('dependencia/' + element.ProgramaAcademicoId)
                  .subscribe(res3 => {
                    if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                      element.ProgramaAcademicoId = <any>res3;
                      this.coreService.get('periodo/' + element.PeriodoId).subscribe(res4 => {
                          if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                            element.PeriodoId = <any>res4;
                            this.reciboService.get('recibo/' + element.ReciboInscripcionId).subscribe(res5 => {
                              if (res5 !== null && JSON.stringify(res5).toString() !== '[{}]') {
                                element.ReciboInscripcionId = <any>res5;
                                this.reciboService.get('estado_recibo/' + element.ReciboInscripcionId.EstadoReciboId.Id)
                                .subscribe(res6 => {
                                  if (res6 !== null && JSON.stringify(res6).toString() !== '[{}]') {
                                    element.EstadoRecibo = <any>res6;
                                    this.source.load(this.data);
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
          });
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
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
    if (!this.cambiotab) {
      this.uid = undefined;
    }
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }

  itemselec(event): void {
  }

  clearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
  }

  loadInfoSelectFiltro() {
    this.programaService.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          this.posgrados = <any>res;
          this.loadData();
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
      this.coreService.get('periodo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          this.periodo = <any>res;
          this.loadData();
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.periodo'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  filtrar() {
    if (this.selectedValuePrograma !== undefined && this.selectedValuePeriodo !== undefined) {
      this.loadData('inscripcion?query=ProgramaAcademicoId:' + this.selectedValuePrograma.Id +
      ',PeriodoId:' + this.selectedValuePeriodo.Id + ',EstadoInscripcionId:2&limit=0');
    } else if (this.selectedValuePrograma !== undefined && this.selectedValuePeriodo === undefined) {
      this.loadData('inscripcion?query=ProgramaAcademicoId:' + this.selectedValuePrograma.Id +
      ',EstadoInscripcionId:2&limit=0');
    } else if (this.selectedValuePrograma === undefined && this.selectedValuePeriodo !== undefined) {
      this.loadData('inscripcion?query=PeriodoId:' + this.selectedValuePeriodo.Id +
      ',EstadoInscripcionId:2&limit=0');
    } else {
      this.loadData();
    }
  }
}
