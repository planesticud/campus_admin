import { TipoProduccion } from './../../../@core/data/models/tipo_produccion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_TIPO_PRODUCCION } from './form-tipo_produccion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-produccion',
  templateUrl: './crud-tipo_produccion.component.html',
  styleUrls: ['./crud-tipo_produccion.component.scss'],
})
export class CrudTipoProduccionComponent implements OnInit {
  config: ToasterConfig;
  tipo_produccion_id: number;

  @Input('tipo_produccion_id')
  set name(tipo_produccion_id: number) {
    this.tipo_produccion_id = tipo_produccion_id;
    this.loadTipoProduccion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_produccion: TipoProduccion;
  formTipoProduccion: any;
  regTipoProduccion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private produccionService: ProduccionAcademicaService, private toasterService: ToasterService) {
    this.formTipoProduccion = FORM_TIPO_PRODUCCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoProduccion.titulo = this.translate.instant('GLOBAL.tipo_produccion');
    this.formTipoProduccion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoProduccion.campos.length; i++) {
      this.formTipoProduccion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoProduccion.campos[i].label_i18n);
      this.formTipoProduccion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoProduccion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoProduccion.campos.length; index++) {
      const element = this.formTipoProduccion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoProduccion(): void {
    if (this.tipo_produccion_id !== undefined && this.tipo_produccion_id !== 0) {
      this.produccionService.get('tipo_produccion/?query=Id:' + this.tipo_produccion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_produccion = <TipoProduccion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_produccion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_produccion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoProduccion(tipoProduccion: any): void {
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
        this.info_tipo_produccion = <TipoProduccion>tipoProduccion;
        this.produccionService.put('tipo_produccion', this.info_tipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoProduccion(tipoProduccion: any): void {
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
        this.info_tipo_produccion = <TipoProduccion>tipoProduccion;
        this.produccionService.post('tipo_produccion', this.info_tipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoProduccion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_produccion === undefined) {
        this.createTipoProduccion(event.data.TipoProduccion);
      } else {
        this.updateTipoProduccion(event.data.TipoProduccion);
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
