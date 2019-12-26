import { TipoRelacionLugar } from './../../../@core/data/models/tipo_relacion_lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { FORM_TIPO_RELACION_LUGAR } from './form-tipo_relacion_lugar';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-relacion-lugar',
  templateUrl: './crud-tipo_relacion_lugar.component.html',
  styleUrls: ['./crud-tipo_relacion_lugar.component.scss'],
})
export class CrudTipoRelacionLugarComponent implements OnInit {
  config: ToasterConfig;
  tipo_relacion_lugar_id: number;

  @Input('tipo_relacion_lugar_id')
  set name(tipo_relacion_lugar_id: number) {
    this.tipo_relacion_lugar_id = tipo_relacion_lugar_id;
    this.loadTipoRelacionLugar();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_relacion_lugar: TipoRelacionLugar;
  formTipoRelacionLugar: any;
  regTipoRelacionLugar: any;
  clean: boolean;

  constructor(private translate: TranslateService, private lugarService: UbicacionService, private toasterService: ToasterService) {
    this.formTipoRelacionLugar = FORM_TIPO_RELACION_LUGAR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRelacionLugar.titulo = this.translate.instant('GLOBAL.tipo_relacion_lugar');
    this.formTipoRelacionLugar.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRelacionLugar.campos.length; i++) {
      this.formTipoRelacionLugar.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRelacionLugar.campos[i].label_i18n);
      this.formTipoRelacionLugar.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoRelacionLugar.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRelacionLugar.campos.length; index++) {
      const element = this.formTipoRelacionLugar.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRelacionLugar(): void {
    if (this.tipo_relacion_lugar_id !== undefined && this.tipo_relacion_lugar_id !== 0) {
      this.lugarService.get('tipo_relacion_lugar/?query=Id:' + this.tipo_relacion_lugar_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_relacion_lugar = <TipoRelacionLugar>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_relacion_lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_relacion_lugar = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRelacionLugar(tipoRelacionLugar: any): void {
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
        this.info_tipo_relacion_lugar = <TipoRelacionLugar>tipoRelacionLugar;
        this.lugarService.put('tipo_relacion_lugar', this.info_tipo_relacion_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_relacion_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_relacion_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRelacionLugar(tipoRelacionLugar: any): void {
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
        this.info_tipo_relacion_lugar = <TipoRelacionLugar>tipoRelacionLugar;
        this.lugarService.post('tipo_relacion_lugar', this.info_tipo_relacion_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_relacion_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_relacion_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRelacionLugar();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_relacion_lugar === undefined) {
        this.createTipoRelacionLugar(event.data.TipoRelacionLugar);
      } else {
        this.updateTipoRelacionLugar(event.data.TipoRelacionLugar);
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
