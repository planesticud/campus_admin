import { AtributoLugar } from './../../../@core/data/models/atributo_lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { FORM_ATRIBUTO_LUGAR } from './form-atributo_lugar';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-atributo-lugar',
  templateUrl: './crud-atributo_lugar.component.html',
  styleUrls: ['./crud-atributo_lugar.component.scss'],
})
export class CrudAtributoLugarComponent implements OnInit {
  config: ToasterConfig;
  atributo_lugar_id: number;

  @Input('atributo_lugar_id')
  set name(atributo_lugar_id: number) {
    this.atributo_lugar_id = atributo_lugar_id;
    this.loadAtributoLugar();
  }

  @Output() eventChange = new EventEmitter();

  info_atributo_lugar: AtributoLugar;
  formAtributoLugar: any;
  regAtributoLugar: any;
  clean: boolean;

  constructor(private translate: TranslateService, private ubicacionService: UbicacionService, private toasterService: ToasterService) {
    this.formAtributoLugar = FORM_ATRIBUTO_LUGAR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formAtributoLugar.titulo = this.translate.instant('GLOBAL.atributo_lugar');
    this.formAtributoLugar.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formAtributoLugar.campos.length; i++) {
      this.formAtributoLugar.campos[i].label = this.translate.instant('GLOBAL.' + this.formAtributoLugar.campos[i].label_i18n);
      this.formAtributoLugar.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formAtributoLugar.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formAtributoLugar.campos.length; index++) {
      const element = this.formAtributoLugar.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadAtributoLugar(): void {
    if (this.atributo_lugar_id !== undefined && this.atributo_lugar_id !== 0) {
      this.ubicacionService.get('atributo_lugar/?query=Id:' + this.atributo_lugar_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_atributo_lugar = <AtributoLugar>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.atributo_lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_atributo_lugar = undefined;
      this.clean = !this.clean;
    }
  }

  updateAtributoLugar(atributoLugar: any): void {
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
        this.info_atributo_lugar = <AtributoLugar>atributoLugar;
        this.ubicacionService.put('atributo_lugar', this.info_atributo_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.atributo_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_atributo_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.atributo_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createAtributoLugar(atributoLugar: any): void {
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
        this.info_atributo_lugar = <AtributoLugar>atributoLugar;
        this.ubicacionService.post('atributo_lugar', this.info_atributo_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.atributo_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_atributo_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.atributo_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadAtributoLugar();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_atributo_lugar === undefined) {
        this.createAtributoLugar(event.data.AtributoLugar);
      } else {
        this.updateAtributoLugar(event.data.AtributoLugar);
      }
    }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-cubicacionr'
      positionClass: 'toast-top-cubicacionr',
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
