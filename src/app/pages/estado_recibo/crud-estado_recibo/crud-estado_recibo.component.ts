import { EstadoRecibo } from './../../../@core/data/models/estado_recibo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReciboService } from '../../../@core/data/recibo.service';
import { FORM_ESTADO_RECIBO } from './form-estado_recibo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-estado-recibo',
  templateUrl: './crud-estado_recibo.component.html',
  styleUrls: ['./crud-estado_recibo.component.scss'],
})
export class CrudEstadoReciboComponent implements OnInit {
  config: ToasterConfig;
  estado_recibo_id: number;

  @Input('estado_recibo_id')
  set name(estado_recibo_id: number) {
    this.estado_recibo_id = estado_recibo_id;
    this.loadEstadoRecibo();
  }

  @Output() eventChange = new EventEmitter();

  info_estado_recibo: EstadoRecibo;
  formEstadoRecibo: any;
  regEstadoRecibo: any;
  clean: boolean;

  constructor(private translate: TranslateService, private reciboService: ReciboService, private toasterService: ToasterService) {
    this.formEstadoRecibo = FORM_ESTADO_RECIBO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formEstadoRecibo.titulo = this.translate.instant('GLOBAL.estado_recibo');
    this.formEstadoRecibo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEstadoRecibo.campos.length; i++) {
      this.formEstadoRecibo.campos[i].label = this.translate.instant('GLOBAL.' + this.formEstadoRecibo.campos[i].label_i18n);
      this.formEstadoRecibo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formEstadoRecibo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEstadoRecibo.campos.length; index++) {
      const element = this.formEstadoRecibo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadEstadoRecibo(): void {
    if (this.estado_recibo_id !== undefined && this.estado_recibo_id !== 0) {
      this.reciboService.get('estado_recibo/?query=Id:' + this.estado_recibo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_estado_recibo = <EstadoRecibo>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.estado_recibo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_estado_recibo = undefined;
      this.clean = !this.clean;
    }
  }

  updateEstadoRecibo(estadoRecibo: any): void {
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
        this.info_estado_recibo = <EstadoRecibo>estadoRecibo;
        this.reciboService.put('estado_recibo', this.info_estado_recibo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.estado_recibo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_estado_recibo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.estado_recibo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createEstadoRecibo(estadoRecibo: any): void {
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
        this.info_estado_recibo = <EstadoRecibo>estadoRecibo;
        this.reciboService.post('estado_recibo', this.info_estado_recibo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.estado_recibo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_estado_recibo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.estado_recibo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadEstadoRecibo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_estado_recibo === undefined) {
        this.createEstadoRecibo(event.data.EstadoRecibo);
      } else {
        this.updateEstadoRecibo(event.data.EstadoRecibo);
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
