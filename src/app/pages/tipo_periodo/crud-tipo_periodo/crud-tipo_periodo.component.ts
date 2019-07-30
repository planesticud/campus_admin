import { TipoPeriodo } from './../../../@core/data/models/tipo_periodo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_TIPO_PERIODO } from './form-tipo_periodo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-periodo',
  templateUrl: './crud-tipo_periodo.component.html',
  styleUrls: ['./crud-tipo_periodo.component.scss'],
})
export class CrudTipoPeriodoComponent implements OnInit {
  config: ToasterConfig;
  tipo_periodo_id: number;

  @Input('tipo_periodo_id')
  set name(tipo_periodo_id: number) {
    this.tipo_periodo_id = tipo_periodo_id;
    this.loadTipoPeriodo();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_periodo: TipoPeriodo;
  formTipoPeriodo: any;
  regTipoPeriodo: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formTipoPeriodo = FORM_TIPO_PERIODO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoPeriodo.titulo = this.translate.instant('GLOBAL.tipo_periodo');
    this.formTipoPeriodo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoPeriodo.campos.length; i++) {
      this.formTipoPeriodo.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoPeriodo.campos[i].label_i18n);
      this.formTipoPeriodo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoPeriodo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoPeriodo.campos.length; index++) {
      const element = this.formTipoPeriodo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoPeriodo(): void {
    if (this.tipo_periodo_id !== undefined && this.tipo_periodo_id !== 0) {
      this.coreService.get('tipo_periodo/?query=id:' + this.tipo_periodo_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_periodo = <TipoPeriodo>res[0];
          }
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
    } else {
      this.info_tipo_periodo = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoPeriodo(tipoProyecto: any): void {
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
        this.info_tipo_periodo = <TipoPeriodo>tipoProyecto;
        this.coreService.put('tipo_periodo', this.info_tipo_periodo)
          .subscribe(res => {
            this.loadTipoPeriodo();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_periodo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_periodo = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_periodo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoPeriodo(tipoProyecto: any): void {
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
        this.info_tipo_periodo = <TipoPeriodo>tipoProyecto;
        this.coreService.post('tipo_periodo', this.info_tipo_periodo)
          .subscribe(res => {
            this.info_tipo_periodo = <TipoPeriodo>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_periodo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_periodo = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_periodo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoPeriodo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_periodo === undefined) {
        this.createTipoPeriodo(event.data.TipoPeriodo);
      } else {
        this.updateTipoPeriodo(event.data.TipoPeriodo);
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
