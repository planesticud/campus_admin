import { TipoRecibo } from './../../../@core/data/models/tipo_recibo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReciboService } from '../../../@core/data/recibo.service';
import { FORM_TIPO_RECIBO } from './form-tipo_recibo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-recibo',
  templateUrl: './crud-tipo_recibo.component.html',
  styleUrls: ['./crud-tipo_recibo.component.scss'],
})
export class CrudTipoReciboComponent implements OnInit {
  config: ToasterConfig;
  tipo_recibo_id: number;

  @Input('tipo_recibo_id')
  set name(tipo_recibo_id: number) {
    this.tipo_recibo_id = tipo_recibo_id;
    this.loadTipoRecibo();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_recibo: TipoRecibo;
  formTipoRecibo: any;
  regTipoRecibo: any;
  clean: boolean;

  constructor(private translate: TranslateService, private reciboService: ReciboService, private toasterService: ToasterService) {
    this.formTipoRecibo = FORM_TIPO_RECIBO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRecibo.titulo = this.translate.instant('GLOBAL.tipo_recibo');
    this.formTipoRecibo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRecibo.campos.length; i++) {
      this.formTipoRecibo.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRecibo.campos[i].label_i18n);
      this.formTipoRecibo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoRecibo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRecibo.campos.length; index++) {
      const element = this.formTipoRecibo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRecibo(): void {
    if (this.tipo_recibo_id !== undefined && this.tipo_recibo_id !== 0) {
      this.reciboService.get('tipo_recibo/?query=Id:' + this.tipo_recibo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_recibo = <TipoRecibo>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_recibo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_recibo = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRecibo(tipoRecibo: any): void {
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
        this.info_tipo_recibo = <TipoRecibo>tipoRecibo;
        this.reciboService.put('tipo_recibo', this.info_tipo_recibo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_recibo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_recibo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_recibo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRecibo(tipoRecibo: any): void {
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
        this.info_tipo_recibo = <TipoRecibo>tipoRecibo;
        this.reciboService.post('tipo_recibo', this.info_tipo_recibo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_recibo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_recibo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_recibo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRecibo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_recibo === undefined) {
        this.createTipoRecibo(event.data.TipoRecibo);
      } else {
        this.updateTipoRecibo(event.data.TipoRecibo);
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
