import { ConceptoAcademico } from './../../../@core/data/models/concepto_academico';
import { TipoDescuento } from './../../../@core/data/models/tipo_descuento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { FORM_TIPO_DESCUENTO } from './form-tipo_descuento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-descuento',
  templateUrl: './crud-tipo_descuento.component.html',
  styleUrls: ['./crud-tipo_descuento.component.scss'],
})
export class CrudTipoDescuentoComponent implements OnInit {
  config: ToasterConfig;
  tipo_descuento_id: number;

  @Input('tipo_descuento_id')
  set name(tipo_descuento_id: number) {
    this.tipo_descuento_id = tipo_descuento_id;
    this.loadTipoDescuento();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_descuento: TipoDescuento;
  formTipoDescuento: any;
  regTipoDescuento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private descuentosService: DescuentoAcademicoService,
    private toasterService: ToasterService) {
    this.formTipoDescuento = FORM_TIPO_DESCUENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadConceptoAcademicoId();
  }

  construirForm() {
    this.formTipoDescuento.titulo = this.translate.instant('GLOBAL.tipo_descuento');
    this.formTipoDescuento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoDescuento.campos.length; i++) {
      this.formTipoDescuento.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoDescuento.campos[i].label_i18n);
      this.formTipoDescuento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoDescuento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoDescuento.campos.length; index++) {
      const element = this.formTipoDescuento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadConceptoAcademicoId(): void {
    let conceptoAcademicoId: Array<any> = [];
      this.coreService.get('concepto_academico/?limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            conceptoAcademicoId = <Array<ConceptoAcademico>>res;
          }
          this.formTipoDescuento.campos[ this.getIndexForm('ConceptoAcademicoId') ].opciones = conceptoAcademicoId;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.concepto_academico_id'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  public loadTipoDescuento(): void {
    if (this.tipo_descuento_id !== undefined && this.tipo_descuento_id !== 0) {
      this.descuentosService.get('tipo_descuento/?query=Id:' + this.tipo_descuento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const tipo = <TipoDescuento>res[0];
            this.coreService.get('concepto_academico/' + tipo.ConceptoAcademicoId)
              .subscribe(res3 => {
                if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                  tipo.ConceptoAcademicoId = <ConceptoAcademico>res3;
                  this.info_tipo_descuento = tipo;
                }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.concepto_academico_id'),
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
    } else  {
      this.info_tipo_descuento = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoDescuento(tipoDescuento: any): void {
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
        this.info_tipo_descuento = <TipoDescuento>tipoDescuento;
        const concepto_id = this.info_tipo_descuento.ConceptoAcademicoId.Id;
        this.info_tipo_descuento.ConceptoAcademicoId = concepto_id;
        this.descuentosService.put('tipo_descuento', this.info_tipo_descuento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_descuento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoDescuento(tipoDescuento: any): void {
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
        this.info_tipo_descuento = <TipoDescuento>tipoDescuento;
        const concepto_id = this.info_tipo_descuento.ConceptoAcademicoId.Id;
        this.info_tipo_descuento.ConceptoAcademicoId = concepto_id;
        this.descuentosService.post('tipo_descuento', this.info_tipo_descuento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_descuento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_descuento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoDescuento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_descuento === undefined) {
        this.createTipoDescuento(event.data.TipoDescuento);
      } else {
        this.updateTipoDescuento(event.data.TipoDescuento);
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
