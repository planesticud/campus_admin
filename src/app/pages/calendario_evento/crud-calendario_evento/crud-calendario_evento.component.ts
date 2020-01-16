import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { EventoService } from '../../../@core/data/evento.service';
import { FORM_CALENDARIO_EVENTO } from './form-calendario_evento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CalendarioEvento } from '../../../@core/data/models/calendario_evento';
import { Periodo } from '../../../@core/data/models/periodo';
import { TipoEvento } from '../../../@core/data/models/tipo_evento';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-calendario-evento',
  templateUrl: './crud-calendario_evento.component.html',
  styleUrls: ['./crud-calendario_evento.component.scss'],
})
export class CrudCalendarioEventoComponent implements OnInit {
  config: ToasterConfig;
  calendario_evento_id: number;
  info_calendario_evento: CalendarioEvento;
  formCalendarioEvento: any;
  regCalendarioEvento: any;
  clean: boolean;

  @Input('calendario_evento_id')
  set name(calendario_evento_id: number) {
    this.calendario_evento_id = calendario_evento_id;
    this.loadCalendarioEvento();
  }

  @Output() eventChange = new EventEmitter();

  constructor(private translate: TranslateService, private eventoService: EventoService,
    private coreService: CoreService, private toasterService: ToasterService) {
    this.formCalendarioEvento = FORM_CALENDARIO_EVENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsPeriodoId();
    this.loadOptionsTipoEventoId();
    this.loadOptionsEventoPadreId();
  }

  construirForm() {
    this.formCalendarioEvento.titulo = this.translate.instant('GLOBAL.calendario_evento');
    this.formCalendarioEvento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formCalendarioEvento.campos.length; i++) {
      this.formCalendarioEvento.campos[i].label = this.translate.instant('GLOBAL.' + this.formCalendarioEvento.campos[i].label_i18n);
      this.formCalendarioEvento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formCalendarioEvento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formCalendarioEvento.campos.length; index++) {
      const element = this.formCalendarioEvento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsEventoPadreId(): void {
    let padre: Array<any> = [];
    this.eventoService.get('calendario_evento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          padre = <Array<CalendarioEvento>>res;
        }
        this.formCalendarioEvento.campos[ this.getIndexForm('EventoPadreId') ].opciones = padre;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.calendario_evento') + '|' +
              this.translate.instant('GLOBAL.evento_padre'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsPeriodoId(): void {
    let periodo: Array<any> = [];
    this.coreService.get('periodo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          periodo = <Array<Periodo>>res;
        }
        this.formCalendarioEvento.campos[ this.getIndexForm('PeriodoId') ].opciones = periodo;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.calendario_evento') + '|' +
              this.translate.instant('GLOBAL.periodo'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoEventoId(): void {
    let tipoEvento: Array<any> = [];
    this.eventoService.get('tipo_evento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoEvento = <Array<TipoEvento>>res;
        }
        this.formCalendarioEvento.campos[ this.getIndexForm('TipoEventoId') ].opciones = tipoEvento;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.calendario_evento') + '|' +
              this.translate.instant('GLOBAL.tipo_evento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadCalendarioEvento(): void {
    if (this.calendario_evento_id !== undefined && this.calendario_evento_id !== 0) {
      this.eventoService.get('calendario_evento/?query=Id:' + this.calendario_evento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const calendario = <CalendarioEvento>res[0];
            this.coreService.get('periodo/' +  calendario.PeriodoId)
              .subscribe(periodo => {
                if (periodo !== null && JSON.stringify(periodo).toString() !== '[{}]') {
                  calendario.PeriodoId = <Periodo>periodo;
                  if (calendario.EventoPadreId !== null) {
                    this.eventoService.get('calendario_evento/' + calendario.EventoPadreId)
                      .subscribe(padre => {
                        if (padre !== null && JSON.stringify(padre).toString() !== '[{}]') {
                          calendario.EventoPadreId = <any>padre;
                          this.info_calendario_evento = calendario;
                        }
                      },
                        (error: HttpErrorResponse) => {
                          Swal({
                            type: 'error',
                            title: error.status + '',
                            text: this.translate.instant('ERROR.' + error.status),
                            footer: this.translate.instant('GLOBAL.cargar') + '-' +
                              this.translate.instant('GLOBAL.calendario_evento') + '|' +
                              this.translate.instant('GLOBAL.evento_padre'),
                            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                          });
                        });
                  } else {
                    this.info_calendario_evento = calendario;
                  }
                }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.calendario_evento') + '|' +
                    this.translate.instant('GLOBAL.periodo'),
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
                this.translate.instant('GLOBAL.calendario_evento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_calendario_evento = undefined;
      this.clean = !this.clean;
    }
  }

  createCalendarioEvento(calendarioEvento: any): void {
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
        this.info_calendario_evento = <CalendarioEvento>calendarioEvento;
        this.info_calendario_evento.PeriodoId = this.info_calendario_evento.PeriodoId.Id;
        this.eventoService.post('calendario_evento', this.info_calendario_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.calendario_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_calendario_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.calendario_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  updateCalendarioEvento(calendarioEvento: any): void {
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
        this.info_calendario_evento = <CalendarioEvento>calendarioEvento;
        this.info_calendario_evento.PeriodoId = this.info_calendario_evento.PeriodoId.Id;
        this.eventoService.put('calendario_evento', this.info_calendario_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.calendario_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_calendario_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.calendario_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadCalendarioEvento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_calendario_evento === undefined) {
        this.createCalendarioEvento(event.data.CalendarioEvento);
      } else {
        this.updateCalendarioEvento(event.data.CalendarioEvento);
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
