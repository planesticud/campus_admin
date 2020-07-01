import { TipoDependencia } from './../../../@core/data/models/tipo_dependencia';
import { TipoDescuento } from './../../../@core/data/models/tipo_descuento';
import { TipoDependenciaDescuento } from './../../../@core/data/models/tipo_dependencia_descuento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { FORM_TIPO_DEPENDENCIA_DESCUENTO } from './form-tipo_dependencia_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-dependencia-descuento',
  templateUrl: './crud-tipo_dependencia_descuento.component.html',
  styleUrls: ['./crud-tipo_dependencia_descuento.component.scss'],
})
export class CrudTipoDependenciaDescuentoComponent implements OnInit {
  config: ToasterConfig;
  tipo_dependencia_descuento_id: number;

  @Input('tipo_dependencia_descuento_id')
  set name(tipo_dependencia_descuento_id: number) {
    this.tipo_dependencia_descuento_id = tipo_dependencia_descuento_id;
    this.loadTipoDependenciaDescuento();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_dependencia_descuento: TipoDependenciaDescuento;
  formTipoDependenciaDescuento: any;
  regTipoDependenciaDescuento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private programaService: ProgramaOikosService,
    private descuentosService: DescuentoAcademicoService,
    private toasterService: ToasterService) {
    this.formTipoDependenciaDescuento = FORM_TIPO_DEPENDENCIA_DESCUENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadTipoDescuentoId();
    this.loadTipoDependenciaId();
  }

  construirForm() {
    this.formTipoDependenciaDescuento.titulo = this.translate.instant('GLOBAL.tipo_dependencia_descuento');
    this.formTipoDependenciaDescuento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDependenciaDescuento.campos.length; i++) {
      this.formTipoDependenciaDescuento.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDependenciaDescuento.campos[i].label_i18n);
      this.formTipoDependenciaDescuento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formTipoDependenciaDescuento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDependenciaDescuento.campos.length; index++) {
      const element = this.formTipoDependenciaDescuento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadTipoDescuentoId(): void {
    let tipoDescuentoId: Array<any> = [];
    this.descuentosService.get('tipo_descuento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoDescuentoId = <Array<TipoDescuento>>res;
        }
        this.formTipoDependenciaDescuento.campos[ this.getIndexForm('TipoDescuentoId') ].opciones = tipoDescuentoId;
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

  loadTipoDependenciaId(): void {
    let tipoDependenciaId: Array<any> = [];
    this.programaService.get('tipo_dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoDependenciaId = <Array<TipoDependencia>>res;
        }
        this.formTipoDependenciaDescuento.campos[ this.getIndexForm('TipoDependenciaId') ].opciones = tipoDependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_dependencia'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadTipoDependenciaDescuento(): void {
    if (this.tipo_dependencia_descuento_id !== undefined && this.tipo_dependencia_descuento_id !== 0) {
      this.descuentosService.get('tipo_dependencia_descuento/?query=Id:' + this.tipo_dependencia_descuento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const tipo = <TipoDependenciaDescuento>res[0];
            this.descuentosService.get('tipo_descuento/' + tipo.TipoDescuentoId.Id)
              .subscribe(res2 => {
                if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                  tipo.TipoDescuentoId = <TipoDescuento>res2;
                  this.programaService.get('tipo_dependencia/?query=Id:' + tipo.TipoDependenciaId)
                  .subscribe(res3 => {
                    if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                      tipo.TipoDependenciaId = <TipoDependencia>res3[0];
                      this.info_tipo_dependencia_descuento = tipo;
                    }
                  },
                    (error: HttpErrorResponse) => {
                      Swal({
                        type: 'error',
                        title: error.status + '',
                        text: this.translate.instant('ERROR.' + error.status),
                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                          this.translate.instant('GLOBAL.tipo_dependencia'),
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
                      this.translate.instant('GLOBAL.tipo_descuento'),
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
                this.translate.instant('GLOBAL.tipo_dependencia_descuento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_dependencia_descuento = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDependenciaDescuento(tipoDependenciaDescuento: any): void {
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
          this.info_tipo_dependencia_descuento = <TipoDependenciaDescuento>tipoDependenciaDescuento;
          const dependencia_id = this.info_tipo_dependencia_descuento.TipoDependenciaId.Id;
          this.info_tipo_dependencia_descuento.TipoDependenciaId = dependencia_id;
          this.descuentosService.put('tipo_dependencia_descuento', this.info_tipo_dependencia_descuento)
            .subscribe(res => {
              this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                this.translate.instant('GLOBAL.tipo_dependencia_descuento') + ' ' +
                this.translate.instant('GLOBAL.confirmarActualizar'));
              this.info_tipo_dependencia_descuento = undefined;
              this.clean = !this.clean;
              this.eventChange.emit(true);
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.tipo_dependencia_descuento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  createTipoDependenciaDescuento(tipoDependenciaDescuento: any): void {
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
          this.info_tipo_dependencia_descuento = <TipoDependenciaDescuento>tipoDependenciaDescuento;
          const dependencia_id = this.info_tipo_dependencia_descuento.TipoDependenciaId.Id;
          this.info_tipo_dependencia_descuento.TipoDependenciaId = dependencia_id;
          this.descuentosService.post('tipo_dependencia_descuento', this.info_tipo_dependencia_descuento)
            .subscribe(res => {
              this.showToast('info', this.translate.instant('GLOBAL.crear'),
                this.translate.instant('GLOBAL.tipo_dependencia_descuento') + ' ' +
                this.translate.instant('GLOBAL.confirmarCrear'));
              this.info_tipo_dependencia_descuento = undefined;
              this.clean = !this.clean;
              this.eventChange.emit(true);
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.crear') + '-' +
                    this.translate.instant('GLOBAL.tipo_dependencia_descuento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadTipoDependenciaDescuento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_dependencia_descuento === undefined) {
        this.createTipoDependenciaDescuento(event.data.TipoDependenciaDescuento);
      } else {
        this.updateTipoDependenciaDescuento(event.data.TipoDependenciaDescuento);
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
