import { TipoRecurrencia } from './../../../@core/data/models/tipo_recurrencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../../../@core/data/evento.service';
import { FORM_TIPO_RECURRENCIA } from './form-tipo_recurrencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-recurrencia',
  templateUrl: './crud-tipo_recurrencia.component.html',
  styleUrls: ['./crud-tipo_recurrencia.component.scss'],
})
export class CrudTipoRecurrenciaComponent implements OnInit {
  config: ToasterConfig;
  tipo_recurrencia_id: number;

  @Input('tipo_recurrencia_id')
  set name(tipo_recurrencia_id: number) {
    this.tipo_recurrencia_id = tipo_recurrencia_id;
    this.loadTipoRecurrencia();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_recurrencia: TipoRecurrencia;
  formTipoRecurrencia: any;
  regTipoRecurrencia: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private eventoService: EventoService,
    private toasterService: ToasterService) {
    this.formTipoRecurrencia = FORM_TIPO_RECURRENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRecurrencia.titulo = this.translate.instant('GLOBAL.tipo_recurrencia');
    this.formTipoRecurrencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRecurrencia.campos.length; i++) {
      this.formTipoRecurrencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRecurrencia.campos[i].label_i18n);
      this.formTipoRecurrencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoRecurrencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRecurrencia.campos.length; index++) {
      const element = this.formTipoRecurrencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRecurrencia(): void {
    if (this.tipo_recurrencia_id !== undefined && this.tipo_recurrencia_id !== 0) {
      this.eventoService.get('tipo_recurrencia/?query=Id:' + this.tipo_recurrencia_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_recurrencia = <TipoRecurrencia>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_recurrencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_recurrencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRecurrencia(tipoRecurrencia: any): void {
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
        this.info_tipo_recurrencia = <TipoRecurrencia>tipoRecurrencia;
        this.eventoService.put('tipo_recurrencia', this.info_tipo_recurrencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_recurrencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_recurrencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_recurrencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRecurrencia(tipoRecurrencia: any): void {
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
        this.info_tipo_recurrencia = <TipoRecurrencia>tipoRecurrencia;
        this.eventoService.post('tipo_recurrencia', this.info_tipo_recurrencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_recurrencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_recurrencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_recurrencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRecurrencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_recurrencia === undefined) {
        this.createTipoRecurrencia(event.data.TipoRecurrencia);
      } else {
        this.updateTipoRecurrencia(event.data.TipoRecurrencia);
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
