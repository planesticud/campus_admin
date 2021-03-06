import { Metodologia } from './../../../@core/data/models/metodologia';
import { NivelFormacion } from './../../../@core/data/models/nivel_formacion';
import { Titulacion } from './../../../@core/data/models/titulacion';
import { Organizacion } from '../../../@core/data/models/organizacion';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { NucleoBasicoConocimiento } from '../../../@core/data/models/nucleo_basico_conocimiento';
import { UnidadTiempo } from '../../../@core/data/models/unidad_tiempo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_PROGRAMA_ACADEMICO } from './form-programa_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-programa-academico',
  templateUrl: './crud-programa_academico.component.html',
  styleUrls: ['./crud-programa_academico.component.scss'],
})
export class CrudProgramaAcademicoComponent implements OnInit {
  config: ToasterConfig;
  programa_academico_id: number;

  @Input('programa_academico_id')
  set name(programa_academico_id: number) {
    this.programa_academico_id = programa_academico_id;
    this.loadProgramaAcademico();
  }

  @Output() eventChange = new EventEmitter();

  info_programa_academico: ProgramaAcademico;
  formProgramaAcademico: any;
  regProgramaAcademico: any;
  clean: boolean;

  constructor(private translate: TranslateService, private programaAcademicoService: ProgramaAcademicoService,
    private coreService: CoreService, private organizacionService: OrganizacionService,
    private toasterService: ToasterService) {
    this.formProgramaAcademico = FORM_PROGRAMA_ACADEMICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsMetodologia();
    this.loadOptionsNivelFormacion();
    this.loadOptionsNucleoBasicoConocimiento();
    this.loadOptionsInstitucion();
    this.loadOptionsTitulacion();
    this.loadOptionsUnidadTiempo();
  }

  construirForm() {
    this.formProgramaAcademico.titulo = this.translate.instant('GLOBAL.programa_academico');
    this.formProgramaAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formProgramaAcademico.campos.length; i++) {
      this.formProgramaAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formProgramaAcademico.campos[i].label_i18n);
      this.formProgramaAcademico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formProgramaAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsMetodologia(): void {
    let metodologia: Array<any> = [];
    this.programaAcademicoService.get('metodologia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          metodologia = <Array<Metodologia>>res;
        }
        this.formProgramaAcademico.campos[ this.getIndexForm('Metodologia') ].opciones = metodologia;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.metodologia'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsNivelFormacion(): void {
    let nivelFormacion: Array<any> = [];
    this.programaAcademicoService.get('nivel_formacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          nivelFormacion = <Array<NivelFormacion>>res;
        }
        this.formProgramaAcademico.campos[ this.getIndexForm('NivelFormacion') ].opciones = nivelFormacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.nivel_formacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTitulacion(): void {
    let titulacion: Array<any> = [];
    this.programaAcademicoService.get('titulacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          titulacion = <Array<Titulacion>>res;
        }
        this.formProgramaAcademico.campos[ this.getIndexForm('Titulacion') ].opciones = titulacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.titulacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsNucleoBasicoConocimiento(): void {
    let nucleo: Array<any> = [];
    this.coreService.get('nucleo_basico_conocimiento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          nucleo = <Array<NucleoBasicoConocimiento>>res;
        }
        this.formProgramaAcademico.campos[ this.getIndexForm('NucleoBasicoConocimiento') ].opciones = nucleo;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsUnidadTiempo(): void {
    let unidad: Array<any> = [];
      this.coreService.get('unidad_tiempo/?limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            unidad = <Array<UnidadTiempo>>res;
          }
          this.formProgramaAcademico.campos[ this.getIndexForm('UnidadTiempo') ].opciones = unidad;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.unidad_tiempo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  loadOptionsInstitucion(): void {
    let institucion: Array<any> = [];
    this.organizacionService.get('organizacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          institucion = <Array<Organizacion>>res;
        }
        this.formProgramaAcademico.campos[ this.getIndexForm('Institucion') ].opciones = institucion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.institucion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formProgramaAcademico.campos.length; index++) {
      const element = this.formProgramaAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadProgramaAcademico(): void {
    if (this.programa_academico_id !== undefined && this.programa_academico_id !== 0) {
      this.programaAcademicoService.get('programa_academico/?query=Id:' + this.programa_academico_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const programa = <ProgramaAcademico>res[0];
            this.coreService.get('nucleo_basico_conocimiento/' + programa.NucleoBasicoConocimiento)
              .subscribe(nucleo => {
                if (nucleo !== null && JSON.stringify(nucleo).toString() !== '[{}]') {
                  programa.NucleoBasicoConocimiento = <NucleoBasicoConocimiento>nucleo;
                  this.coreService.get('unidad_tiempo/' + programa.UnidadTiempo)
                    .subscribe(tiempo => {
                      if (tiempo !== null && JSON.stringify(tiempo).toString() !== '[{}]') {
                        programa.UnidadTiempo = <UnidadTiempo>tiempo;
                        this.organizacionService.get('organizacion/' +  programa.Institucion)
                          .subscribe(institucion => {
                            if (institucion !== null && JSON.stringify(institucion).toString() !== '[{}]') {
                              programa.Institucion = <Organizacion>institucion;
                              this.info_programa_academico = programa;
                            }
                          },
                            (error: HttpErrorResponse) => {
                              Swal({
                                type: 'error',
                                title: error.status + '',
                                text: this.translate.instant('ERROR.' + error.status),
                                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.programa_academico') + '|' +
                                this.translate.instant('GLOBAL.institucion'),
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
                            this.translate.instant('GLOBAL.programa_academico') + '|' +
                            this.translate.instant('GLOBAL.unidad_tiempo'),
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
                      this.translate.instant('GLOBAL.programa_academico') + '|' +
                      this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
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
    } else  {
      this.info_programa_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updateProgramaAcademico(programaAcademico: any): void {
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
        this.info_programa_academico = <ProgramaAcademico>programaAcademico;
        this.info_programa_academico.NucleoBasicoConocimiento = this.info_programa_academico.NucleoBasicoConocimiento.Id;
        this.info_programa_academico.UnidadTiempo = this.info_programa_academico.UnidadTiempo.Id;
        this.info_programa_academico.Institucion = this.info_programa_academico.Institucion.Id;
        this.programaAcademicoService.put('programa_academico', this.info_programa_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.programa_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_programa_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.programa_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createProgramaAcademico(programaAcademico: any): void {
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
        this.info_programa_academico = <ProgramaAcademico>programaAcademico;
        this.info_programa_academico.NucleoBasicoConocimiento = this.info_programa_academico.NucleoBasicoConocimiento.Id;
        this.info_programa_academico.UnidadTiempo = this.info_programa_academico.UnidadTiempo.Id;
        this.info_programa_academico.Institucion = this.info_programa_academico.Institucion.Id;
        this.programaAcademicoService.post('programa_academico', this.info_programa_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.programa_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_programa_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.programa_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadProgramaAcademico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_programa_academico === undefined) {
        this.createProgramaAcademico(event.data.ProgramaAcademico);
      } else {
        this.updateProgramaAcademico(event.data.ProgramaAcademico);
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
