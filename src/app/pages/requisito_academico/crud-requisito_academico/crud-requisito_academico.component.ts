import { Requisito } from './../../../@core/data/models/requisito';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { FORM_REQUISITO_ACADEMICO } from './form-requisito_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-requisito-academico',
  templateUrl: './crud-requisito_academico.component.html',
  styleUrls: ['./crud-requisito_academico.component.scss'],
})
export class CrudRequisitoAcademicoComponent implements OnInit {
  config: ToasterConfig;
  requisito_id: number;

  @Input('requisito_id')
  set name(requisito_id: number) {
    this.requisito_id = requisito_id;
    this.loadRequisito();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito_academico: Requisito;
  formRequisitoAcademico: any;
  regRequisitoAcademico: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private evaluacionInscripcionService: EvaluacionInscripcionService,
    private toasterService: ToasterService) {
    this.formRequisitoAcademico = FORM_REQUISITO_ACADEMICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formRequisitoAcademico.titulo = this.translate.instant('GLOBAL.requisito_academico');
    this.formRequisitoAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisitoAcademico.campos.length; i++) {
      this.formRequisitoAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisitoAcademico.campos[i].label_i18n);
      this.formRequisitoAcademico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formRequisitoAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRequisitoAcademico.campos.length; index++) {
      const element = this.formRequisitoAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRequisito(): void {
    if (this.requisito_id !== undefined && this.requisito_id !== 0) {
      this.evaluacionInscripcionService.get('requisito/?query=Id:' + this.requisito_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_requisito_academico = <Requisito>res[0];
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
    } else  {
      this.info_requisito_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisito(requisito: any): void {
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
        this.info_requisito_academico = <Requisito>requisito;
        this.evaluacionInscripcionService.put('requisito', this.info_requisito_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_requisito_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.requisito_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRequisito(requisito: any): void {
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
        this.info_requisito_academico = <Requisito>requisito;
        this.evaluacionInscripcionService.post('requisito', this.info_requisito_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.requisito_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_requisito_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.requisito_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRequisito();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito_academico === undefined) {
        this.createRequisito(event.data.Requisito);
      } else {
        this.updateRequisito(event.data.Requisito);
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
