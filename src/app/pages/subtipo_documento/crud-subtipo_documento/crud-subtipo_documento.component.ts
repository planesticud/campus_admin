import { TipoDocumento } from '../../../@core/data/models/tipo_documento';
import { SubtipoDocumento } from './../../../@core/data/models/subtipo_documento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoService } from '../../../@core/data/documento.service';
import { FORM_SUBTIPO_DOCUMENTO } from './form-subtipo_documento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-subtipo-documento',
  templateUrl: './crud-subtipo_documento.component.html',
  styleUrls: ['./crud-subtipo_documento.component.scss'],
})
export class CrudSubtipoDocumentoComponent implements OnInit {
  config: ToasterConfig;
  subtipo_documento_id: number;

  @Input('subtipo_documento_id')
  set name(subtipo_documento_id: number) {
    this.subtipo_documento_id = subtipo_documento_id;
    this.loadSubtipoDocumento();
  }

  @Output() eventChange = new EventEmitter();

  info_subtipo_documento: SubtipoDocumento;
  formSubtipoDocumento: any;
  regSubtipoDocumento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private documentoService: DocumentoService,
    private toasterService: ToasterService) {
    this.formSubtipoDocumento = FORM_SUBTIPO_DOCUMENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoDocumento();
  }

  construirForm() {
    this.formSubtipoDocumento.titulo = this.translate.instant('GLOBAL.subtipo_documento');
    this.formSubtipoDocumento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formSubtipoDocumento.campos.length; i++) {
      this.formSubtipoDocumento.campos[i].label = this.translate.instant('GLOBAL.' + this.formSubtipoDocumento.campos[i].label_i18n);
      this.formSubtipoDocumento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formSubtipoDocumento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formSubtipoDocumento.campos.length; index++) {
      const element = this.formSubtipoDocumento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsTipoDocumento(): void {
    let tipoDocumento: Array<any> = [];
    this.documentoService.get('tipo_documento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoDocumento = <Array<TipoDocumento>>res;
        }
        this.formSubtipoDocumento.campos[ this.getIndexForm('TipoDocumentoPadre') ].opciones = tipoDocumento;
        this.formSubtipoDocumento.campos[ this.getIndexForm('TipoDocumentoHijo') ].opciones = tipoDocumento;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_descuento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadSubtipoDocumento(): void {
    if (this.subtipo_documento_id !== undefined && this.subtipo_documento_id !== 0) {
      this.documentoService.get('subtipo_documento/?query=Id:' + this.subtipo_documento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_subtipo_documento = <SubtipoDocumento>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.subtipo_documento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_subtipo_documento = undefined;
      this.clean = !this.clean;
    }
  }

  updateSubtipoDocumento(subtipoDocumento: any): void {
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
        this.info_subtipo_documento = <SubtipoDocumento>subtipoDocumento;
        this.documentoService.put('subtipo_documento', this.info_subtipo_documento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.subtipo_documento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_subtipo_documento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.subtipo_documento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createSubtipoDocumento(subtipoDocumento: any): void {
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
        this.info_subtipo_documento = <SubtipoDocumento>subtipoDocumento;
        this.documentoService.post('subtipo_documento', this.info_subtipo_documento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.subtipo_documento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_subtipo_documento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.subtipo_documento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadSubtipoDocumento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_subtipo_documento === undefined) {
        this.createSubtipoDocumento(event.data.SubtipoDocumento);
      } else {
        this.updateSubtipoDocumento(event.data.SubtipoDocumento);
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
