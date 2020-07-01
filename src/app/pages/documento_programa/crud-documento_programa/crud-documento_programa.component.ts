import { TipoDocumentoPrograma } from './../../../@core/data/models/tipo_documento_programa';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { DocumentoPrograma } from './../../../@core/data/models/documento_programa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoProgramaService } from '../../../@core/data/documento_programa.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { CoreService } from '../../../@core/data/core.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_DOCUMENTO_PROGRAMA } from './form-documento_programa';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-documento-programa',
  templateUrl: './crud-documento_programa.component.html',
  styleUrls: ['./crud-documento_programa.component.scss'],
})
export class CrudDocumentoProgramaComponent implements OnInit {
  config: ToasterConfig;
  documento_programa_id: number;

  @Input('documento_programa_id')
  set name(documento_programa_id: number) {
    this.documento_programa_id = documento_programa_id;
    this.loadDocumentoPrograma();
  }

  @Output() eventChange = new EventEmitter();

  info_documento_programa: DocumentoPrograma;
  formDocumentoPrograma: any;
  regDocumentoPrograma: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private documentoService: DocumentoProgramaService,
    private programaAcademico: ProgramaOikosService,
    private core: CoreService,
    private toasterService: ToasterService) {
    this.formDocumentoPrograma = FORM_DOCUMENTO_PROGRAMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoDocumentoProgramaId();
    this.loadOptionsPeriodoId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formDocumentoPrograma.titulo = this.translate.instant('GLOBAL.documento_programa');
    this.formDocumentoPrograma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDocumentoPrograma.campos.length; i++) {
      this.formDocumentoPrograma.campos[i].label = this.translate.instant('GLOBAL.' + this.formDocumentoPrograma.campos[i].label_i18n);
      this.formDocumentoPrograma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formDocumentoPrograma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoDocumentoProgramaId(): void {
    let tipoDocumentoProgramaId: Array<any> = [];
    this.documentoService.get('tipo_documento_programa/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoDocumentoProgramaId = <Array<TipoDocumentoPrograma>>res;
        }
        this.formDocumentoPrograma.campos[ this.getIndexForm('TipoDocumentoProgramaId') ].opciones = tipoDocumentoProgramaId;
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
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<ProgramaAcademico>>res;
        }
        this.formDocumentoPrograma.campos[ this.getIndexForm('ProgramaId') ].opciones = dependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.dependencia_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsPeriodoId(): void {
    let periodoId: Array<any> = [];
    this.core.get('periodo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          periodoId = <Array<ProgramaAcademico>>res;
        }
        this.formDocumentoPrograma.campos[ this.getIndexForm('PeriodoId') ].opciones = periodoId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.periodo_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDocumentoPrograma.campos.length; index++) {
      const element = this.formDocumentoPrograma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDocumentoPrograma(): void {
    if (this.documento_programa_id !== undefined && this.documento_programa_id !== 0) {
      this.documentoService.get('documento_programa/?query=Id:' + this.documento_programa_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <DocumentoPrograma>res[0];
            this.documentoService.get('tipo_documento_programa/' + this.element.TipoDocumentoProgramaId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                this.element.TipoDocumentoProgramaId = <any>res2;
                this.programaAcademico.get('dependencia/' + this.element.ProgramaId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.element.ProgramaId = <any>res3;
                    this.core.get('periodo/' + this.element.PeriodoId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        this.element.PeriodoId = <any>res4;
                      }
                      this.info_documento_programa = this.element;
                    },
                    (error: HttpErrorResponse) => {
                      Swal({
                        type: 'error',
                        title: error.status + '',
                        text: this.translate.instant('ERROR.' + error.status),
                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                          this.translate.instant('GLOBAL.periodo_id'),
                        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                      });
                    });
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.dependencia_id'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
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
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.documento_programa'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_documento_programa = undefined;
      this.clean = !this.clean;
    }
  }

  updateDocumentoPrograma(descuentosDependencia: any): void {
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
        this.info_documento_programa = <DocumentoPrograma>descuentosDependencia;
        this.info_documento_programa.ProgramaId = this.info_documento_programa.ProgramaId.Id;
        this.info_documento_programa.PeriodoId = this.info_documento_programa.PeriodoId.Id;
        this.documentoService.put('documento_programa', this.info_documento_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.documento_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_documento_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.documento_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createDocumentoPrograma(descuentosDependencia: any): void {
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
        this.info_documento_programa = <DocumentoPrograma>descuentosDependencia;
        this.info_documento_programa.ProgramaId = this.info_documento_programa.ProgramaId.Id;
        this.info_documento_programa.PeriodoId = this.info_documento_programa.PeriodoId.Id;
        this.documentoService.post('documento_programa', this.info_documento_programa)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.documento_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_documento_programa = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.documento_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadDocumentoPrograma();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_documento_programa === undefined) {
        this.createDocumentoPrograma(event.data.DocumentoPrograma);
      } else {
        this.updateDocumentoPrograma(event.data.DocumentoPrograma);
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
