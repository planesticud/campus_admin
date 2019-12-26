import { TipoDocumentoPrograma } from './../../../@core/data/models/tipo_documento_programa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoProgramaService } from '../../../@core/data/documento_programa.service';
import { FORM_TIPO_DOCUMENTO_PROGRAMA } from './form-tipo_documento_programa';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-documento-programa',
  templateUrl: './crud-tipo_documento_programa.component.html',
  styleUrls: ['./crud-tipo_documento_programa.component.scss'],
})
export class CrudTipoDocumentoProgramaComponent implements OnInit {
  config: ToasterConfig;
  tipo_documento_programa_id: number;

  @Input('tipo_documento_programa_id')
  set name(tipo_documento_programa_id: number) {
    this.tipo_documento_programa_id = tipo_documento_programa_id;
    this.loadTipoDocumentoPrograma();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_documento_programa: TipoDocumentoPrograma;
  formTipoDocumentoPrograma: any;
  regTipoDocumentoPrograma: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private documentoService: DocumentoProgramaService,
    private toasterService: ToasterService) {
    this.formTipoDocumentoPrograma = FORM_TIPO_DOCUMENTO_PROGRAMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoDocumentoPrograma.titulo = this.translate.instant('GLOBAL.tipo_documento_programa');
    this.formTipoDocumentoPrograma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDocumentoPrograma.campos.length; i++) {
      this.formTipoDocumentoPrograma.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDocumentoPrograma.campos[i].label_i18n);
      this.formTipoDocumentoPrograma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoDocumentoPrograma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDocumentoPrograma.campos.length; index++) {
      const element = this.formTipoDocumentoPrograma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoDocumentoPrograma(): void {
    if (this.tipo_documento_programa_id !== undefined && this.tipo_documento_programa_id !== 0) {
      this.documentoService.get('tipo_documento_programa/?query=Id:' + this.tipo_documento_programa_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_documento_programa = <TipoDocumentoPrograma>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_documento_programa'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_documento_programa = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDocumentoPrograma(tipoDocumentoPrograma: any): void {
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
        this.info_tipo_documento_programa = <TipoDocumentoPrograma>tipoDocumentoPrograma;
        this.documentoService.put('tipo_documento_programa', this.info_tipo_documento_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_documento_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_documento_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_documento_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDocumentoPrograma(tipoDocumentoPrograma: any): void {
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
        this.info_tipo_documento_programa = <TipoDocumentoPrograma>tipoDocumentoPrograma;
        this.documentoService.post('tipo_documento_programa', this.info_tipo_documento_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_documento_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_documento_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_documento_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDocumentoPrograma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_documento_programa === undefined) {
        this.createTipoDocumentoPrograma(event.data.TipoDocumentoPrograma);
      } else {
        this.updateTipoDocumentoPrograma(event.data.TipoDocumentoPrograma);
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
