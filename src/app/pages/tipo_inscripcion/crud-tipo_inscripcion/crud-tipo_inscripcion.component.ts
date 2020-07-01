import { TipoInscripcion } from './../../../@core/data/models/tipo_inscripcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { FORM_TIPO_INSCRIPCION } from './form-tipo_inscripcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-inscripcion',
  templateUrl: './crud-tipo_inscripcion.component.html',
  styleUrls: ['./crud-tipo_inscripcion.component.scss'],
})
export class CrudTipoInscripcionComponent implements OnInit {
  config: ToasterConfig;
  tipo_inscripcion_id: number;

  @Input('tipo_inscripcion_id')
  set name(tipo_inscripcion_id: number) {
    this.tipo_inscripcion_id = tipo_inscripcion_id;
    this.loadTipoInscripcion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_inscripcion: TipoInscripcion;
  formTipoInscripcion: any;
  regTipoInscripcion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private admisionesService: InscripcionService, private toasterService: ToasterService) {
    this.formTipoInscripcion = FORM_TIPO_INSCRIPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formTipoInscripcion.titulo = this.translate.instant('GLOBAL.tipo_inscripcion');
    this.formTipoInscripcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoInscripcion.campos.length; i++) {
      this.formTipoInscripcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoInscripcion.campos[i].label_i18n);
      this.formTipoInscripcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoInscripcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoInscripcion.campos.length; index++) {
      const element = this.formTipoInscripcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoInscripcion(): void {
    if (this.tipo_inscripcion_id !== undefined && this.tipo_inscripcion_id !== 0) {
      this.admisionesService.get('tipo_inscripcion/?query=Id:' + this.tipo_inscripcion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_inscripcion = <TipoInscripcion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_inscripcion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_inscripcion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoInscripcion(tipoInscripcion: any): void {
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
        this.info_tipo_inscripcion = <TipoInscripcion>tipoInscripcion;
        this.admisionesService.put('tipo_inscripcion', this.info_tipo_inscripcion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_inscripcion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoInscripcion(tipoInscripcion: any): void {
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
        this.info_tipo_inscripcion = <TipoInscripcion>tipoInscripcion;
        this.admisionesService.post('tipo_inscripcion', this.info_tipo_inscripcion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_inscripcion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoInscripcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_inscripcion === undefined) {
        this.createTipoInscripcion(event.data.TipoInscripcion);
      } else {
        this.updateTipoInscripcion(event.data.TipoInscripcion);
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
