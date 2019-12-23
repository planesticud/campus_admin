import { TipoDatoAdicional } from './../../../@core/data/models/tipo_dato_adicional';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_TIPO_DATO_ADICIONAL } from './form-tipo_dato_adicional';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-dato-adicional',
  templateUrl: './crud-tipo_dato_adicional.component.html',
  styleUrls: ['./crud-tipo_dato_adicional.component.scss'],
})
export class CrudTipoDatoAdicionalComponent implements OnInit {
  config: ToasterConfig;
  tipo_dato_adicional_id: number;

  @Input('tipo_dato_adicional_id')
  set name(tipo_dato_adicional_id: number) {
    this.tipo_dato_adicional_id = tipo_dato_adicional_id;
    this.loadTipoDatoAdicional();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_dato_adicional: TipoDatoAdicional;
  formTipoDatoAdicional: any;
  regTipoDatoAdicional: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formTipoDatoAdicional = FORM_TIPO_DATO_ADICIONAL;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoDatoAdicional.titulo = this.translate.instant('GLOBAL.tipo_dato_adicional');
    this.formTipoDatoAdicional.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDatoAdicional.campos.length; i++) {
      this.formTipoDatoAdicional.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDatoAdicional.campos[i].label_i18n);
      this.formTipoDatoAdicional.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDatoAdicional.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDatoAdicional.campos.length; index++) {
      const element = this.formTipoDatoAdicional.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDatoAdicional(): void {
    if (this.tipo_dato_adicional_id !== undefined && this.tipo_dato_adicional_id !== 0) {
      this.coreService.get('tipo_dato_adicional/?query=Id:' + this.tipo_dato_adicional_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_dato_adicional = <TipoDatoAdicional>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_dato_adicional'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_tipo_dato_adicional = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDatoAdicional(tipoDatoAdicional: any): void {
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
        this.info_tipo_dato_adicional = <TipoDatoAdicional>tipoDatoAdicional;
        this.coreService.put('tipo_dato_adicional', this.info_tipo_dato_adicional)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_dato_adicional') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_dato_adicional = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_dato_adicional'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDatoAdicional(tipoDatoAdicional: any): void {
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
        this.info_tipo_dato_adicional = <TipoDatoAdicional>tipoDatoAdicional;
        this.coreService.post('tipo_dato_adicional', this.info_tipo_dato_adicional)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_dato_adicional') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_dato_adicional = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_dato_adicional'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDatoAdicional();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_dato_adicional === undefined) {
        this.createTipoDatoAdicional(event.data.TipoDatoAdicional);
      } else {
        this.updateTipoDatoAdicional(event.data.TipoDatoAdicional);
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
