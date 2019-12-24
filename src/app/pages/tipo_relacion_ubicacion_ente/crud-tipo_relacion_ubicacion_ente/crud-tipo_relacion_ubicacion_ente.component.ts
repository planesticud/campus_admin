import { TipoRelacionUbicacionEnte } from './../../../@core/data/models/tipo_relacion_ubicacion_ente';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnteService } from '../../../@core/data/ente.service';
import { FORM_TIPO_RELACION_UBICACION_ENTE } from './form-tipo_relacion_ubicacion_ente';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-relacion-ubicacion-ente',
  templateUrl: './crud-tipo_relacion_ubicacion_ente.component.html',
  styleUrls: ['./crud-tipo_relacion_ubicacion_ente.component.scss'],
})
export class CrudTipoRelacionUbicacionEnteComponent implements OnInit {
  config: ToasterConfig;
  tipo_relacion_ubicacion_ente_id: number;

  @Input('tipo_relacion_ubicacion_ente_id')
  set name(tipo_relacion_ubicacion_ente_id: number) {
    this.tipo_relacion_ubicacion_ente_id = tipo_relacion_ubicacion_ente_id;
    this.loadTipoRelacionUbicacionEnte();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_relacion_ubicacion_ente: TipoRelacionUbicacionEnte;
  formTipoRelacionUbicacionEnte: any;
  regTipoRelacionUbicacionEnte: any;
  clean: boolean;

  constructor(private translate: TranslateService, private enteService: EnteService, private toasterService: ToasterService) {
    this.formTipoRelacionUbicacionEnte = FORM_TIPO_RELACION_UBICACION_ENTE;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRelacionUbicacionEnte.titulo = this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente');
    this.formTipoRelacionUbicacionEnte.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRelacionUbicacionEnte.campos.length; i++) {
      this.formTipoRelacionUbicacionEnte.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRelacionUbicacionEnte.campos[i].label_i18n);
      this.formTipoRelacionUbicacionEnte.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoRelacionUbicacionEnte.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRelacionUbicacionEnte.campos.length; index++) {
      const element = this.formTipoRelacionUbicacionEnte.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRelacionUbicacionEnte(): void {
    if (this.tipo_relacion_ubicacion_ente_id !== undefined && this.tipo_relacion_ubicacion_ente_id !== 0) {
      this.enteService.get('tipo_relacion_ubicacion_ente/?query=Id:' + this.tipo_relacion_ubicacion_ente_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_relacion_ubicacion_ente = <TipoRelacionUbicacionEnte>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_relacion_ubicacion_ente = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRelacionUbicacionEnte(tipoRelacionUbicacionEnte: any): void {
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
        this.info_tipo_relacion_ubicacion_ente = <TipoRelacionUbicacionEnte>tipoRelacionUbicacionEnte;
        this.enteService.put('tipo_relacion_ubicacion_ente', this.info_tipo_relacion_ubicacion_ente)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_relacion_ubicacion_ente = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRelacionUbicacionEnte(tipoRelacionUbicacionEnte: any): void {
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
        this.info_tipo_relacion_ubicacion_ente = <TipoRelacionUbicacionEnte>tipoRelacionUbicacionEnte;
        this.enteService.post('tipo_relacion_ubicacion_ente', this.info_tipo_relacion_ubicacion_ente)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_relacion_ubicacion_ente = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_ubicacion_ente'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRelacionUbicacionEnte();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_relacion_ubicacion_ente === undefined) {
        this.createTipoRelacionUbicacionEnte(event.data.TipoRelacionUbicacionEnte);
      } else {
        this.updateTipoRelacionUbicacionEnte(event.data.TipoRelacionUbicacionEnte);
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
