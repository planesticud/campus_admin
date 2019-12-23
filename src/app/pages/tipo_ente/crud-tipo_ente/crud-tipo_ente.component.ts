import { EnteService } from './../../../@core/data/ente.service';
import { TipoEnte } from './../../../@core/data/models/tipo_ente';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FORM_TIPO_ENTE } from './form-tipo_ente';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-ente',
  templateUrl: './crud-tipo_ente.component.html',
  styleUrls: ['./crud-tipo_ente.component.scss'],
})
export class CrudTipoEnteComponent implements OnInit {
  config: ToasterConfig;
  tipo_ente_id: number;

  @Input('tipo_ente_id')
  set name(tipo_ente_id: number) {
    this.tipo_ente_id = tipo_ente_id;
    this.loadTipoEnte();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_ente: TipoEnte;
  formTipoEnte: any;
  regTipoEnte: any;
  clean: boolean;

  constructor(private translate: TranslateService, private enteService: EnteService, private toasterService: ToasterService) {
    this.formTipoEnte = FORM_TIPO_ENTE;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoEnte.titulo = this.translate.instant('GLOBAL.tipo_ente');
    this.formTipoEnte.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoEnte.campos.length; i++) {
      this.formTipoEnte.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoEnte.campos[i].label_i18n);
      this.formTipoEnte.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoEnte.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoEnte.campos.length; index++) {
      const element = this.formTipoEnte.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoEnte(): void {
    if (this.tipo_ente_id !== undefined && this.tipo_ente_id !== 0) {
      this.enteService.get('tipo_ente/?query=Id:' + this.tipo_ente_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_ente = <TipoEnte>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_ente'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_ente = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoEnte(tipoEnte: any): void {
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
        this.info_tipo_ente = <TipoEnte>tipoEnte;
        this.enteService.put('tipo_ente', this.info_tipo_ente)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_ente') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_ente = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_ente'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoEnte(tipoEnte: any): void {
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
        this.info_tipo_ente = <TipoEnte>tipoEnte;
        this.enteService.post('tipo_ente', this.info_tipo_ente)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_ente') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_ente = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_ente'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoEnte();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_ente === undefined) {
        this.createTipoEnte(event.data.TipoEnte);
      } else {
        this.updateTipoEnte(event.data.TipoEnte);
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
