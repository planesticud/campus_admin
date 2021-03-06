import { TipoEvento } from './../../../@core/data/models/tipo_evento';
import { TipoRecurrencia } from './../../../@core/data/models/tipo_recurrencia';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../../../@core/data/evento.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_TIPO_EVENTO } from './form-tipo_evento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-evento',
  templateUrl: './crud-tipo_evento.component.html',
  styleUrls: ['./crud-tipo_evento.component.scss'],
})
export class CrudTipoEventoComponent implements OnInit {
  config: ToasterConfig;
  tipo_evento_id: number;

  @Input('tipo_evento_id')
  set name(tipo_evento_id: number) {
    this.tipo_evento_id = tipo_evento_id;
    this.loadTipoEvento();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_evento: TipoEvento;
  formTipoEvento: any;
  regTipoEvento: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private eventoService: EventoService,
    private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formTipoEvento = FORM_TIPO_EVENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoRecurrenciaId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formTipoEvento.titulo = this.translate.instant('GLOBAL.tipo_evento');
    this.formTipoEvento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoEvento.campos.length; i++) {
      this.formTipoEvento.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoEvento.campos[i].label_i18n);
      this.formTipoEvento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoEvento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoRecurrenciaId(): void {
    let tipoRecurrenciaId: Array<any> = [];
    this.eventoService.get('tipo_recurrencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoRecurrenciaId = <Array<TipoRecurrencia>>res;
        }
        this.formTipoEvento.campos[ this.getIndexForm('TipoRecurrenciaId') ].opciones = tipoRecurrenciaId;
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
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<ProgramaAcademico>>res;
        }
        this.formTipoEvento.campos[ this.getIndexForm('DependenciaId') ].opciones = dependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.dependencia_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoEvento.campos.length; index++) {
      const element = this.formTipoEvento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoEvento(): void {
    if (this.tipo_evento_id !== undefined && this.tipo_evento_id !== 0) {
      this.eventoService.get('tipo_evento/?query=Id:' + this.tipo_evento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <TipoEvento>res[0];
            this.eventoService.get('tipo_recurrencia/' + this.element.TipoRecurrenciaId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                this.element.TipoRecurrenciaId = <any>res2;
                this.programaAcademico.get('dependencia/' + this.element.DependenciaId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.element.DependenciaId = <any>res3;
                  }
                  this.info_tipo_evento = this.element;
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.dependencia_id'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
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
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_evento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_evento = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoEvento(tipoEvento: any): void {
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
        this.info_tipo_evento = <TipoEvento>tipoEvento;
        this.info_tipo_evento.DependenciaId = this.info_tipo_evento.DependenciaId.Id;
        this.eventoService.put('tipo_evento', this.info_tipo_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoEvento(tipoEvento: any): void {
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
        this.info_tipo_evento = <TipoEvento>tipoEvento;
        this.info_tipo_evento.DependenciaId = this.info_tipo_evento.DependenciaId.Id;
        this.eventoService.post('tipo_evento', this.info_tipo_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoEvento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_evento === undefined) {
        this.createTipoEvento(event.data.TipoEvento);
      } else {
        this.updateTipoEvento(event.data.TipoEvento);
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
