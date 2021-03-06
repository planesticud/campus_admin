import { ConceptoAcademico } from './../../../@core/data/models/concepto_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_CONCEPTO_ACADEMICO } from './form-concepto_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-concepto-academico',
  templateUrl: './crud-concepto_academico.component.html',
  styleUrls: ['./crud-concepto_academico.component.scss'],
})
export class CrudConceptoAcademicoComponent implements OnInit {
  config: ToasterConfig;
  concepto_academico_id: number;

  @Input('concepto_academico_id')
  set name(concepto_academico_id: number) {
    this.concepto_academico_id = concepto_academico_id;
    this.loadConceptoAcademico();
  }

  @Output() eventChange = new EventEmitter();

  info_concepto_academico: ConceptoAcademico;
  formConceptoAcademico: any;
  regConceptoAcademico: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formConceptoAcademico = FORM_CONCEPTO_ACADEMICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formConceptoAcademico.titulo = this.translate.instant('GLOBAL.concepto_academico');
    this.formConceptoAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formConceptoAcademico.campos.length; i++) {
      this.formConceptoAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formConceptoAcademico.campos[i].label_i18n);
      this.formConceptoAcademico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formConceptoAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formConceptoAcademico.campos.length; index++) {
      const element = this.formConceptoAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadConceptoAcademico(): void {
    if (this.concepto_academico_id !== undefined && this.concepto_academico_id !== 0) {
      this.coreService.get('concepto_academico/?query=Id:' + this.concepto_academico_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_concepto_academico = <ConceptoAcademico>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.concepto_academico'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_concepto_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updateConceptoAcademico(conceptoAcademico: any): void {
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
        this.info_concepto_academico = <ConceptoAcademico>conceptoAcademico;
        this.coreService.put('concepto_academico', this.info_concepto_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.concepto_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_concepto_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.concepto_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createConceptoAcademico(conceptoAcademico: any): void {
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
        this.info_concepto_academico = <ConceptoAcademico>conceptoAcademico;
        this.coreService.post('concepto_academico', this.info_concepto_academico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.concepto_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_concepto_academico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.concepto_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadConceptoAcademico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_concepto_academico === undefined) {
        this.createConceptoAcademico(event.data.ConceptoAcademico);
      } else {
        this.updateConceptoAcademico(event.data.ConceptoAcademico);
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
