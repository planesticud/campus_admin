import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { EventoService } from '../../../@core/data/evento.service';
import { FORM_ENCARGADO_EVENTO } from './form-encargado_evento';
import { CalendarioEvento } from '../../../@core/data/models/calendario_evento';
import { RolEncargadoEvento } from '../../../@core/data/models/rol_encargado_evento';
import { EncargadoEvento } from '../../../@core/data/models/encargado_evento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-encargado-evento',
  templateUrl: './crud-encargado_evento.component.html',
  styleUrls: ['./crud-encargado_evento.component.scss'],
})
export class CrudEncargadoEventoComponent implements OnInit {
  config: ToasterConfig;
  encargado_evento_id: number;
  info_encargado_evento: EncargadoEvento;
  formEncargadoEvento: any;
  regEncargadoEvento: any;
  clean: boolean;

  @Input('encargado_evento_id')
  set name(encargado_evento_id: number) {
    this.encargado_evento_id = encargado_evento_id;
    this.loadEncargadoEvento();
  }

  @Output() eventChange = new EventEmitter();

  constructor(private translate: TranslateService, private eventoService: EventoService,
    private personaService: PersonaService, private toasterService: ToasterService) {
    this.formEncargadoEvento = FORM_ENCARGADO_EVENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEncargadoId();
    this.loadOptionsCalendarioEventoId();
    this.loadOptionsRolEncargadoId();
  }

  construirForm() {
    this.formEncargadoEvento.titulo = this.translate.instant('GLOBAL.encargado_evento');
    this.formEncargadoEvento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEncargadoEvento.campos.length; i++) {
      this.formEncargadoEvento.campos[i].label = this.translate.instant('GLOBAL.' + this.formEncargadoEvento.campos[i].label_i18n);
      this.formEncargadoEvento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEncargadoEvento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEncargadoEvento.campos.length; index++) {
      const element = this.formEncargadoEvento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsCalendarioEventoId(): void {
    let calendario: Array<any> = [];
    this.eventoService.get('calendario_evento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          calendario = <Array<CalendarioEvento>>res;
        }
        this.formEncargadoEvento.campos[ this.getIndexForm('CalendarioEventoId') ].opciones = calendario;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.encargado_evento') + '|' +
              this.translate.instant('GLOBAL.calendario_evento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsRolEncargadoId(): void {
    let rol: Array<any> = [];
    this.eventoService.get('rol_encargado_evento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          rol = <Array<RolEncargadoEvento>>res;
        }
        this.formEncargadoEvento.campos[ this.getIndexForm('RolEncargadoId') ].opciones = rol;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.encargado_evento') + '|' +
              this.translate.instant('GLOBAL.rol_encargado_evento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsEncargadoId(): void {
    let encargado: Array<any> = [];
    this.personaService.get('persona/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          encargado = <Array<any>>res;
          encargado.forEach(element => {
            element.Nombre = element.PrimerNombre + ' ' + element.SegundoNombre + ' ' +
              element.PrimerApellido + ' ' + element.SegundoApellido;
            this.formEncargadoEvento.campos[ this.getIndexForm('EncargadoId') ].opciones = encargado;
          });
        }
        this.formEncargadoEvento.campos[ this.getIndexForm('EncargadoId') ].opciones = encargado;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.encargado_evento') + '|' +
              this.translate.instant('GLOBAL.encargado_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadEncargadoEvento(): void {
    if (this.encargado_evento_id !== undefined && this.encargado_evento_id !== 0) {
      this.eventoService.get('encargado_evento/?query=Id:' + this.encargado_evento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const encargado_evento = <EncargadoEvento>res[0];
            this.eventoService.get('calendario_evento/' +  encargado_evento.CalendarioEventoId.Id)
              .subscribe(calendario => {
                if (calendario !== null && JSON.stringify(calendario).toString() !== '[{}]') {
                  encargado_evento.CalendarioEventoId = <CalendarioEvento>calendario;
                  this.eventoService.get('rol_encargado_evento/' +  encargado_evento.RolEncargadoId.Id)
                    .subscribe(rol => {
                      if (rol !== null && JSON.stringify(rol).toString() !== '[{}]') {
                        encargado_evento.RolEncargadoId = <RolEncargadoEvento>rol;
                        this.personaService.get('persona/' + encargado_evento.EncargadoId)
                          .subscribe(persona => {
                            if (persona !== null && JSON.stringify(persona).toString() !== '[{}]') {
                              const persona_encargado = <any>persona;
                              persona_encargado.Nombre = persona_encargado.PrimerNombre + ' ' + persona_encargado.SegundoNombre + ' ' +
                                persona_encargado.PrimerApellido + ' ' + persona_encargado.SegundoApellido;
                              encargado_evento.EncargadoId = <any>persona_encargado;
                              this.info_encargado_evento = encargado_evento;
                            }
                          },
                            (error: HttpErrorResponse) => {
                              Swal({
                                type: 'error',
                                title: error.status + '',
                                text: this.translate.instant('ERROR.' + error.status),
                                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                  this.translate.instant('GLOBAL.encargado_evento') + '|' +
                                  this.translate.instant('GLOBAL.encargado_id'),
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
                          this.translate.instant('GLOBAL.encargado_evento') + '|' +
                          this.translate.instant('GLOBAL.rol_encargado_evento'),
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
                    this.translate.instant('GLOBAL.encargado_evento') + '|' +
                    this.translate.instant('GLOBAL.calendario_evento'),
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
                this.translate.instant('GLOBAL.encargado_evento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_encargado_evento = undefined;
      this.clean = !this.clean;
    }
  }

  createEncargadoEvento(encargadoEvento: any): void {
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
        this.info_encargado_evento = <EncargadoEvento>encargadoEvento;
        this.info_encargado_evento.EncargadoId = this.info_encargado_evento.EncargadoId.Id;
        this.eventoService.post('encargado_evento', this.info_encargado_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.encargado_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_encargado_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.encargado_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  updateEncargadoEvento(encargadoEvento: any): void {
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
        this.info_encargado_evento = <EncargadoEvento>encargadoEvento;
        this.info_encargado_evento.EncargadoId = this.info_encargado_evento.EncargadoId.Id;
        this.eventoService.put('encargado_evento', this.info_encargado_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.encargado_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_encargado_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.encargado_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadEncargadoEvento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_encargado_evento === undefined) {
        this.createEncargadoEvento(event.data.EncargadoEvento);
      } else {
        this.updateEncargadoEvento(event.data.EncargadoEvento);
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
