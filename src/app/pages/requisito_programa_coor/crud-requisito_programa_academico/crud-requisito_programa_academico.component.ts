import { Periodo } from './../../../@core/data/models/periodo';
import { Requisito } from './../../../@core/data/models/requisito';
import { RequisitoProgramaAcademico } from './../../../@core/data/models/requisito_programa_academico';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { CoreService } from '../../../@core/data/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { FORM_REQUISITO_PROGRAMA_COOR } from './form-requisito_programa_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { ProgramaAcademico } from '../../../@core/data/models/programa_academico';

@Component({
  selector: 'ngx-crud-requisito-coordinacion',
  templateUrl: './crud-requisito_programa_academico.component.html',
  styleUrls: ['./crud-requisito_programa_academico.component.scss'],
})
export class CrudRequisitoProgramaAcademicoComponent implements OnInit {
  config: ToasterConfig;
  requisito_programa_academico_id: number;

  @Input('requisito_programa_academico_id')
  set name(requisito_programa_academico_id: number) {
    this.requisito_programa_academico_id = requisito_programa_academico_id;
    this.loadRequisitoProgramaAcademico();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito_programa_academico: RequisitoProgramaAcademico;
  formRequisitoProgramaAcademico: any;
  regRequisitoProgramaAcademico: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private requisitoService: EvaluacionInscripcionService,
    private coreService: CoreService,
    private programaAcademicoService: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formRequisitoProgramaAcademico = FORM_REQUISITO_PROGRAMA_COOR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadPeriodo();
    this.loadRequisito();
    this.loadProgramaAcademico();
   }

  construirForm() {
    this.formRequisitoProgramaAcademico.titulo = this.translate.instant('GLOBAL.requisito_programa_academico');
    this.formRequisitoProgramaAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisitoProgramaAcademico.campos.length; i++) {
      this.formRequisitoProgramaAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisitoProgramaAcademico.campos[i].label_i18n);
      this.formRequisitoProgramaAcademico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRequisitoProgramaAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRequisitoProgramaAcademico.campos.length; index++) {
      const element = this.formRequisitoProgramaAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadProgramaAcademico(): void { // para el combobox programa Academico
    let programaAcademico: Array<any> = [];
    this.programaAcademicoService.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          programaAcademico = <Array<ProgramaAcademico>>res;
        }
        this.formRequisitoProgramaAcademico.campos[this.getIndexForm('ProgramaAcademicoId')].opciones = programaAcademico;
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

  public loadPeriodo(): void { // para el combobox periodo
    let periodo: Array<any> = [];
    this.coreService.get('periodo?query=Activo:true&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          periodo = <Array<Periodo>>res;
        }
        this.formRequisitoProgramaAcademico.campos[this.getIndexForm('PeriodoId')].opciones = periodo;
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

  public loadRequisito(): void { // para el combobox requisito
    let requisito: Array<any> = [];
    this.requisitoService.get('requisito/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          requisito = <Array<Requisito>>res;
        }
        this.formRequisitoProgramaAcademico.campos[this.getIndexForm('RequisitoId')].opciones = requisito;
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

  public loadRequisitoProgramaAcademico(): void {
    if (this.requisito_programa_academico_id !== undefined && this.requisito_programa_academico_id !== 0) {
      this.requisitoService.get('requisito_programa_academico/?query=Id:' + this.requisito_programa_academico_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <RequisitoProgramaAcademico>res[0];
            this.requisitoService.get('requisito/' + this.element.RequisitoId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                this.element.RequisitoId = <any>res2;
                this.programaAcademicoService.get('dependencia/' + this.element.ProgramaAcademicoId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.element.ProgramaAcademicoId = <any>res3;
                    this.coreService.get('periodo/' + this.element.PeriodoId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        this.element.PeriodoId = <any>res4;
                        if (this.element.PeriodoId.Activo.toString() !== 'true') {
                          for (let i = 0; i < this.formRequisitoProgramaAcademico.campos.length; i++) {
                            this.formRequisitoProgramaAcademico.campos[i].deshabilitar = true;
                          }
                          this.formRequisitoProgramaAcademico.campos[this.getIndexForm('PeriodoId')].opciones.push(<Periodo>res4);
                        }
                      }
                      this.info_requisito_programa_academico = this.element;
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
      this.info_requisito_programa_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisitoProgramaAcademico(descuentosDependencia: any): void {
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
        this.info_requisito_programa_academico = <RequisitoProgramaAcademico>descuentosDependencia;
        this.info_requisito_programa_academico.ProgramaAcademicoId = this.info_requisito_programa_academico.ProgramaAcademicoId.Id;
        this.info_requisito_programa_academico.PeriodoId = this.info_requisito_programa_academico.PeriodoId.Id;
        this.requisitoService.put('requisito_programa_academico', this.info_requisito_programa_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_requisito_programa_academico = undefined;
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

  createRequisitoProgramaAcademico(requisitoPrograma: any): void {
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
        this.info_requisito_programa_academico = <RequisitoProgramaAcademico>requisitoPrograma;
        this.info_requisito_programa_academico.ProgramaAcademicoId = this.info_requisito_programa_academico.ProgramaAcademicoId.Id;
        this.info_requisito_programa_academico.PeriodoId = this.info_requisito_programa_academico.PeriodoId.Id;
        this.requisitoService.post('requisito_programa_academico', this.info_requisito_programa_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.requisito_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_requisito_programa_academico = undefined;
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
    this.loadRequisitoProgramaAcademico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito_programa_academico === undefined) {
        this.createRequisitoProgramaAcademico(event.data.RequisitoProgramaCoor);
      } else {
        this.updateRequisitoProgramaAcademico(event.data.RequisitoProgramaCoor);
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
