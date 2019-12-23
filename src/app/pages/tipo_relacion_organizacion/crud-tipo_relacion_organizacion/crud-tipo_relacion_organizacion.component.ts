import { TipoRelacionOrganizacion } from './../../../@core/data/models/tipo_relacion_organizacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { FORM_TIPO_RELACION_ORGANIZACION } from './form-tipo_relacion_organizacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-relacion-organizacion',
  templateUrl: './crud-tipo_relacion_organizacion.component.html',
  styleUrls: ['./crud-tipo_relacion_organizacion.component.scss'],
})
export class CrudTipoRelacionOrganizacionComponent implements OnInit {
  config: ToasterConfig;
  tipo_relacion_organizacion_id: number;

  @Input('tipo_relacion_organizacion_id')
  set name(tipo_relacion_organizacion_id: number) {
    this.tipo_relacion_organizacion_id = tipo_relacion_organizacion_id;
    this.loadTipoRelacionOrganizacion();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_relacion_organizacion: TipoRelacionOrganizacion;
  formTipoRelacionOrganizacion: any;
  regTipoRelacionOrganizacion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private organizacionService: OrganizacionService, private toasterService: ToasterService) {
    this.formTipoRelacionOrganizacion = FORM_TIPO_RELACION_ORGANIZACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRelacionOrganizacion.titulo = this.translate.instant('GLOBAL.tipo_relacion_organizacion');
    this.formTipoRelacionOrganizacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRelacionOrganizacion.campos.length; i++) {
      this.formTipoRelacionOrganizacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRelacionOrganizacion.campos[i].label_i18n);
      this.formTipoRelacionOrganizacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoRelacionOrganizacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRelacionOrganizacion.campos.length; index++) {
      const element = this.formTipoRelacionOrganizacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRelacionOrganizacion(): void {
    if (this.tipo_relacion_organizacion_id !== undefined && this.tipo_relacion_organizacion_id !== 0) {
      this.organizacionService.get('tipo_relacion_organizacion/?query=Id:' + this.tipo_relacion_organizacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_relacion_organizacion = <TipoRelacionOrganizacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_relacion_organizacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRelacionOrganizacion(tipoRelacionOrganizacion: any): void {
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
        this.info_tipo_relacion_organizacion = <TipoRelacionOrganizacion>tipoRelacionOrganizacion;
        this.organizacionService.put('tipo_relacion_organizacion', this.info_tipo_relacion_organizacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_relacion_organizacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_relacion_organizacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRelacionOrganizacion(tipoRelacionOrganizacion: any): void {
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
        this.info_tipo_relacion_organizacion = <TipoRelacionOrganizacion>tipoRelacionOrganizacion;
        this.organizacionService.post('tipo_relacion_organizacion', this.info_tipo_relacion_organizacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_relacion_organizacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_relacion_organizacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRelacionOrganizacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_relacion_organizacion === undefined) {
        this.createTipoRelacionOrganizacion(event.data.TipoRelacionOrganizacion);
      } else {
        this.updateTipoRelacionOrganizacion(event.data.TipoRelacionOrganizacion);
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
