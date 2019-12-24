import { AtributoUbicacion } from './../../../@core/data/models/atributo_ubicacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnteService } from '../../../@core/data/ente.service';
import { FORM_ATRIBUTO_UBICACION } from './form-atributo_ubicacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-atributo-ubicacion',
  templateUrl: './crud-atributo_ubicacion.component.html',
  styleUrls: ['./crud-atributo_ubicacion.component.scss'],
})
export class CrudAtributoUbicacionComponent implements OnInit {
  config: ToasterConfig;
  atributo_ubicacion_id: number;

  @Input('atributo_ubicacion_id')
  set name(atributo_ubicacion_id: number) {
    this.atributo_ubicacion_id = atributo_ubicacion_id;
    this.loadAtributoUbicacion();
  }

  @Output() eventChange = new EventEmitter();

  info_atributo_ubicacion: AtributoUbicacion;
  formAtributoUbicacion: any;
  regAtributoUbicacion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private enteService: EnteService, private toasterService: ToasterService) {
    this.formAtributoUbicacion = FORM_ATRIBUTO_UBICACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formAtributoUbicacion.titulo = this.translate.instant('GLOBAL.atributo_ubicacion');
    this.formAtributoUbicacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formAtributoUbicacion.campos.length; i++) {
      this.formAtributoUbicacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formAtributoUbicacion.campos[i].label_i18n);
      this.formAtributoUbicacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formAtributoUbicacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formAtributoUbicacion.campos.length; index++) {
      const element = this.formAtributoUbicacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadAtributoUbicacion(): void {
    if (this.atributo_ubicacion_id !== undefined && this.atributo_ubicacion_id !== 0) {
      this.enteService.get('atributo_ubicacion/?query=Id:' + this.atributo_ubicacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_atributo_ubicacion = <AtributoUbicacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.atributo_ubicacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_atributo_ubicacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateAtributoUbicacion(atributoUbicacion: any): void {
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
        this.info_atributo_ubicacion = <AtributoUbicacion>atributoUbicacion;
        this.enteService.put('atributo_ubicacion', this.info_atributo_ubicacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.atributo_ubicacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_atributo_ubicacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.atributo_ubicacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createAtributoUbicacion(atributoUbicacion: any): void {
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
        this.info_atributo_ubicacion = <AtributoUbicacion>atributoUbicacion;
        this.enteService.post('atributo_ubicacion', this.info_atributo_ubicacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.atributo_ubicacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_atributo_ubicacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.atributo_ubicacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadAtributoUbicacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_atributo_ubicacion === undefined) {
        this.createAtributoUbicacion(event.data.AtributoUbicacion);
      } else {
        this.updateAtributoUbicacion(event.data.AtributoUbicacion);
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
