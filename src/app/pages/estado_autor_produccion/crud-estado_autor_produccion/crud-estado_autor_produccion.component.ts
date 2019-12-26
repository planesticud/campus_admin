import { EstadoAutorProduccion } from './../../../@core/data/models/estado_autor_produccion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_ESTADO_AUTOR_PRODUCCION } from './form-estado_autor_produccion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-estado-autor-produccion',
  templateUrl: './crud-estado_autor_produccion.component.html',
  styleUrls: ['./crud-estado_autor_produccion.component.scss'],
})
export class CrudEstadoAutorProduccionComponent implements OnInit {
  config: ToasterConfig;
  estado_autor_produccion_id: number;

  @Input('estado_autor_produccion_id')
  set name(estado_autor_produccion_id: number) {
    this.estado_autor_produccion_id = estado_autor_produccion_id;
    this.loadEstadoAutorProduccion();
  }

  @Output() eventChange = new EventEmitter();

  info_estado_autor_produccion: EstadoAutorProduccion;
  formEstadoAutorProduccion: any;
  regEstadoAutorProduccion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private produccionService: ProduccionAcademicaService, private toasterService: ToasterService) {
    this.formEstadoAutorProduccion = FORM_ESTADO_AUTOR_PRODUCCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formEstadoAutorProduccion.titulo = this.translate.instant('GLOBAL.estado_autor_produccion');
    this.formEstadoAutorProduccion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEstadoAutorProduccion.campos.length; i++) {
      this.formEstadoAutorProduccion.campos[i].label = this.translate.instant('GLOBAL.' + this.formEstadoAutorProduccion.campos[i].label_i18n);
      this.formEstadoAutorProduccion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formEstadoAutorProduccion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEstadoAutorProduccion.campos.length; index++) {
      const element = this.formEstadoAutorProduccion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadEstadoAutorProduccion(): void {
    if (this.estado_autor_produccion_id !== undefined && this.estado_autor_produccion_id !== 0) {
      this.produccionService.get('estado_autor_produccion/?query=Id:' + this.estado_autor_produccion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_estado_autor_produccion = <EstadoAutorProduccion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.estado_autor_produccion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_estado_autor_produccion = undefined;
      this.clean = !this.clean;
    }
  }

  updateEstadoAutorProduccion(estadoAutorProduccion: any): void {
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
        this.info_estado_autor_produccion = <EstadoAutorProduccion>estadoAutorProduccion;
        this.produccionService.put('estado_autor_produccion', this.info_estado_autor_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.estado_autor_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_estado_autor_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.estado_autor_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createEstadoAutorProduccion(estadoAutorProduccion: any): void {
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
        this.info_estado_autor_produccion = <EstadoAutorProduccion>estadoAutorProduccion;
        this.produccionService.post('estado_autor_produccion', this.info_estado_autor_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.estado_autor_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_estado_autor_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.estado_autor_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadEstadoAutorProduccion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_estado_autor_produccion === undefined) {
        this.createEstadoAutorProduccion(event.data.EstadoAutorProduccion);
      } else {
        this.updateEstadoAutorProduccion(event.data.EstadoAutorProduccion);
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
