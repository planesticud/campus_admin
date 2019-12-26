import { TipoPago } from './../../../@core/data/models/tipo_pago';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReciboService } from '../../../@core/data/recibo.service';
import { FORM_TIPO_PAGO } from './form-tipo_pago';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-pago',
  templateUrl: './crud-tipo_pago.component.html',
  styleUrls: ['./crud-tipo_pago.component.scss'],
})
export class CrudTipoPagoComponent implements OnInit {
  config: ToasterConfig;
  tipo_pago_id: number;

  @Input('tipo_pago_id')
  set name(tipo_pago_id: number) {
    this.tipo_pago_id = tipo_pago_id;
    this.loadTipoPago();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_pago: TipoPago;
  formTipoPago: any;
  regTipoPago: any;
  clean: boolean;

  constructor(private translate: TranslateService, private reciboService: ReciboService, private toasterService: ToasterService) {
    this.formTipoPago = FORM_TIPO_PAGO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoPago.titulo = this.translate.instant('GLOBAL.tipo_pago');
    this.formTipoPago.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoPago.campos.length; i++) {
      this.formTipoPago.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoPago.campos[i].label_i18n);
      this.formTipoPago.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoPago.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoPago.campos.length; index++) {
      const element = this.formTipoPago.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoPago(): void {
    if (this.tipo_pago_id !== undefined && this.tipo_pago_id !== 0) {
      this.reciboService.get('tipo_pago/?query=Id:' + this.tipo_pago_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_pago = <TipoPago>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_pago'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_pago = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoPago(tipoPago: any): void {
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
        this.info_tipo_pago = <TipoPago>tipoPago;
        this.reciboService.put('tipo_pago', this.info_tipo_pago)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_pago') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_pago = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_pago'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoPago(tipoPago: any): void {
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
        this.info_tipo_pago = <TipoPago>tipoPago;
        this.reciboService.post('tipo_pago', this.info_tipo_pago)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_pago') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_pago = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_pago'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoPago();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_pago === undefined) {
        this.createTipoPago(event.data.TipoPago);
      } else {
        this.updateTipoPago(event.data.TipoPago);
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
