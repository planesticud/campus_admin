import { UnidadTiempo } from './../../../@core/data/models/unidad_tiempo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_UNIDAD_TIEMPO } from './form-unidad_tiempo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-unidad-tiempo',
  templateUrl: './crud-unidad_tiempo.component.html',
  styleUrls: ['./crud-unidad_tiempo.component.scss'],
})
export class CrudUnidadTiempoComponent implements OnInit {
  config: ToasterConfig;
  unidad_tiempo_id: number;

  @Input('unidad_tiempo_id')
  set name(unidad_tiempo_id: number) {
    this.unidad_tiempo_id = unidad_tiempo_id;
    this.loadUnidadTiempo();
  }

  @Output() eventChange = new EventEmitter();

  info_unidad_tiempo: UnidadTiempo;
  formUnidadTiempo: any;
  regUnidadTiempo: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formUnidadTiempo = FORM_UNIDAD_TIEMPO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formUnidadTiempo.titulo = this.translate.instant('GLOBAL.unidad_tiempo');
    this.formUnidadTiempo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formUnidadTiempo.campos.length; i++) {
      this.formUnidadTiempo.campos[i].label = this.translate.instant('GLOBAL.' + this.formUnidadTiempo.campos[i].label_i18n);
      this.formUnidadTiempo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formUnidadTiempo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formUnidadTiempo.campos.length; index++) {
      const element = this.formUnidadTiempo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadUnidadTiempo(): void {
    if (this.unidad_tiempo_id !== undefined && this.unidad_tiempo_id !== 0) {
      this.coreService.get('unidad_tiempo/?query=Id:' + this.unidad_tiempo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_unidad_tiempo = <UnidadTiempo>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.unidad_tiempo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_unidad_tiempo = undefined;
      this.clean = !this.clean;
    }
  }

  updateUnidadTiempo(unidadTiempo: any): void {
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
        this.info_unidad_tiempo = <UnidadTiempo>unidadTiempo;
        this.coreService.put('unidad_tiempo', this.info_unidad_tiempo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.unidad_tiempo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_unidad_tiempo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.unidad_tiempo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createUnidadTiempo(unidadTiempo: any): void {
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
        this.info_unidad_tiempo = <UnidadTiempo>unidadTiempo;
        this.coreService.post('unidad_tiempo', this.info_unidad_tiempo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.unidad_tiempo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_unidad_tiempo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.unidad_tiempo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadUnidadTiempo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_unidad_tiempo === undefined) {
        this.createUnidadTiempo(event.data.UnidadTiempo);
      } else {
        this.updateUnidadTiempo(event.data.UnidadTiempo);
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
