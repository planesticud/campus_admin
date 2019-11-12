import { Periodo } from './../../../@core/data/models/periodo';
import { TipoPeriodo } from './../../../@core/data/models/tipo_periodo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_PERIODO } from './form-periodo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-periodo',
  templateUrl: './crud-periodo.component.html',
  styleUrls: ['./crud-periodo.component.scss'],
})
export class CrudPeriodoComponent implements OnInit {
  config: ToasterConfig;
  periodo_id: number;

  @Input('periodo_id')
  set name(periodo_id: number) {
    this.periodo_id = periodo_id;
    this.loadPeriodo();
  }

  @Output() eventChange = new EventEmitter();

  info_periodo: Periodo;
  formPeriodo: any;
  regPeriodo: any;
  clean: boolean;

  constructor(private translate: TranslateService, private coreService: CoreService, private toasterService: ToasterService) {
    this.formPeriodo = FORM_PERIODO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoPeriodoId();
  }

  construirForm() {
    this.formPeriodo.titulo = this.translate.instant('GLOBAL.periodo_academico');
    this.formPeriodo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPeriodo.campos.length; i++) {
      this.formPeriodo.campos[i].label = this.translate.instant('GLOBAL.' + this.formPeriodo.campos[i].label_i18n);
      this.formPeriodo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPeriodo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPeriodo.campos.length; index++) {
      const element = this.formPeriodo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsTipoPeriodoId(): void {
    let tipoPeriodoId: Array<any> = [];
      this.coreService.get('tipo_periodo/?limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            tipoPeriodoId = <Array<TipoPeriodo>>res;
          }
          this.formPeriodo.campos[ this.getIndexForm('TipoPeriodoId') ].opciones = tipoPeriodoId;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_periodo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  public loadPeriodo(): void {
    if (this.periodo_id !== undefined && this.periodo_id !== 0) {
      this.coreService.get('periodo/?query=Id:' + this.periodo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_periodo = <Periodo>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.periodo_academico'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_periodo = undefined;
      this.clean = !this.clean;
    }
  }

  updatePeriodo(periodo: any): void {
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
        this.info_periodo = <Periodo>periodo;
        this.coreService.put('periodo', this.info_periodo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.requisito') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_periodo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.periodo_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createPeriodo(periodo: any): void {
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
        this.info_periodo = <Periodo>periodo;
        this.coreService.post('periodo', this.info_periodo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.periodo_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_periodo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.periodo_academico'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadPeriodo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_periodo === undefined) {
        this.createPeriodo(event.data.Periodo);
      } else {
        this.updatePeriodo(event.data.Periodo);
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
