import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { CupoDependencia } from './../../../@core/data/models/cupo_dependencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { CoreService } from '../../../@core/data/core.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_CUPO_DEPENDENCIA } from './form-cupo_dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-cupo-dependencia',
  templateUrl: './crud-cupo_dependencia.component.html',
  styleUrls: ['./crud-cupo_dependencia.component.scss'],
})
export class CrudCupoDependenciaComponent implements OnInit {
  config: ToasterConfig;
  cupo_dependencia_id: number;

  @Input('cupo_dependencia_id')
  set name(cupo_dependencia_id: number) {
    this.cupo_dependencia_id = cupo_dependencia_id;
    this.loadCupoDependencia();
  }

  @Output() eventChange = new EventEmitter();

  info_cupo_dependencia: CupoDependencia;
  formCupoDependencia: any;
  regCupoDependencia: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private requisitoService: EvaluacionInscripcionService,
    private programaAcademico: ProgramaOikosService,
    private core: CoreService,
    private toasterService: ToasterService) {
    this.formCupoDependencia = FORM_CUPO_DEPENDENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsPeriodoId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formCupoDependencia.titulo = this.translate.instant('GLOBAL.cupo_dependencia');
    this.formCupoDependencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formCupoDependencia.campos.length; i++) {
      this.formCupoDependencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formCupoDependencia.campos[i].label_i18n);
      this.formCupoDependencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formCupoDependencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<ProgramaAcademico>>res;
        }
        this.formCupoDependencia.campos[ this.getIndexForm('DependenciaId') ].opciones = dependenciaId;
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

  loadOptionsPeriodoId(): void {
    let periodoId: Array<any> = [];
    this.core.get('periodo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          periodoId = <Array<ProgramaAcademico>>res;
        }
        this.formCupoDependencia.campos[ this.getIndexForm('PeriodoId') ].opciones = periodoId;
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

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formCupoDependencia.campos.length; index++) {
      const element = this.formCupoDependencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadCupoDependencia(): void {
    if (this.cupo_dependencia_id !== undefined && this.cupo_dependencia_id !== 0) {
      this.requisitoService.get('cupos_por_dependencia/?query=Id:' + this.cupo_dependencia_id)
        .subscribe(res => {
          if (res !== null) {
            this.element = <CupoDependencia>res[0];
            this.programaAcademico.get('dependencia/' + this.element.DependenciaId).subscribe(res3 => {
              if (res3 != null) {
                this.element.DependenciaId = <any>res3;
                this.core.get('periodo/' + this.element.PeriodoId).subscribe(res4 => {
                  if (res4 != null) {
                    this.element.PeriodoId = <any>res4;
                  }
                  this.info_cupo_dependencia = this.element;
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
                this.translate.instant('GLOBAL.cupo_dependencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_cupo_dependencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateCupoDependencia(cupoDependencia: any): void {
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
        this.info_cupo_dependencia = <CupoDependencia>cupoDependencia;
        this.info_cupo_dependencia.DependenciaId = this.info_cupo_dependencia.DependenciaId.Id;
        this.info_cupo_dependencia.PeriodoId = this.info_cupo_dependencia.PeriodoId.Id;
        this.requisitoService.put('cupos_por_dependencia', this.info_cupo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.cupo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_cupo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.cupo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createCupoDependencia(cupoDependencia: any): void {
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
        this.info_cupo_dependencia = <CupoDependencia>cupoDependencia;
        this.info_cupo_dependencia.DependenciaId = this.info_cupo_dependencia.DependenciaId.Id;
        this.info_cupo_dependencia.PeriodoId = this.info_cupo_dependencia.PeriodoId.Id;
        this.requisitoService.post('cupos_por_dependencia', this.info_cupo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.cupo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_cupo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.cupo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadCupoDependencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_cupo_dependencia === undefined) {
        this.createCupoDependencia(event.data.CupoDependencia);
      } else {
        this.updateCupoDependencia(event.data.CupoDependencia);
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
