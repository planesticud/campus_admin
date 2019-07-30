import { Idioma } from './../../../@core/data/models/idioma';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { FORM_IDIOMA } from './form-idioma';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-idioma',
  templateUrl: './crud-idioma.component.html',
  styleUrls: ['./crud-idioma.component.scss'],
})
export class CrudIdiomaComponent implements OnInit {
  config: ToasterConfig;
  idioma_id: number;

  @Input('idioma_id')
  set name(idioma_id: number) {
    this.idioma_id = idioma_id;
    this.loadIdioma();
  }

  @Output() eventChange = new EventEmitter();

  info_idioma: Idioma;
  formIdioma: any;
  regIdioma: any;
  clean: boolean;

  constructor(private translate: TranslateService, private idiomaService: IdiomaService, private toasterService: ToasterService) {
    this.formIdioma = FORM_IDIOMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formIdioma.titulo = this.translate.instant('GLOBAL.idioma');
    this.formIdioma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formIdioma.campos.length; i++) {
      this.formIdioma.campos[i].label = this.translate.instant('GLOBAL.' + this.formIdioma.campos[i].label_i18n);
      this.formIdioma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formIdioma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formIdioma.campos.length; index++) {
      const element = this.formIdioma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadIdioma(): void {
    if (this.idioma_id !== undefined && this.idioma_id !== 0) {
      this.idiomaService.get('idioma/?query=id:' + this.idioma_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_idioma = <Idioma>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.idioma'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_idioma = undefined;
      this.clean = !this.clean;
    }
  }

  updateIdioma(idioma: any): void {
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
        this.info_idioma = <Idioma>idioma;
        this.idiomaService.put('idioma', this.info_idioma)
          .subscribe(res => {
            this.loadIdioma();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.idioma') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_idioma = undefined;
            this.clean = !this.clean;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                this.translate.instant('GLOBAL.idioma'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  createIdioma(idioma: any): void {
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
        this.info_idioma = <Idioma>idioma;
        this.idiomaService.post('idioma', this.info_idioma)
          .subscribe(res => {
            this.info_idioma = <Idioma>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.idioma') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_idioma = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.idioma'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadIdioma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_idioma === undefined) {
        this.createIdioma(event.data.Idioma);
      } else {
        this.updateIdioma(event.data.Idioma);
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
