import { TipoDescuento } from './../../../@core/data/models/tipo_descuento';
import { Requisito } from './../../../@core/data/models/requisito';
import { RequisitoTipoDescuento } from './../../../@core/data/models/requisito_tipo_descuento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { FORM_REQUISITO_TIPO_DESCUENTO } from './form-requisito_tipo_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-requisito-tipo-descuento',
  templateUrl: './crud-requisito_tipo_descuento.component.html',
  styleUrls: ['./crud-requisito_tipo_descuento.component.scss'],
})
export class CrudRequisitoTipoDescuentoComponent implements OnInit {
  config: ToasterConfig;
  requisito_tipo_descuento_id: number;

  @Input('requisito_tipo_descuento_id')
  set name(requisito_tipo_descuento_id: number) {
    this.requisito_tipo_descuento_id = requisito_tipo_descuento_id;
    this.loadRequisitoTipoDescuento();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito_tipo_descuento: RequisitoTipoDescuento;
  formRequisitoTipoDescuento: any;
  regRequisitoTipoDescuento: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private descuentosService: DescuentoAcademicoService,
    private toasterService: ToasterService) {
    this.formRequisitoTipoDescuento = FORM_REQUISITO_TIPO_DESCUENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoDescuentoId();
    this.loadOptionsRequisitoId();
  }

  construirForm() {
    this.formRequisitoTipoDescuento.titulo = this.translate.instant('GLOBAL.requisito_tipo_descuento');
    this.formRequisitoTipoDescuento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisitoTipoDescuento.campos.length; i++) {
      this.formRequisitoTipoDescuento.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisitoTipoDescuento.campos[i].label_i18n);
      this.formRequisitoTipoDescuento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRequisitoTipoDescuento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoDescuentoId(): void {
    let tipoDescuentoId: Array<any> = [];
      this.descuentosService.get('tipo_descuento/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipoDescuentoId = <Array<TipoDescuento>>res;
          }
          this.formRequisitoTipoDescuento.campos[ this.getIndexForm('TipoDescuentoId') ].opciones = tipoDescuentoId;
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

  loadOptionsRequisitoId(): void {
    let requisitoId: Array<any> = [];
      this.descuentosService.get('requisito/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            requisitoId = <Array<Requisito>>res;
          }
          this.formRequisitoTipoDescuento.campos[ this.getIndexForm('RequisitoId') ].opciones = requisitoId;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.requisito'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRequisitoTipoDescuento.campos.length; index++) {
      const element = this.formRequisitoTipoDescuento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRequisitoTipoDescuento(): void {
    if (this.requisito_tipo_descuento_id !== undefined && this.requisito_tipo_descuento_id !== 0) {
      this.descuentosService.get('requisito_tipo_descuento/?query=id:' + this.requisito_tipo_descuento_id)
        .subscribe(res => {
          if (res !== null) {
            this.element = <RequisitoTipoDescuento>res[0];
            this.descuentosService.get('requisito/' + this.element.RequisitoId.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.RequisitoId = <any>res2;
                this.descuentosService.get('tipo_descuento/' + this.element.TipoDescuentoId.Id).subscribe(res3 => {
                  if (res3 !== null) {
                    this.element.TipoDescuentoId = <any>res3;
                    this.info_requisito_tipo_descuento = this.element
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
                    this.translate.instant('GLOBAL.requisito'),
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
                this.translate.instant('GLOBAL.requisito_tipo_descuento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_requisito_tipo_descuento = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisitoTipoDescuento(requisitoTipoDescuento: any): void {
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
        this.info_requisito_tipo_descuento = <RequisitoTipoDescuento>requisitoTipoDescuento;
        this.descuentosService.put('requisito_tipo_descuento', this.info_requisito_tipo_descuento)
          .subscribe(res => {
            this.loadRequisitoTipoDescuento();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito_tipo_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_requisito_tipo_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.requisito_tipo_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRequisitoTipoDescuento(requisitoTipoDescuento: any): void {
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
        this.info_requisito_tipo_descuento = <RequisitoTipoDescuento>requisitoTipoDescuento;
        this.descuentosService.post('requisito_tipo_descuento', this.info_requisito_tipo_descuento)
          .subscribe(res => {
            this.info_requisito_tipo_descuento = <RequisitoTipoDescuento>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.requisito_tipo_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_requisito_tipo_descuento = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.requisito_tipo_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRequisitoTipoDescuento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito_tipo_descuento === undefined) {
        this.createRequisitoTipoDescuento(event.data.RequisitoTipoDescuento);
      } else {
        this.updateRequisitoTipoDescuento(event.data.RequisitoTipoDescuento);
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
