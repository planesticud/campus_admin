import { TipoDocumento } from './../../../@core/data/models/tipo_documento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoService } from '../../../@core/data/documento.service';
import { FORM_TIPO_DOCUMENTO } from './form-tipo_documento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-documento',
  templateUrl: './crud-tipo_documento.component.html',
  styleUrls: ['./crud-tipo_documento.component.scss'],
})
export class CrudTipoDocumentoComponent implements OnInit {
  config: ToasterConfig;
  tipo_documento_id: number;

  @Input('tipo_documento_id')
  set name(tipo_documento_id: number) {
    this.tipo_documento_id = tipo_documento_id;
    this.loadTipoDocumento();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_documento: TipoDocumento;
  formTipoDocumento: any;
  regTipoDocumento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private documentoService: DocumentoService,
    private toasterService: ToasterService) {
    this.formTipoDocumento = FORM_TIPO_DOCUMENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoDocumento.titulo = this.translate.instant('GLOBAL.tipo_documento');
    this.formTipoDocumento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDocumento.campos.length; i++) {
      this.formTipoDocumento.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDocumento.campos[i].label_i18n);
      this.formTipoDocumento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDocumento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDocumento.campos.length; index++) {
      const element = this.formTipoDocumento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDocumento(): void {
    if (this.tipo_documento_id !== undefined && this.tipo_documento_id !== 0) {
      this.documentoService.get('tipo_documento/?query=Id:' + this.tipo_documento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_documento = <TipoDocumento>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_documento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_documento = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDocumento(tipoDocumento: any): void {
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
        this.info_tipo_documento = <TipoDocumento>tipoDocumento;
        this.documentoService.put('tipo_documento', this.info_tipo_documento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_documento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_documento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_documento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDocumento(tipoDocumento: any): void {
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
        this.info_tipo_documento = <TipoDocumento>tipoDocumento;
        this.documentoService.post('tipo_documento', this.info_tipo_documento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_documento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_documento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_documento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDocumento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_documento === undefined) {
        this.createTipoDocumento(event.data.TipoDocumento);
      } else {
        this.updateTipoDocumento(event.data.TipoDocumento);
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
