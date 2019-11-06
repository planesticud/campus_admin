import { ClasificacionNivelIdioma } from '../../../@core/data/models/clasificacion_idioma';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { FORM_CLASIFICACION_IDIOMA } from './form-clasificacion_idioma';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-clasificacion-idioma',
  templateUrl: './crud-clasificacion_idioma.component.html',
  styleUrls: ['./crud-clasificacion_idioma.component.scss'],
})
export class CrudClasificacionIdiomaComponent implements OnInit {
  config: ToasterConfig;
  clasificacion_idioma_id: number;

  @Input('clasificacion_idioma_id')
  set name(clasificacion_idioma_id: number) {
    this.clasificacion_idioma_id = clasificacion_idioma_id;
    this.loadClasificacionIdioma();
  }

  @Output() eventChange = new EventEmitter();

  info_clasificacion_idioma: ClasificacionNivelIdioma;
  formClasificacionIdioma: any;
  regClasificacionIdioma: any;
  clean: boolean;

  constructor(private translate: TranslateService, private idiomaService: IdiomaService, private toasterService: ToasterService) {
    this.formClasificacionIdioma = FORM_CLASIFICACION_IDIOMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formClasificacionIdioma.titulo = this.translate.instant('GLOBAL.clasificacion_nivel_idioma');
    this.formClasificacionIdioma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formClasificacionIdioma.campos.length; i++) {
      this.formClasificacionIdioma.campos[i].label = this.translate.instant('GLOBAL.' + this.formClasificacionIdioma.campos[i].label_i18n);
      this.formClasificacionIdioma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formClasificacionIdioma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formClasificacionIdioma.campos.length; index++) {
      const element = this.formClasificacionIdioma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadClasificacionIdioma(): void {
    if (this.clasificacion_idioma_id !== undefined && this.clasificacion_idioma_id !== 0) {
      this.idiomaService.get('clasificacion_nivel_idioma/?query=Id:' + this.clasificacion_idioma_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_clasificacion_idioma = <ClasificacionNivelIdioma>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.clasificacion_nivel_idioma'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_clasificacion_idioma = undefined;
      this.clean = !this.clean;
    }
  }

  updateClasificacionIdioma(clasificacion_idioma: any): void {
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
        this.info_clasificacion_idioma = <ClasificacionNivelIdioma>clasificacion_idioma;
        this.idiomaService.put('clasificacion_nivel_idioma', this.info_clasificacion_idioma)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.clasificacion_nivel_idioma') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_clasificacion_idioma = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.clasificacion_nivel_idioma'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createClasificacionIdioma(clasificacion_idioma: any): void {
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
        this.info_clasificacion_idioma = <ClasificacionNivelIdioma>clasificacion_idioma;
        this.idiomaService.post('clasificacion_nivel_idioma', this.info_clasificacion_idioma)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.clasificacion_nivel_idioma') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_clasificacion_idioma = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.clasificacion_nivel_idioma'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadClasificacionIdioma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_clasificacion_idioma === undefined) {
        this.createClasificacionIdioma(event.data.ClasificacionIdioma);
      } else {
        this.updateClasificacionIdioma(event.data.ClasificacionIdioma);
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
