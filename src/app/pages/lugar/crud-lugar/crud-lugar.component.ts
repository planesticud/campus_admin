import { TipoLugar } from './../../../@core/data/models/tipo_lugar';
import { Lugar } from './../../../@core/data/models/lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { FORM_LUGAR } from './form-lugar';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-lugar',
  templateUrl: './crud-lugar.component.html',
  styleUrls: ['./crud-lugar.component.scss'],
})
export class CrudLugarComponent implements OnInit {
  config: ToasterConfig;
  lugar_id: number;

  @Input('lugar_id')
  set name(lugar_id: number) {
    this.lugar_id = lugar_id;
    this.loadLugar();
  }

  @Output() eventChange = new EventEmitter();

  info_lugar: Lugar;
  formLugar: any;
  regLugar: any;
  clean: boolean;

  constructor(private translate: TranslateService, private ubicacionService: UbicacionService, private toasterService: ToasterService) {
    this.formLugar = FORM_LUGAR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoLugar();
  }

  construirForm() {
    this.formLugar.titulo = this.translate.instant('GLOBAL.lugar');
    this.formLugar.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formLugar.campos.length; i++) {
      this.formLugar.campos[i].label = this.translate.instant('GLOBAL.' + this.formLugar.campos[i].label_i18n);
      this.formLugar.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formLugar.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoLugar(): void {
    let tipoLugar: Array<any> = [];
      this.ubicacionService.get('tipo_lugar/?limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            tipoLugar = <Array<TipoLugar>>res;
          }
          this.formLugar.campos[ this.getIndexForm('TipoLugar') ].opciones = tipoLugar;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.lugar') + '|' +
              this.translate.instant('GLOBAL.tipo_lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formLugar.campos.length; index++) {
      const element = this.formLugar.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadLugar(): void {
    if (this.lugar_id !== undefined && this.lugar_id !== 0) {
      this.ubicacionService.get('lugar/?query=Id:' + this.lugar_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_lugar = <Lugar>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_lugar = undefined;
      this.clean = !this.clean;
    }
  }

  updateLugar(lugar: any): void {
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
        this.info_lugar = <Lugar>lugar;
        this.ubicacionService.put('lugar', this.info_lugar)
          .subscribe(res => {
            this.loadLugar();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_lugar = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createLugar(lugar: any): void {
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
        this.info_lugar = <Lugar>lugar;
        this.ubicacionService.post('lugar', this.info_lugar)
          .subscribe(res => {
            this.info_lugar = <Lugar>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_lugar = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadLugar();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_lugar === undefined) {
        this.createLugar(event.data.Lugar);
      } else {
        this.updateLugar(event.data.Lugar);
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
