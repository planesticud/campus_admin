import { NivelIdioma } from '../../../@core/data/models/nivel_idioma';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { FORM_NIVEL_IDIOMA } from './form-nivel_idioma';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-nivel-idioma',
  templateUrl: './crud-nivel_idioma.component.html',
  styleUrls: ['./crud-nivel_idioma.component.scss'],
})
export class CrudNivelIdiomaComponent implements OnInit {
  config: ToasterConfig;
  nivel_idioma_id: number;

  @Input('nivel_idioma_id')
  set name(nivel_idioma_id: number) {
    this.nivel_idioma_id = nivel_idioma_id;
    this.loadNivelIdioma();
  }

  @Output() eventChange = new EventEmitter();

  info_nivel_idioma: NivelIdioma;
  formNivelIdioma: any;
  regNivelIdioma: any;
  clean: boolean;

  constructor(private translate: TranslateService, private idiomaService: IdiomaService, private toasterService: ToasterService) {
    this.formNivelIdioma = FORM_NIVEL_IDIOMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formNivelIdioma.titulo = this.translate.instant('GLOBAL.nivel_idioma');
    this.formNivelIdioma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formNivelIdioma.campos.length; i++) {
      this.formNivelIdioma.campos[i].label = this.translate.instant('GLOBAL.' + this.formNivelIdioma.campos[i].label_i18n);
      this.formNivelIdioma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formNivelIdioma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formNivelIdioma.campos.length; index++) {
      const element = this.formNivelIdioma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadNivelIdioma(): void {
    if (this.nivel_idioma_id !== undefined && this.nivel_idioma_id !== 0) {
      this.idiomaService.get('valor_nivel_idioma/?query=id:' + this.nivel_idioma_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_nivel_idioma = <NivelIdioma>res[0];
          }
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else  {
      this.info_nivel_idioma = undefined;
      this.clean = !this.clean;
    }
  }

  updateNivelIdioma(nivel_idioma: any): void {
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
        this.info_nivel_idioma = <NivelIdioma>nivel_idioma;
        this.idiomaService.put('valor_nivel_idioma', this.info_nivel_idioma)
          .subscribe(res => {
            this.loadNivelIdioma();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
            this.translate.instant('GLOBAL.nivel_idioma') + ' ' +
            this.translate.instant('GLOBAL.confirmarActualizar'));
          },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  createNivelIdioma(nivel_idioma: any): void {
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
        this.info_nivel_idioma = <NivelIdioma>nivel_idioma;
        this.idiomaService.post('valor_nivel_idioma', this.info_nivel_idioma)
          .subscribe(res => {
            this.info_nivel_idioma = <NivelIdioma>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
            this.translate.instant('GLOBAL.nivel_idioma') + ' ' +
            this.translate.instant('GLOBAL.confirmarCrear'));
          },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  ngOnInit() {
    this.loadNivelIdioma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_nivel_idioma === undefined) {
        this.createNivelIdioma(event.data.NivelIdioma);
      } else {
        this.updateNivelIdioma(event.data.NIvelIdioma);
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
