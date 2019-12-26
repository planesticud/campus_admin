import { RolEncargadoEvento } from './../../../@core/data/models/rol_encargado_evento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from '../../../@core/data/evento.service';
import { FORM_ROL_ENCARGADO_EVENTO } from './form-rol_encargado_evento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-rol-encargado-evento',
  templateUrl: './crud-rol_encargado_evento.component.html',
  styleUrls: ['./crud-rol_encargado_evento.component.scss'],
})
export class CrudRolEncargadoEventoComponent implements OnInit {
  config: ToasterConfig;
  rol_encargado_evento_id: number;

  @Input('rol_encargado_evento_id')
  set name(rol_encargado_evento_id: number) {
    this.rol_encargado_evento_id = rol_encargado_evento_id;
    this.loadRolEncargadoEvento();
  }

  @Output() eventChange = new EventEmitter();

  info_rol_encargado_evento: RolEncargadoEvento;
  formRolEncargadoEvento: any;
  regRolEncargadoEvento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private eventoService: EventoService,
    private toasterService: ToasterService) {
    this.formRolEncargadoEvento = FORM_ROL_ENCARGADO_EVENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formRolEncargadoEvento.titulo = this.translate.instant('GLOBAL.rol_encargado_evento');
    this.formRolEncargadoEvento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRolEncargadoEvento.campos.length; i++) {
      this.formRolEncargadoEvento.campos[i].label = this.translate.instant('GLOBAL.' + this.formRolEncargadoEvento.campos[i].label_i18n);
      this.formRolEncargadoEvento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formRolEncargadoEvento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRolEncargadoEvento.campos.length; index++) {
      const element = this.formRolEncargadoEvento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRolEncargadoEvento(): void {
    if (this.rol_encargado_evento_id !== undefined && this.rol_encargado_evento_id !== 0) {
      this.eventoService.get('rol_encargado_evento/?query=Id:' + this.rol_encargado_evento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_rol_encargado_evento = <RolEncargadoEvento>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.rol_encargado_evento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_rol_encargado_evento = undefined;
      this.clean = !this.clean;
    }
  }

  updateRolEncargadoEvento(rolEncargadoEvento: any): void {
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
        this.info_rol_encargado_evento = <RolEncargadoEvento>rolEncargadoEvento;
        this.eventoService.put('rol_encargado_evento', this.info_rol_encargado_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.rol_encargado_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_rol_encargado_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.rol_encargado_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRolEncargadoEvento(rolEncargadoEvento: any): void {
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
        this.info_rol_encargado_evento = <RolEncargadoEvento>rolEncargadoEvento;
        this.eventoService.post('rol_encargado_evento', this.info_rol_encargado_evento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.rol_encargado_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_rol_encargado_evento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.rol_encargado_evento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRolEncargadoEvento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_rol_encargado_evento === undefined) {
        this.createRolEncargadoEvento(event.data.RolEncargadoEvento);
      } else {
        this.updateRolEncargadoEvento(event.data.RolEncargadoEvento);
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
