import { Dependencia } from './../../../@core/data/models/dependencia';
import { Periodo } from './../../../@core/data/models/periodo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { EventoService } from '../../../@core/data/evento.service';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_CONFIGURACION_FECHAS } from './form-configuracion_fechas';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-configuracion-fechas',
  templateUrl: './crud-configuracion_fechas.component.html',
  styleUrls: ['./crud-configuracion_fechas.component.scss'],
})
export class CrudConfiguracionFechasComponent implements OnInit {
  @Input('configuracion_fechas_id')
  set name(configuracion_fechas_id: number) {
    this.configuracion_fechas_id = configuracion_fechas_id;
    this.loadConfiguracionFechas();
  }

  @Output() eventChange = new EventEmitter();

  config: ToasterConfig;
  configuracion_fechas_id: number;
  info_configuracion_fechas: any;
  formConfiguracionFechas: any;
  regConfiguracionFechas: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private eventoService: EventoService,
    private evaluacionService: EvaluacionInscripcionService,
    private programaService: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formConfiguracionFechas = FORM_CONFIGURACION_FECHAS;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsPeriodoId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formConfiguracionFechas.titulo = this.translate.instant('GLOBAL.configuracion_fechas');
    this.formConfiguracionFechas.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formConfiguracionFechas.campos.length; i++) {
      this.formConfiguracionFechas.campos[i].label = this.translate.instant('GLOBAL.' + this.formConfiguracionFechas.campos[i].label_i18n);
      this.formConfiguracionFechas.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formConfiguracionFechas.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formConfiguracionFechas.campos.length; index++) {
      const element = this.formConfiguracionFechas.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaService.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<Dependencia>>res;
        }
        this.formConfiguracionFechas.campos[this.getIndexForm('DependenciaId')].opciones = dependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_descuento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsPeriodoId(): void {
    let periodoId: Array<any> = [];
    this.coreService.get('periodo?query=Activo:true&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          periodoId = <Array<Periodo>>res;
        }
        this.formConfiguracionFechas.campos[this.getIndexForm('PeriodoId')].opciones = periodoId;
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

  public loadConfiguracionFechas(): void {
    if (this.configuracion_fechas_id !== undefined && this.configuracion_fechas_id !== 0) {
      this.eventoService.get('calendario_evento/?query=Id:' + this.configuracion_fechas_id)
        .subscribe(insc => {
          if (insc !== null && JSON.stringify(insc).toString() !== '[{}]') {
            const temp = <any>insc[0];
            temp.FechaInicioInscripcion = temp.FechaInicio;
            temp.FechaFinInscripcion = temp.FechaFin;
            this.coreService.get('periodo/?query=Id:' + temp.PeriodoId)
            .subscribe(per => {
              if (per !== null && JSON.stringify(per).toString() !== '[{}]') {
                temp.PeriodoId = <any>per[0];
                if (temp.PeriodoId.Activo.toString() !== 'true') {
                  for (let i = 0; i < this.formConfiguracionFechas.campos.length; i++) {
                    this.formConfiguracionFechas.campos[i].deshabilitar = true;
                  }
                  this.formConfiguracionFechas.campos[this.getIndexForm('PeriodoId')].opciones.push(<Periodo>per[0]);
                }
                this.eventoService.get('tipo_evento/?query=Id:' + temp.TipoEventoId.Id)
                .subscribe(tipo => {
                  if (tipo !== null && JSON.stringify(tipo).toString() !== '[{}]') {
                    const temp2 = <any>tipo[0];
                    this.evaluacionService.get('cupos_por_dependencia/?query=PeriodoId:' + temp.PeriodoId.Id + ',DependenciaId:' +
                      temp2.DependenciaId).subscribe(cupos => {
                      if (cupos !== null && JSON.stringify(cupos).toString() !== '[{}]') {
                        temp.CuposHabilitados = <any>cupos[0].CuposHabilitados;
                        temp.CuposOpcionados = <any>cupos[0].CuposOpcionados;
                    this.programaService.get('dependencia/?query=Id:' + temp2.DependenciaId)
                    .subscribe(prog => {
                      if (prog !== null && JSON.stringify(prog).toString() !== '[{}]') {
                        temp.DependenciaId = <Dependencia>prog[0];
                        this.eventoService.get('calendario_evento/?query=TipoEventoId.Nombre:Pago inscripción,EventoPadreId:' +
                         this.configuracion_fechas_id).subscribe(pago => {
                          if (pago !== null && JSON.stringify(pago).toString() !== '[{}]') {
                            const temp3 = <any>pago[0];
                            temp.ValorInscripcion = temp3.Descripcion;
                            temp.FechaPago = temp3.FechaFin;
                            this.eventoService.get('calendario_evento/?query=TipoEventoId.Nombre:Evaluación inscripción,' +
                             'EventoPadreId:' + this.configuracion_fechas_id).subscribe(evalu => {
                             if (evalu !== null && JSON.stringify(evalu).toString() !== '[{}]') {
                               const temp4 = <any>evalu[0];
                               temp.FechaInicioEvaluacion = temp4.FechaInicio;
                               temp.FechaFinEvaluacion = temp4.FechaFin;
                               this.eventoService.get('calendario_evento/?query=TipoEventoId.Nombre:Admisión,' +
                               'EventoPadreId:' + this.configuracion_fechas_id).subscribe(admi => {
                               if (admi !== null && JSON.stringify(admi).toString() !== '[{}]') {
                                  const temp5 = <any>admi[0];
                                  temp.FechaInicioAdmision = temp5.FechaInicio;
                                  temp.FechaFinAdmision = temp5.FechaFin;
                                  this.info_configuracion_fechas = temp;
                               }
                             },
                               (error: HttpErrorResponse) => {
                                 Swal({
                                   type: 'error',
                                   title: error.status + '',
                                   text: this.translate.instant('ERROR.' + error.status),
                                   footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                     this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                                     this.translate.instant('GLOBAL.admision'),
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
                                   this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                                   this.translate.instant('GLOBAL.evaluacion_inscripcion'),
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
                                this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                                this.translate.instant('GLOBAL.valor_pago'),
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
                            this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
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
                          this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                          this.translate.instant('GLOBAL.cupos_dependencia'),
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
                        this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                        this.translate.instant('GLOBAL.tipo_evento'),
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
                    this.translate.instant('GLOBAL.configuracion_fechas') + '|' +
                    this.translate.instant('GLOBAL.periodo'),
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
                this.translate.instant('GLOBAL.configuracion_fechas'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_configuracion_fechas = undefined;
      this.clean = !this.clean;
    }
  }

  createConfiguracionFechas(configuracionFechas: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.crear') + '?',
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
        this.info_configuracion_fechas = <any>configuracionFechas;
        this.eventoService.get('tipo_evento/?query=Nombre:Inscripción,DependenciaId:' +
        this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipoins => {
          if (tipoins !== null && JSON.stringify(tipoins).toString() !== '[{}]') {
            const tempins = {
              PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
              Descripcion: 'Inscripción ' + this.info_configuracion_fechas.PeriodoId.Nombre +
              ' ' + this.info_configuracion_fechas.DependenciaId.Id,
              TipoEventoId: <any>tipoins[0],
              Activo: true,
              FechaInicio: this.info_configuracion_fechas.FechaInicioInscripcion,
              FechaFin: this.info_configuracion_fechas.FechaFinInscripcion,
            };
            this.eventoService.post('calendario_evento', tempins).subscribe(insc => {
              if (insc !== null && JSON.stringify(insc).toString() !== '[{}]') {
                this.eventoService.get('calendario_evento?query=TipoEventoId.Nombre:Inscripción,TipoEventoId.DependenciaId:' +
                this.info_configuracion_fechas.DependenciaId.Id + ',PeriodoId:' + this.info_configuracion_fechas.PeriodoId.Id)
                .subscribe(insc2 => {
                  if (insc2 !== null && JSON.stringify(insc2).toString() !== '[{}]') {
                    const temp = <any>insc2[0];
                    this.eventoService.get('tipo_evento/?query=Nombre:Pago inscripción,DependenciaId:' +
                    this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipopag => {
                      if (tipopag !== null && JSON.stringify(tipopag).toString() !== '[{}]') {
                        const temppago = {
                          PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
                          Descripcion: '' + this.info_configuracion_fechas.ValorInscripcion,
                          TipoEventoId: <any>tipopag[0],
                          Activo: true,
                          FechaInicio: this.info_configuracion_fechas.FechaInicioInscripcion,
                          FechaFin: this.info_configuracion_fechas.FechaPago,
                          EventoPadreId: temp,
                        };
                        this.eventoService.post('calendario_evento', temppago).subscribe(pagot => {
                          if (pagot !== null && JSON.stringify(pagot).toString() !== '[{}]') {
                            this.eventoService.get('tipo_evento/?query=Nombre:Evaluación inscripción,DependenciaId:' +
                            this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipoeva => {
                              if (tipoeva !== null && JSON.stringify(tipoeva).toString() !== '[{}]') {
                                const tempeva = {
                                  PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
                                  Descripcion: 'Evaluación ' + this.info_configuracion_fechas.PeriodoId.Nombre +
                                  ' ' + this.info_configuracion_fechas.DependenciaId.Id,
                                  TipoEventoId: <any>tipoeva[0],
                                  Activo: true,
                                  FechaInicio: this.info_configuracion_fechas.FechaInicioEvaluacion,
                                  FechaFin: this.info_configuracion_fechas.FechaFinEvaluacion,
                                  EventoPadreId: temp,
                                };
                                this.eventoService.post('calendario_evento', tempeva).subscribe(evat => {
                                  if (evat !== null && JSON.stringify(evat).toString() !== '[{}]') {
                                    this.eventoService.get('tipo_evento/?query=Nombre:Admisión,DependenciaId:' +
                                    this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipoadm => {
                                      if (tipoadm !== null && JSON.stringify(tipoadm).toString() !== '[{}]') {
                                        const tempadm = {
                                          PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
                                          Descripcion: 'Admisión ' + this.info_configuracion_fechas.PeriodoId.Nombre +
                                          ' ' + this.info_configuracion_fechas.DependenciaId.Id,
                                          TipoEventoId: <any>tipoadm[0],
                                          Activo: true,
                                          FechaInicio: this.info_configuracion_fechas.FechaInicioAdmision,
                                          FechaFin: this.info_configuracion_fechas.FechaFinAdmision,
                                          EventoPadreId: temp,
                                        };
                                        this.eventoService.post('calendario_evento', tempadm).subscribe(admt => {
                                          if (admt !== null && JSON.stringify(admt).toString() !== '[{}]') {
                                            const tempcupos = {
                                              PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
                                              DependenciaId: this.info_configuracion_fechas.DependenciaId.Id,
                                              Activo: true,
                                              CuposHabilitados: this.info_configuracion_fechas.CuposHabilitados,
                                              CuposOpcionados: this.info_configuracion_fechas.CuposOpcionados,
                                            };
                                            this.evaluacionService.post('cupos_por_dependencia', tempcupos)
                                            .subscribe(cupost => {
                                              if (cupost !== null && JSON.stringify(cupost).toString() !== '[{}]') {
                                                this.showToast('info', this.translate.instant('GLOBAL.crear'),
                                                  this.translate.instant('GLOBAL.configuracion_fechas') + ' ' +
                                                  this.translate.instant('GLOBAL.confirmarCrear'));
                                                this.info_configuracion_fechas = undefined;
                                                this.clean = !this.clean;
                                                this.eventChange.emit(true);
                                              }
                                            },
                                              (error: HttpErrorResponse) => {
                                                Swal({
                                                  type: 'error',
                                                  title: error.status + '',
                                                  text: this.translate.instant('ERROR.' + error.status),
                                                  footer: this.translate.instant('GLOBAL.crear') + '-' + '4' +
                                                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                              footer: this.translate.instant('GLOBAL.crear') + '-' + '3' +
                                                this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                            this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                      footer: this.translate.instant('GLOBAL.crear') + '-' + '2' +
                                        this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                              footer: this.translate.instant('GLOBAL.crear') + '-' + '1' +
                                this.translate.instant('GLOBAL.configuracion_fechas'),
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
                            this.translate.instant('GLOBAL.configuracion_fechas'),
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
                          this.translate.instant('GLOBAL.configuracion_fechas'),
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
                  footer: this.translate.instant('GLOBAL.crear') + '-' +
                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                this.translate.instant('GLOBAL.configuracion_fechas'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  updateConfiguracionFechas(configuracionFechas: any): void {
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
        this.info_configuracion_fechas = <any>configuracionFechas;
        this.eventoService.get('tipo_evento/?query=Nombre:Inscripción,DependenciaId:' +
          this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipoins => {
          if (tipoins !== null && JSON.stringify(tipoins).toString() !== '[{}]') {
            const tempins = {
              Id: this.info_configuracion_fechas.Id,
              PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
              Descripcion: 'Inscripción ' + this.info_configuracion_fechas.PeriodoId.Nombre +
              ' ' + this.info_configuracion_fechas.DependenciaId.Id,
              TipoEventoId: <any>tipoins[0],
              Activo: true,
              FechaInicio: this.info_configuracion_fechas.FechaInicioInscripcion,
              FechaFin: this.info_configuracion_fechas.FechaFinInscripcion,
            };
            this.eventoService.put('calendario_evento', tempins).subscribe(insc => {
              if (insc !== null && JSON.stringify(insc).toString() !== '[{}]') {
                this.eventoService.get('calendario_evento?query=TipoEventoId.Nombre:Pago inscripción,EventoPadreId.Id:' +
                this.info_configuracion_fechas.Id).subscribe(pagIns => {
                  if (pagIns !== null && JSON.stringify(pagIns).toString() !== '[{}]') {
                    const temppag = <any>pagIns[0];
                    this.eventoService.get('tipo_evento/?query=Nombre:Pago inscripción,DependenciaId:' +
                    this.info_configuracion_fechas.DependenciaId.Id).subscribe(tippagIns => {
                      if (tippagIns !== null && JSON.stringify(tippagIns).toString() !== '[{}]') {
                        temppag.TipoEventoId = <any>tippagIns[0];
                        temppag.FechaFin = this.info_configuracion_fechas.FechaPago;
                        temppag.FechaInicio = this.info_configuracion_fechas.FechaInicioInscripcion;
                        temppag.Descripcion = '' + this.info_configuracion_fechas.ValorInscripcion;
                        temppag.PeriodoId = this.info_configuracion_fechas.PeriodoId.Id;
                        this.eventoService.put('calendario_evento', temppag).subscribe(pagg => {
                          if (pagg !== null && JSON.stringify(pagg).toString() !== '[{}]') {
                            this.eventoService.get('calendario_evento?query=TipoEventoId.Nombre:Evaluación inscripción,EventoPadreId.Id:' +
                            this.info_configuracion_fechas.Id).subscribe(evaIns => {
                              if (evaIns !== null && JSON.stringify(evaIns).toString() !== '[{}]') {
                                const tempeva = <any>evaIns[0];
                                this.eventoService.get('tipo_evento/?query=Nombre:Evaluación inscripción,DependenciaId:' +
                                this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipevaIns => {
                                  if (tipevaIns !== null && JSON.stringify(tipevaIns).toString() !== '[{}]') {
                                    tempeva.TipoEventoId = <any>tipevaIns[0];
                                    tempeva.PeriodoId = this.info_configuracion_fechas.PeriodoId.Id;
                                    tempeva.FechaFin = this.info_configuracion_fechas.FechaFinEvaluacion;
                                    tempeva.FechaInicio = this.info_configuracion_fechas.FechaInicioEvaluacion;
                                    tempeva.Descripcion = 'Evaluación ' + this.info_configuracion_fechas.PeriodoId.Nombre +
                                      ' ' + this.info_configuracion_fechas.DependenciaId.Id;
                                    this.eventoService.put('calendario_evento', tempeva).subscribe(evaa => {
                                      if (evaa !== null && JSON.stringify(evaa).toString() !== '[{}]') {
                                        this.eventoService.get('calendario_evento?query=TipoEventoId.Nombre:Admisión,EventoPadreId.Id:' +
                                        this.info_configuracion_fechas.Id).subscribe(admIns => {
                                          if (admIns !== null && JSON.stringify(admIns).toString() !== '[{}]') {
                                            const tempadm = <any>admIns[0];
                                            this.eventoService.get('tipo_evento/?query=Nombre:Admisión,DependenciaId:' +
                                            this.info_configuracion_fechas.DependenciaId.Id).subscribe(tipadmIns => {
                                              if (tipadmIns !== null && JSON.stringify(tipadmIns).toString() !== '[{}]') {
                                                tempadm.TipoEventoId = <any>tipadmIns[0];
                                                tempadm.PeriodoId = this.info_configuracion_fechas.PeriodoId.Id;
                                                tempadm.FechaFin = this.info_configuracion_fechas.FechaFinAdmision;
                                                tempadm.FechaInicio = this.info_configuracion_fechas.FechaInicioAdmision;
                                                tempadm.Descripcion = 'Admisión ' + this.info_configuracion_fechas.PeriodoId.Nombre +
                                                  ' ' + this.info_configuracion_fechas.DependenciaId.Id;
                                                this.eventoService.put('calendario_evento', tempadm).subscribe(admm => {
                                                  if (admm !== null && JSON.stringify(admm).toString() !== '[{}]') {
                                                    this.evaluacionService.get('cupos_por_dependencia?query=DependenciaId:' +
                                                    this.info_configuracion_fechas.DependenciaId.Id + ',PeriodoId:' +
                                                    this.info_configuracion_fechas.PeriodoId.Id).subscribe(cuposr => {
                                                      if (cuposr !== null && JSON.stringify(cuposr).toString() !== '[{}]') {
                                                        const cupoput = <any>cuposr[0];
                                                        cupoput.PeriodoId = this.info_configuracion_fechas.PeriodoId.Id;
                                                        cupoput.DependenciaId = this.info_configuracion_fechas.DependenciaId.Id;
                                                        cupoput.CuposHabilitados = this.info_configuracion_fechas.CuposHabilitados;
                                                        cupoput.CuposOpcionados = this.info_configuracion_fechas.CuposOpcionados;
                                                        this.evaluacionService.put('cupos_por_dependencia', cupoput)
                                                        .subscribe(rescup => {
                                                          this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                                                            this.translate.instant('GLOBAL.configuracion_fechas') + ' ' +
                                                            this.translate.instant('GLOBAL.confirmarActualizar'));
                                                          this.info_configuracion_fechas = undefined;
                                                          this.clean = !this.clean;
                                                          this.eventChange.emit(true);
                                                        },
                                                          (error: HttpErrorResponse) => {
                                                            Swal({
                                                              type: 'error',
                                                              title: error.status + '',
                                                              text: this.translate.instant('ERROR.' + error.status),
                                                              footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                                                                this.translate.instant('GLOBAL.configuracion_fechas'),
                                                              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                                                            });
                                                          });
                                                      } else {
                                                        const tempcupos = {
                                                          PeriodoId: this.info_configuracion_fechas.PeriodoId.Id,
                                                          DependenciaId: this.info_configuracion_fechas.DependenciaId.Id,
                                                          Activo: true,
                                                          CuposHabilitados: this.info_configuracion_fechas.CuposHabilitados,
                                                          CuposOpcionados: this.info_configuracion_fechas.CuposOpcionados,
                                                        };
                                                        this.evaluacionService.post('cupos_por_dependencia', tempcupos)
                                                        .subscribe(cupost => {
                                                          if (cupost !== null && JSON.stringify(cupost).toString() !== '[{}]') {
                                                            this.showToast('info', this.translate.instant('GLOBAL.crear'),
                                                              this.translate.instant('GLOBAL.configuracion_fechas') + ' ' +
                                                                this.translate.instant('GLOBAL.confirmarCrear'));
                                                              this.info_configuracion_fechas = undefined;
                                                              this.clean = !this.clean;
                                                              this.eventChange.emit(true);
                                                          }
                                                        },
                                                          (error: HttpErrorResponse) => {
                                                            Swal({
                                                              type: 'error',
                                                              title: error.status + '',
                                                              text: this.translate.instant('ERROR.' + error.status),
                                                              footer: this.translate.instant('GLOBAL.crear') + '-' + '4' +
                                                                this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                                            this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                                        this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                                this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                            this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                        this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                                this.translate.instant('GLOBAL.configuracion_fechas'),
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
                            this.translate.instant('GLOBAL.configuracion_fechas'),
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
                        this.translate.instant('GLOBAL.configuracion_fechas'),
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
                    this.translate.instant('GLOBAL.configuracion_fechas'),
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
                this.translate.instant('GLOBAL.configuracion_fechas'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  ngOnInit() {
    this.loadConfiguracionFechas();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_configuracion_fechas === undefined) {
        this.createConfiguracionFechas(event.data.ConfiguracionFechas);
      } else {
        this.updateConfiguracionFechas(event.data.ConfiguracionFechas);
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
