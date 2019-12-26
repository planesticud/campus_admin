import { TipoMetadato } from './../../../@core/data/models/tipo_metadato';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_TIPO_METADATO } from './form-tipo_metadato';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-metadato',
  templateUrl: './crud-tipo_metadato.component.html',
  styleUrls: ['./crud-tipo_metadato.component.scss'],
})
export class CrudTipoMetadatoComponent implements OnInit {
  config: ToasterConfig;
  tipo_metadato_id: number;

  @Input('tipo_metadato_id')
  set name(tipo_metadato_id: number) {
    this.tipo_metadato_id = tipo_metadato_id;
    this.loadTipoMetadato();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_metadato: TipoMetadato;
  formTipoMetadato: any;
  regTipoMetadato: any;
  clean: boolean;

  constructor(private translate: TranslateService, private produccionService: ProduccionAcademicaService, private toasterService: ToasterService) {
    this.formTipoMetadato = FORM_TIPO_METADATO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoMetadato.titulo = this.translate.instant('GLOBAL.tipo_metadato');
    this.formTipoMetadato.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoMetadato.campos.length; i++) {
      this.formTipoMetadato.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoMetadato.campos[i].label_i18n);
      this.formTipoMetadato.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoMetadato.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoMetadato.campos.length; index++) {
      const element = this.formTipoMetadato.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoMetadato(): void {
    if (this.tipo_metadato_id !== undefined && this.tipo_metadato_id !== 0) {
      this.produccionService.get('tipo_metadato/?query=Id:' + this.tipo_metadato_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_metadato = <TipoMetadato>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_metadato'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_metadato = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoMetadato(tipoMetadato: any): void {
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
        this.info_tipo_metadato = <TipoMetadato>tipoMetadato;
        this.produccionService.put('tipo_metadato', this.info_tipo_metadato)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_metadato') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_metadato = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_metadato'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoMetadato(tipoMetadato: any): void {
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
        this.info_tipo_metadato = <TipoMetadato>tipoMetadato;
        this.produccionService.post('tipo_metadato', this.info_tipo_metadato)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_metadato') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_metadato = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_metadato'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoMetadato();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_metadato === undefined) {
        this.createTipoMetadato(event.data.TipoMetadato);
      } else {
        this.updateTipoMetadato(event.data.TipoMetadato);
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
