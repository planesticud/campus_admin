import { TipoDedicacion } from './../../../@core/data/models/tipo_dedicacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { FORM_TIPO_DEDICACION } from './form-tipo_dedicacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-dedicacion',
  templateUrl: './crud-tipo_dedicacion.component.html',
  styleUrls: ['./crud-tipo_dedicacion.component.scss'],
})
export class CrudTipoDedicacionComponent implements OnInit {
  config: ToasterConfig;
  tipo_dedicacion_id: number;

  @Input('tipo_dedicacion_id')
  set name(tipo_dedicacion_id: number) {
    this.tipo_dedicacion_id = tipo_dedicacion_id;
    this.loadTipoDedicacion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_dedicacion: TipoDedicacion;
  formTipoDedicacion: any;
  regTipoDedicacion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private experienciaService: ExperienciaService,
    private toasterService: ToasterService) {
    this.formTipoDedicacion = FORM_TIPO_DEDICACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoDedicacion.titulo = this.translate.instant('GLOBAL.tipo_dedicacion');
    this.formTipoDedicacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDedicacion.campos.length; i++) {
      this.formTipoDedicacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDedicacion.campos[i].label_i18n);
      this.formTipoDedicacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDedicacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDedicacion.campos.length; index++) {
      const element = this.formTipoDedicacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDedicacion(): void {
    if (this.tipo_dedicacion_id !== undefined && this.tipo_dedicacion_id !== 0) {
      this.experienciaService.get('tipo_dedicacion/?query=Id:' + this.tipo_dedicacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_dedicacion = <TipoDedicacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_dedicacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_dedicacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDedicacion(tipoDedicacion: any): void {
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
        this.info_tipo_dedicacion = <TipoDedicacion>tipoDedicacion;
        this.experienciaService.put('tipo_dedicacion', this.info_tipo_dedicacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_dedicacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_dedicacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_dedicacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDedicacion(tipoDedicacion: any): void {
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
        this.info_tipo_dedicacion = <TipoDedicacion>tipoDedicacion;
        this.experienciaService.post('tipo_dedicacion', this.info_tipo_dedicacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_dedicacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_dedicacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_dedicacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDedicacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_dedicacion === undefined) {
        this.createTipoDedicacion(event.data.TipoDedicacion);
      } else {
        this.updateTipoDedicacion(event.data.TipoDedicacion);
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
