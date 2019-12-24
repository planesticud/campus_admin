import { TipoVinculacion } from './../../../@core/data/models/tipo_vinculacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { FORM_TIPO_VINCULACION } from './form-tipo_vinculacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-vinculacion',
  templateUrl: './crud-tipo_vinculacion.component.html',
  styleUrls: ['./crud-tipo_vinculacion.component.scss'],
})
export class CrudTipoVinculacionComponent implements OnInit {
  config: ToasterConfig;
  tipo_vinculacion_id: number;

  @Input('tipo_vinculacion_id')
  set name(tipo_vinculacion_id: number) {
    this.tipo_vinculacion_id = tipo_vinculacion_id;
    this.loadTipoVinculacion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_vinculacion: TipoVinculacion;
  formTipoVinculacion: any;
  regTipoVinculacion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private experienciaService: ExperienciaService,
    private toasterService: ToasterService) {
    this.formTipoVinculacion = FORM_TIPO_VINCULACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoVinculacion.titulo = this.translate.instant('GLOBAL.tipo_vinculacion');
    this.formTipoVinculacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoVinculacion.campos.length; i++) {
      this.formTipoVinculacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoVinculacion.campos[i].label_i18n);
      this.formTipoVinculacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoVinculacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoVinculacion.campos.length; index++) {
      const element = this.formTipoVinculacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoVinculacion(): void {
    if (this.tipo_vinculacion_id !== undefined && this.tipo_vinculacion_id !== 0) {
      this.experienciaService.get('tipo_vinculacion/?query=Id:' + this.tipo_vinculacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_vinculacion = <TipoVinculacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_vinculacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_vinculacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoVinculacion(tipoVinculacion: any): void {
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
        this.info_tipo_vinculacion = <TipoVinculacion>tipoVinculacion;
        this.experienciaService.put('tipo_vinculacion', this.info_tipo_vinculacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_vinculacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_vinculacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_vinculacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoVinculacion(tipoVinculacion: any): void {
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
        this.info_tipo_vinculacion = <TipoVinculacion>tipoVinculacion;
        this.experienciaService.post('tipo_vinculacion', this.info_tipo_vinculacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_vinculacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_vinculacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_vinculacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoVinculacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_vinculacion === undefined) {
        this.createTipoVinculacion(event.data.TipoVinculacion);
      } else {
        this.updateTipoVinculacion(event.data.TipoVinculacion);
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
