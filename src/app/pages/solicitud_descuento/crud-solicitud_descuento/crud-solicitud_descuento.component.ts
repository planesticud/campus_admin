import { DescuentosDependencia } from './../../../@core/data/models/descuentos_dependencia';
import { SolicitudDescuento } from './../../../@core/data/models/solicitud_descuento';
import { Persona } from './../../../@core/data/models/persona';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
// import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_SOLICITUD_DESCUENTO } from './form-solicitud_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-solicitud-descuento',
  templateUrl: './crud-solicitud_descuento.component.html',
  styleUrls: ['./crud-solicitud_descuento.component.scss'],
})
export class CrudSolicitudDescuentoComponent implements OnInit {
  config: ToasterConfig;
  solicitud_descuento_id: number;

  @Input('solicitud_descuento_id')
  set name(solicitud_descuento_id: number) {
    this.solicitud_descuento_id = solicitud_descuento_id;
    this.loadSolicitudDescuento();
  }

  @Output() eventChange = new EventEmitter();

  info_solicitud_descuento: SolicitudDescuento;
  formSolicitudDescuento: any;
  regSolicitudDescuento: any;
  clean: boolean;
  element: any;
  data: any;

  constructor(private translate: TranslateService,
    private personas: PersonaService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaAcademicoService,
    // private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formSolicitudDescuento = FORM_SOLICITUD_DESCUENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsDescuentosDependenciaId();
    this.loadOptionsPersonaId();
  }

  construirForm() {
    this.formSolicitudDescuento.titulo = this.translate.instant('GLOBAL.solicitud_descuento');
    this.formSolicitudDescuento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formSolicitudDescuento.campos.length; i++) {
      this.formSolicitudDescuento.campos[i].label = this.translate.instant('GLOBAL.' + this.formSolicitudDescuento.campos[i].label_i18n);
      this.formSolicitudDescuento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formSolicitudDescuento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsPersonaId(): void {
    let personaId: Array<any> = [];
    this.personas.get('persona/?limit=0').subscribe(res => {
      if (res !== null) {
        personaId = <Array<Persona>>res;
        personaId.forEach(elemento => {
          elemento.Nombre = elemento.PrimerNombre + ' ' +
            elemento.SegundoNombre + ' ' +
            elemento.PrimerApellido + ' ' +
            elemento.SegundoApellido;
          this.formSolicitudDescuento.campos[ this.getIndexForm('PersonaId') ].opciones = personaId;
        });
      }
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

  loadOptionsDescuentosDependenciaId(): void {
    let descuentosDependenciaId: Array<any> = [];
    this.descuentosService.get('descuentos_dependencia/?limit=0').subscribe(res => {
      if (res !== null) {
        descuentosDependenciaId = <Array<DescuentosDependencia>>res;
        descuentosDependenciaId.forEach(elemento => {
          const dependenciaId = <any>elemento;
          this.programaAcademico.get('programa_academico/' + dependenciaId.DependenciaId).subscribe(res2 => {
            if (res2 != null) {
              elemento.DependenciaId = <any>res2;
              this.descuentosService.get('tipo_descuento/' + dependenciaId.TipoDescuentoId.Id).subscribe(res3 => {
                if (res3 !== null) {
                  elemento.TipoDescuentoId = <any>res3;
                  elemento.Nombre = elemento.PeriodoId + '-' +
                    elemento.DependenciaId.Nombre + '-' +
                    elemento.TipoDescuentoId.Nombre;
                }
                this.formSolicitudDescuento.campos[ this.getIndexForm('DescuentosDependenciaId') ].opciones = descuentosDependenciaId;
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

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formSolicitudDescuento.campos.length; index++) {
      const element = this.formSolicitudDescuento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadSolicitudDescuento(): void {
    if (this.solicitud_descuento_id !== undefined && this.solicitud_descuento_id !== 0) {
      this.descuentosService.get('solicitud_descuento/?query=id:' + this.solicitud_descuento_id)
        .subscribe(res => {
          if (res !== null) {
            this.element = <SolicitudDescuento>res[0];
            this.descuentosService.get('descuentos_dependencia/' + this.element.DescuentosDependenciaId.Id)
              .subscribe(res2 => {
                if (res2 !== null) {
                  this.element.DescuentosDependenciaId = <any>res2;
                  const dependenciaId = <any>res2;
                  this.programaAcademico.get('programa_academico/' + dependenciaId.DependenciaId).subscribe(res3 => {
                    if (res3 != null) {
                      this.element.DescuentosDependenciaId.DependenciaId = <any>res3;
                      this.descuentosService.get('tipo_descuento/' + dependenciaId.TipoDescuentoId.Id).subscribe(res4 => {
                        if (res4 !== null) {
                          this.element.DescuentosDependenciaId.TipoDescuentoId = <any>res4;
                          this.element.DescuentosDependenciaId.Nombre = this.element.DescuentosDependenciaId.PeriodoId + '-' +
                            this.element.DescuentosDependenciaId.DependenciaId.Nombre + '-' +
                            this.element.DescuentosDependenciaId.TipoDescuentoId.Nombre;
                          this.personas.get('persona/' + this.element.PersonaId).subscribe(res5 => {
                            if (res5 !== null) {
                              this.element.PersonaId = <any>res5;
                              this.element.PersonaId.Nombre = this.element.PersonaId.PrimerNombre + ' ' +
                                this.element.PersonaId.SegundoNombre + ' ' +
                                this.element.PersonaId.PrimerApellido + ' ' +
                                this.element.PersonaId.SegundoApellido;
                            }
                            this.info_solicitud_descuento = this.element;
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
                this.translate.instant('GLOBAL.solicitud_descuento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_solicitud_descuento = undefined;
      this.clean = !this.clean;
    }
  }

  updateSolicitudDescuento(solicitudDescuento: any): void {
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
        this.info_solicitud_descuento = <SolicitudDescuento>solicitudDescuento;
        const dependencia = this.info_solicitud_descuento.DescuentosDependenciaId.DependenciaId.Id;
        const persona = this.info_solicitud_descuento.PersonaId.Id;
        this.info_solicitud_descuento.DescuentosDependenciaId.DependenciaId = dependencia;
        this.info_solicitud_descuento.PersonaId = persona;
        this.descuentosService.put('solicitud_descuento', this.info_solicitud_descuento)
          .subscribe(res => {
            this.loadSolicitudDescuento();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.solicitud_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_solicitud_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.solicitud_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createSolicitudDescuento(solicitudDescuento: any): void {
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
        this.info_solicitud_descuento = <SolicitudDescuento>solicitudDescuento;
        const dependencia = this.info_solicitud_descuento.DescuentosDependenciaId.DependenciaId.Id;
        const persona = this.info_solicitud_descuento.PersonaId.Id;
        this.info_solicitud_descuento.DescuentosDependenciaId.DependenciaId = dependencia;
        this.info_solicitud_descuento.PersonaId = persona;
        this.descuentosService.post('solicitud_descuento', this.info_solicitud_descuento)
          .subscribe(res => {
            this.info_solicitud_descuento = <SolicitudDescuento>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.solicitud_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_solicitud_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.solicitud_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadSolicitudDescuento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_solicitud_descuento === undefined) {
        this.createSolicitudDescuento(event.data.SolicitudDescuento);
      } else {
        this.updateSolicitudDescuento(event.data.SolicitudDescuento);
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
