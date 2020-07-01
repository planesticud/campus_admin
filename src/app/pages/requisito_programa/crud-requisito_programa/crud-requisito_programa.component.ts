import { Requisito } from './../../../@core/data/models/requisito';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { RequisitoProgramaAcademico } from './../../../@core/data/models/requisito_programa_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { CoreService } from '../../../@core/data/core.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_REQUISITO_PROGRAMA } from './form-requisito_programa';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { Periodo } from '../../../@core/data/models/periodo';

@Component({
  selector: 'ngx-crud-requisito-programa',
  templateUrl: './crud-requisito_programa.component.html',
  styleUrls: ['./crud-requisito_programa.component.scss'],
})
export class CrudRequisitoProgramaComponent implements OnInit {
  config: ToasterConfig;
  requisito_programa_id: number;

  @Input('requisito_programa_id')
  set name(requisito_programa_id: number) {
    this.requisito_programa_id = requisito_programa_id;
    this.loadRequisitoPrograma();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito_programa: RequisitoProgramaAcademico;
  formRequisitoPrograma: any;
  regRequisitoPrograma: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private requisitoService: EvaluacionInscripcionService,
    private programaAcademico: ProgramaOikosService,
    private core: CoreService,
    private toasterService: ToasterService) {
    this.formRequisitoPrograma = FORM_REQUISITO_PROGRAMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsRequisitoId();
    this.loadOptionsPeriodoId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formRequisitoPrograma.titulo = this.translate.instant('GLOBAL.requisito_programa');
    this.formRequisitoPrograma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisitoPrograma.campos.length; i++) {
      this.formRequisitoPrograma.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisitoPrograma.campos[i].label_i18n);
      this.formRequisitoPrograma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRequisitoPrograma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsRequisitoId(): void {
    let requisitoId: Array<any> = [];
    this.requisitoService.get('requisito/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          requisitoId = <Array<Requisito>>res;
        }
        this.formRequisitoPrograma.campos[ this.getIndexForm('RequisitoId') ].opciones = requisitoId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.requisito_academico'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<ProgramaAcademico>>res;
        }
        this.formRequisitoPrograma.campos[ this.getIndexForm('ProgramaAcademicoId') ].opciones = dependenciaId;
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
          periodoId = <Array<Periodo>>res;
        }
        this.formRequisitoPrograma.campos[ this.getIndexForm('PeriodoId') ].opciones = periodoId;
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
    for (let index = 0; index < this.formRequisitoPrograma.campos.length; index++) {
      const element = this.formRequisitoPrograma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRequisitoPrograma(): void {
    if (this.requisito_programa_id !== undefined && this.requisito_programa_id !== 0) {
      this.requisitoService.get('requisito_programa_academico/?query=Id:' + this.requisito_programa_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <RequisitoProgramaAcademico>res[0];
            this.requisitoService.get('requisito/' + this.element.RequisitoId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                this.element.RequisitoId = <any>res2;
                this.programaAcademico.get('dependencia/' + this.element.ProgramaAcademicoId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.element.ProgramaAcademicoId = <any>res3;
                    this.core.get('periodo/' + this.element.PeriodoId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        this.element.PeriodoId = <any>res4;
                      }
                      this.info_requisito_programa = this.element;
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
                    this.translate.instant('GLOBAL.requisito_academico'),
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
                this.translate.instant('GLOBAL.requisito_programa'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_requisito_programa = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisitoPrograma(descuentosDependencia: any): void {
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
        this.info_requisito_programa = <RequisitoProgramaAcademico>descuentosDependencia;
        this.info_requisito_programa.ProgramaAcademicoId = this.info_requisito_programa.ProgramaAcademicoId.Id;
        this.info_requisito_programa.PeriodoId = this.info_requisito_programa.PeriodoId.Id;
        this.requisitoService.put('requisito_programa_academico', this.info_requisito_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_requisito_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.requisito_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRequisitoPrograma(requisitoPrograma: any): void {
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
        this.info_requisito_programa = <RequisitoProgramaAcademico>requisitoPrograma;
        this.info_requisito_programa.ProgramaAcademicoId = this.info_requisito_programa.ProgramaAcademicoId.Id;
        this.info_requisito_programa.PeriodoId = this.info_requisito_programa.PeriodoId.Id;
        this.requisitoService.post('requisito_programa_academico', this.info_requisito_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.requisito_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_requisito_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.requisito_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRequisitoPrograma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito_programa === undefined) {
        this.createRequisitoPrograma(event.data.RequisitoPrograma);
      } else {
        this.updateRequisitoPrograma(event.data.RequisitoPrograma);
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
