import { SolicitudDescuento } from './../../../@core/data/models/solicitud_descuento';
import { SoporteDescuento } from './../../../@core/data/models/soporte_descuento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
// import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { FORM_SOPORTE_DESCUENTO } from './form-soporte_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-soporte-descuento',
  templateUrl: './crud-soporte_descuento.component.html',
  styleUrls: ['./crud-soporte_descuento.component.scss'],
})
export class CrudSoporteDescuentoComponent implements OnInit {
  config: ToasterConfig;
  soporte_descuento_id: number;

  @Input('soporte_descuento_id')
  set name(soporte_descuento_id: number) {
    this.soporte_descuento_id = soporte_descuento_id;
    this.loadSoporteDescuento();
  }

  @Output() eventChange = new EventEmitter();

  info_soporte_descuento: SoporteDescuento;
  formSoporteDescuento: any;
  regSoporteDescuento: any;
  clean: boolean;
  element: any;
  data: any;

  constructor(private translate: TranslateService,
    private personas: PersonaService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaAcademicoService,
    // private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formSoporteDescuento = FORM_SOPORTE_DESCUENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsSolicitudDescuentoId();
  }

  construirForm() {
    this.formSoporteDescuento.titulo = this.translate.instant('GLOBAL.soporte_descuento');
    this.formSoporteDescuento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formSoporteDescuento.campos.length; i++) {
      this.formSoporteDescuento.campos[i].label = this.translate.instant('GLOBAL.' + this.formSoporteDescuento.campos[i].label_i18n);
      this.formSoporteDescuento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formSoporteDescuento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsSolicitudDescuentoId(): void {
    let solicitudDescuentoId: Array<any> = [];
    this.descuentosService.get('solicitud_descuento/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          solicitudDescuentoId = <Array<SolicitudDescuento>>res;
          solicitudDescuentoId.forEach(elemento => {
            this.descuentosService.get('descuentos_dependencia/' + elemento.DescuentosDependenciaId.Id).subscribe(res2 => {
              if (res2 !== null) {
                elemento.DescuentosDependenciaId = <any>res2;
                const dependenciaId = <any>res2;
                this.programaAcademico.get('programa_academico/' + dependenciaId.DependenciaId).subscribe(res3 => {
                  if (res3 != null) {
                    elemento.DescuentosDependenciaId.DependenciaId = <any>res3;
                    this.descuentosService.get('tipo_descuento/' + dependenciaId.TipoDescuentoId.Id).subscribe(res4 => {
                      if (res4 !== null) {
                        elemento.DescuentosDependenciaId.TipoDescuentoId = <any>res4;
                        this.personas.get('persona/' + elemento.PersonaId).subscribe(res5 => {
                          if (res5 !== null) {
                            elemento.PersonaId = <any>res5;
                            elemento.Nombre = elemento.PeriodoId + '-' +
                              elemento.PersonaId.PrimerNombre + ' ' +
                              elemento.PersonaId.SegundoNombre + ' ' +
                              elemento.PersonaId.PrimerApellido + ' ' +
                              elemento.PersonaId.SegundoApellido + '-' +
                              elemento.DescuentosDependenciaId.DependenciaId.Nombre + '-' +
                              elemento.DescuentosDependenciaId.TipoDescuentoId.Nombre;
                          }
                          this.formSoporteDescuento.campos[ this.getIndexForm('SolicitudDescuentoId') ].opciones = solicitudDescuentoId;
                        },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.persona_id'),
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
                            this.translate.instant('GLOBAL.tipo_descuento'),
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
                        this.translate.instant('GLOBAL.dependencia_id'),
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
                    this.translate.instant('GLOBAL.descuentos_dependencia'),
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
              this.translate.instant('GLOBAL.solicitud_descuento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formSoporteDescuento.campos.length; index++) {
      const element = this.formSoporteDescuento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadSoporteDescuento(): void {
    if (this.soporte_descuento_id !== undefined && this.soporte_descuento_id !== 0) {
      this.descuentosService.get('soporte_descuento/?query=id:' + this.soporte_descuento_id)
        .subscribe(res => {
          if (res !== null) {
            this.element =  <SoporteDescuento>res[0];
            this.descuentosService.get('solicitud_descuento/' + this.element.SolicitudDescuentoId.Id)
              .subscribe(res2 => {
                if (res2 !== null) {
                  this.element.SolicitudDescuentoId = <any>res2;
                  const solicitudDescuentoId = <any>res2;
                  this.descuentosService.get('descuentos_dependencia/' + solicitudDescuentoId.DescuentosDependenciaId.Id).subscribe(res3 => {
                    if (res3 !== null) {
                      this.element.SolicitudDescuentoId.DescuentosDependenciaId = <any>res3;
                      const descuentosDependenciaId = <any>res3;
                      this.programaAcademico.get('programa_academico/' + descuentosDependenciaId.DependenciaId).subscribe(res4 => {
                        if (res4 != null) {
                          this.element.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId = <any>res4;
                          this.descuentosService.get('tipo_descuento/' + descuentosDependenciaId.TipoDescuentoId.Id).subscribe(res5 => {
                            if (res5 !== null) {
                              this.element.SolicitudDescuentoId.DescuentosDependenciaId.TipoDescuentoId = <any>res5;
                              this.personas.get('persona/' + this.element.SolicitudDescuentoId.PersonaId).subscribe(res6 => {
                                if (res6 !== null) {
                                  this.element.SolicitudDescuentoId.PersonaId = <any>res6;
                                  this.element.SolicitudDescuentoId.Nombre = this.element.SolicitudDescuentoId.PeriodoId + '-' +
                                    this.element.SolicitudDescuentoId.PersonaId.PrimerNombre + ' ' +
                                    this.element.SolicitudDescuentoId.PersonaId.SegundoNombre + ' ' +
                                    this.element.SolicitudDescuentoId.PersonaId.PrimerApellido + ' ' +
                                    this.element.SolicitudDescuentoId.PersonaId.SegundoApellido + '-' +
                                    this.element.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId.Nombre + '-' +
                                    this.element.SolicitudDescuentoId.DescuentosDependenciaId.TipoDescuentoId.Nombre;
                                }
                                this.info_soporte_descuento = this.element;
                              },
                                (error: HttpErrorResponse) => {
                                  Swal({
                                    type: 'error',
                                    title: error.status + '',
                                    text: this.translate.instant('ERROR.' + error.status),
                                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                      this.translate.instant('GLOBAL.persona_id'),
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
                                  this.translate.instant('GLOBAL.tipo_descuento'),
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
                              this.translate.instant('GLOBAL.dependencia_id'),
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
                          this.translate.instant('GLOBAL.descuentos_dependencia'),
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
                      this.translate.instant('GLOBAL.solicitud_descuento'),
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
                this.translate.instant('GLOBAL.soporte_descuento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_soporte_descuento = undefined;
      this.clean = !this.clean;
    }
  }

  updateSoporteDescuento(soporteDescuento: any): void {
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
        this.info_soporte_descuento = <SoporteDescuento>soporteDescuento;
        this.info_soporte_descuento.SolicitudDescuentoId.PersonaId = this.info_soporte_descuento.SolicitudDescuentoId.PersonaId.Id;
        const dependencia = this.info_soporte_descuento.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId.Id;
        this.info_soporte_descuento.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId = dependencia;
        this.descuentosService.put('soporte_descuento', this.info_soporte_descuento)
          .subscribe(res => {
            this.loadSoporteDescuento();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.soporte_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_soporte_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.soporte_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createSoporteDescuento(soporteDescuento: any): void {
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
        this.info_soporte_descuento = <SoporteDescuento>soporteDescuento;
        this.info_soporte_descuento.SolicitudDescuentoId.PersonaId = this.info_soporte_descuento.SolicitudDescuentoId.PersonaId.Id;
        const dependencia = this.info_soporte_descuento.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId.Id;
        this.info_soporte_descuento.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId = dependencia;
        this.descuentosService.post('soporte_descuento', this.info_soporte_descuento)
          .subscribe(res => {
            this.info_soporte_descuento = <SoporteDescuento>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.soporte_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_soporte_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.soporte_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadSoporteDescuento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_soporte_descuento === undefined) {
        this.createSoporteDescuento(event.data.SoporteDescuento);
      } else {
        this.updateSoporteDescuento(event.data.SoporteDescuento);
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
