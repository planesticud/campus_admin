import { EstadoInscripcion } from './../../../@core/data/models/estado_inscripcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { FORM_ESTADO_INSCRIPCION } from './form-estado_inscripcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-estado-inscripcion',
  templateUrl: './crud-estado_inscripcion.component.html',
  styleUrls: ['./crud-estado_inscripcion.component.scss'],
})
export class CrudEstadoInscripcionComponent implements OnInit {
  config: ToasterConfig;
  estado_inscripcion_id: number;

  @Input('estado_inscripcion_id')
  set name(estado_inscripcion_id: number) {
    this.estado_inscripcion_id = estado_inscripcion_id;
    this.loadEstadoInscripcion();
  }

  @Output() eventChange = new EventEmitter();

  info_estado_inscripcion: EstadoInscripcion;
  formEstadoInscripcion: any;
  regEstadoInscripcion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private admisionesService: InscripcionService, private toasterService: ToasterService) {
    this.formEstadoInscripcion = FORM_ESTADO_INSCRIPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formEstadoInscripcion.titulo = this.translate.instant('GLOBAL.estado_inscripcion');
    this.formEstadoInscripcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEstadoInscripcion.campos.length; i++) {
      this.formEstadoInscripcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formEstadoInscripcion.campos[i].label_i18n);
      this.formEstadoInscripcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEstadoInscripcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEstadoInscripcion.campos.length; index++) {
      const element = this.formEstadoInscripcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadEstadoInscripcion(): void {
    if (this.estado_inscripcion_id !== undefined && this.estado_inscripcion_id !== 0) {
      this.admisionesService.get('estado_inscripcion/?query=Id:' + this.estado_inscripcion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_estado_inscripcion = <EstadoInscripcion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.estado_inscripcion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_estado_inscripcion = undefined;
      this.clean = !this.clean;
    }
  }

  updateEstadoInscripcion(estadoInscripcion: any): void {
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
        this.info_estado_inscripcion = <EstadoInscripcion>estadoInscripcion;
        this.admisionesService.put('estado_inscripcion', this.info_estado_inscripcion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.estado_inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_estado_inscripcion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.estado_inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createEstadoInscripcion(estadoInscripcion: any): void {
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
        this.info_estado_inscripcion = <EstadoInscripcion>estadoInscripcion;
        this.admisionesService.post('estado_inscripcion', this.info_estado_inscripcion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.estado_inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_estado_inscripcion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.estado_inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadEstadoInscripcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_estado_inscripcion === undefined) {
        this.createEstadoInscripcion(event.data.EstadoInscripcion);
      } else {
        this.updateEstadoInscripcion(event.data.EstadoInscripcion);
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
