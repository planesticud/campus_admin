import { TipoPublico } from './../../../@core/data/models/tipo_publico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../../../@core/data/evento.service';
import { FORM_TIPO_PUBLICO } from './form-tipo_publico';
import { CalendarioEvento } from '../../../@core/data/models/calendario_evento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-publico',
  templateUrl: './crud-tipo_publico.component.html',
  styleUrls: ['./crud-tipo_publico.component.scss'],
})
export class CrudTipoPublicoComponent implements OnInit {
  config: ToasterConfig;
  tipo_publico_id: number;

  @Input('tipo_publico_id')
  set name(tipo_publico_id: number) {
    this.tipo_publico_id = tipo_publico_id;
    this.loadTipoPublico();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_publico: TipoPublico;
  formTipoPublico: any;
  regTipoPublico: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private eventoService: EventoService,
    private toasterService: ToasterService) {
    this.formTipoPublico = FORM_TIPO_PUBLICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsCalendarioEventoId();
  }

  construirForm() {
    this.formTipoPublico.titulo = this.translate.instant('GLOBAL.tipo_publico');
    this.formTipoPublico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoPublico.campos.length; i++) {
      this.formTipoPublico.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoPublico.campos[i].label_i18n);
      this.formTipoPublico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoPublico.campos[i].label_i18n);
    }
  }

  loadOptionsCalendarioEventoId(): void {
    let calendario: Array<any> = [];
    this.eventoService.get('calendario_evento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          calendario = <Array<CalendarioEvento>>res;
        }
        this.formTipoPublico.campos[ this.getIndexForm('CalendarioEventoId') ].opciones = calendario;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_publico') + '|' +
              this.translate.instant('GLOBAL.calendario_evento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoPublico.campos.length; index++) {
      const element = this.formTipoPublico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoPublico(): void {
    if (this.tipo_publico_id !== undefined && this.tipo_publico_id !== 0) {
      this.eventoService.get('tipo_publico/?query=Id:' + this.tipo_publico_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_publico = <TipoPublico>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_publico'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_publico = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoPublico(tipoPublico: any): void {
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
        this.info_tipo_publico = <TipoPublico>tipoPublico;
        this.eventoService.put('tipo_publico', this.info_tipo_publico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_publico') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_publico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_publico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoPublico(tipoPublico: any): void {
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
        this.info_tipo_publico = <TipoPublico>tipoPublico;
        this.eventoService.post('tipo_publico', this.info_tipo_publico)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_publico') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_publico = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_publico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoPublico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_publico === undefined) {
        this.createTipoPublico(event.data.TipoPublico);
      } else {
        this.updateTipoPublico(event.data.TipoPublico);
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
