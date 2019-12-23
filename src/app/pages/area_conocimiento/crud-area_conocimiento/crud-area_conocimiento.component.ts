import { AreaConocimiento } from './../../../@core/data/models/area_conocimiento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_AREA_CONOCIMIENTO } from './form-area_conocimiento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-area-conocimiento',
  templateUrl: './crud-area_conocimiento.component.html',
  styleUrls: ['./crud-area_conocimiento.component.scss'],
})
export class CrudAreaConocimientoComponent implements OnInit {
  config: ToasterConfig;
  area_conocimiento_id: number;

  @Input('area_conocimiento_id')
  set name(area_conocimiento_id: number) {
    this.area_conocimiento_id = area_conocimiento_id;
    this.loadAreaConocimiento();
  }

  @Output() eventChange = new EventEmitter();

  info_area_conocimiento: AreaConocimiento;
  formAreaConocimiento: any;
  regAreaConocimiento: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formAreaConocimiento = FORM_AREA_CONOCIMIENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formAreaConocimiento.titulo = this.translate.instant('GLOBAL.area_conocimiento');
    this.formAreaConocimiento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formAreaConocimiento.campos.length; i++) {
      this.formAreaConocimiento.campos[i].label = this.translate.instant('GLOBAL.' + this.formAreaConocimiento.campos[i].label_i18n);
      this.formAreaConocimiento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formAreaConocimiento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formAreaConocimiento.campos.length; index++) {
      const element = this.formAreaConocimiento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadAreaConocimiento(): void {
    if (this.area_conocimiento_id !== undefined && this.area_conocimiento_id !== 0) {
      this.coreService.get('area_conocimiento/?query=Id:' + this.area_conocimiento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_area_conocimiento = <AreaConocimiento>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.area_conocimiento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_area_conocimiento = undefined;
      this.clean = !this.clean;
    }
  }

  updateAreaConocimiento(areaConocimiento: any): void {
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
        this.info_area_conocimiento = <AreaConocimiento>areaConocimiento;
        this.coreService.put('area_conocimiento', this.info_area_conocimiento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.area_conocimiento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_area_conocimiento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.area_conocimiento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createAreaConocimiento(areaConocimiento: any): void {
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
        this.info_area_conocimiento = <AreaConocimiento>areaConocimiento;
        this.coreService.post('area_conocimiento', this.info_area_conocimiento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.area_conocimiento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_area_conocimiento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.area_conocimiento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadAreaConocimiento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_area_conocimiento === undefined) {
        this.createAreaConocimiento(event.data.AreaConocimiento);
      } else {
        this.updateAreaConocimiento(event.data.AreaConocimiento);
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
