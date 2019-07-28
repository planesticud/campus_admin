import { TipoDuracion } from './../../../@core/data/models/tipo_duracion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { FORM_TIPO_DURACION } from './form-tipo_duracion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-duracion',
  templateUrl: './crud-tipo_duracion.component.html',
  styleUrls: ['./crud-tipo_duracion.component.scss'],
})
export class CrudTipoDuracionComponent implements OnInit {
  config: ToasterConfig;
  tipo_duracion_id: number;

  @Input('tipo_duracion_id')
  set name(tipo_duracion_id: number) {
    this.tipo_duracion_id = tipo_duracion_id;
    this.loadTipoDuracion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_duracion: TipoDuracion;
  formTipoDuracion: any;
  regTipoDuracion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private descuentosService: DescuentoAcademicoService,
    private toasterService: ToasterService) {
    this.formTipoDuracion = FORM_TIPO_DURACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formTipoDuracion.titulo = this.translate.instant('GLOBAL.tipo_duracion');
    this.formTipoDuracion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDuracion.campos.length; i++) {
      this.formTipoDuracion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDuracion.campos[i].label_i18n);
      this.formTipoDuracion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDuracion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDuracion.campos.length; index++) {
      const element = this.formTipoDuracion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDuracion(): void {
    if (this.tipo_duracion_id !== undefined && this.tipo_duracion_id !== 0) {
      this.descuentosService.get('tipo_duracion/?query=id:' + this.tipo_duracion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_duracion = <TipoDuracion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_duracion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_duracion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDuracion(tipoDuracion: any): void {
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
        this.info_tipo_duracion = <TipoDuracion>tipoDuracion;
        this.descuentosService.put('tipo_duracion', this.info_tipo_duracion)
          .subscribe(res => {
            this.loadTipoDuracion();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_duracion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_duracion = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_duracion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDuracion(tipoDuracion: any): void {
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
        this.info_tipo_duracion = <TipoDuracion>tipoDuracion;
        this.descuentosService.post('tipo_duracion', this.info_tipo_duracion)
          .subscribe(res => {
            this.info_tipo_duracion = <TipoDuracion>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_duracion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_duracion = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_duracion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDuracion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_duracion === undefined) {
        this.createTipoDuracion(event.data.TipoDuracion);
      } else {
        this.updateTipoDuracion(event.data.TipoDuracion);
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
