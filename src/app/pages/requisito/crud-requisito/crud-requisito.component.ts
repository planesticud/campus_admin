import { Requisito } from './../../../@core/data/models/requisito';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { FORM_REQUISITO } from './form-requisito';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-requisito',
  templateUrl: './crud-requisito.component.html',
  styleUrls: ['./crud-requisito.component.scss'],
})
export class CrudRequisitoComponent implements OnInit {
  config: ToasterConfig;
  requisito_id: number;

  @Input('requisito_id')
  set name(requisito_id: number) {
    this.requisito_id = requisito_id;
    this.loadRequisito();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito: Requisito;
  formRequisito: any;
  regRequisito: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private descuentosService: DescuentoAcademicoService,
    private toasterService: ToasterService) {
    this.formRequisito = FORM_REQUISITO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formRequisito.titulo = this.translate.instant('GLOBAL.requisito');
    this.formRequisito.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisito.campos.length; i++) {
      this.formRequisito.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisito.campos[i].label_i18n);
      this.formRequisito.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formRequisito.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRequisito.campos.length; index++) {
      const element = this.formRequisito.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRequisito(): void {
    if (this.requisito_id !== undefined && this.requisito_id !== 0) {
      this.descuentosService.get('requisito/?query=id:' + this.requisito_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_requisito = <Requisito>res[0];
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
    } else  {
      this.info_requisito = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisito(requisito: any): void {
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
        this.info_requisito = <Requisito>requisito;
        this.descuentosService.put('requisito', this.info_requisito)
          .subscribe(res => {
            this.loadRequisito();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_requisito = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.requisito'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRequisito(requisito: any): void {
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
        this.info_requisito = <Requisito>requisito;
        this.descuentosService.post('requisito', this.info_requisito)
          .subscribe(res => {
            this.info_requisito = <Requisito>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.requisito') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_requisito = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.requisito'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRequisito();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito === undefined) {
        this.createRequisito(event.data.Requisito);
      } else {
        this.updateRequisito(event.data.Requisito);
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
