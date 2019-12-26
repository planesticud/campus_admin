import { TipoDependencia } from './../../../@core/data/models/tipo_dependencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_TIPO_DEPENDENCIA } from './form-tipo_dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-dependencia',
  templateUrl: './crud-tipo_dependencia.component.html',
  styleUrls: ['./crud-tipo_dependencia.component.scss'],
})
export class CrudTipoDependenciaComponent implements OnInit {
  config: ToasterConfig;
  tipo_dependencia_id: number;

  @Input('tipo_dependencia_id')
  set name(tipo_dependencia_id: number) {
    this.tipo_dependencia_id = tipo_dependencia_id;
    this.loadTipoDependencia();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_dependencia: TipoDependencia;
  formTipoDependencia: any;
  regTipoDependencia: any;
  clean: boolean;

  constructor(private translate: TranslateService, private programaOikosService: ProgramaOikosService, private toasterService: ToasterService) {
    this.formTipoDependencia = FORM_TIPO_DEPENDENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoDependencia.titulo = this.translate.instant('GLOBAL.tipo_dependencia');
    this.formTipoDependencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDependencia.campos.length; i++) {
      this.formTipoDependencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDependencia.campos[i].label_i18n);
      this.formTipoDependencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDependencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDependencia.campos.length; index++) {
      const element = this.formTipoDependencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDependencia(): void {
    if (this.tipo_dependencia_id !== undefined && this.tipo_dependencia_id !== 0) {
      this.programaOikosService.get('tipo_dependencia/?query=Id:' + this.tipo_dependencia_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_dependencia = <TipoDependencia>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_dependencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_dependencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDependencia(tipoDependencia: any): void {
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
        this.info_tipo_dependencia = <TipoDependencia>tipoDependencia;
        this.programaOikosService.put('tipo_dependencia', this.info_tipo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDependencia(tipoDependencia: any): void {
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
        this.info_tipo_dependencia = <TipoDependencia>tipoDependencia;
        this.programaOikosService.post('tipo_dependencia', this.info_tipo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDependencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_dependencia === undefined) {
        this.createTipoDependencia(event.data.TipoDependencia);
      } else {
        this.updateTipoDependencia(event.data.TipoDependencia);
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
