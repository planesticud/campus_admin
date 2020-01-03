import { AreaConocimiento } from '../../../@core/data/models/area_conocimiento';
import { NucleoBasicoConocimiento } from './../../../@core/data/models/nucleo_basico_conocimiento';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_NUCLEO_BASICO_CONOCIMIENTO } from './form-nucleo_basico_conocimiento';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-nucleo-basico-conocimiento',
  templateUrl: './crud-nucleo_basico_conocimiento.component.html',
  styleUrls: ['./crud-nucleo_basico_conocimiento.component.scss'],
})
export class CrudNucleoBasicoConocimientoComponent implements OnInit {
  config: ToasterConfig;
  nucleo_basico_conocimiento_id: number;

  @Input('nucleo_basico_conocimiento_id')
  set name(nucleo_basico_conocimiento_id: number) {
    this.nucleo_basico_conocimiento_id = nucleo_basico_conocimiento_id;
    this.loadNucleoBasicoConocimiento();
  }

  @Output() eventChange = new EventEmitter();

  info_nucleo_basico_conocimiento: any;
  formNucleoBasicoConocimiento: any;
  regNucleoBasicoConocimiento: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formNucleoBasicoConocimiento = FORM_NUCLEO_BASICO_CONOCIMIENTO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsAreaConocimientoId();
  }

  construirForm() {
    this.formNucleoBasicoConocimiento.titulo = this.translate.instant('GLOBAL.nucleo_basico_conocimiento');
    this.formNucleoBasicoConocimiento.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formNucleoBasicoConocimiento.campos.length; i++) {
      this.formNucleoBasicoConocimiento.campos[i].label = this.translate.instant('GLOBAL.' + this.formNucleoBasicoConocimiento.campos[i].label_i18n);
      this.formNucleoBasicoConocimiento.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formNucleoBasicoConocimiento.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsAreaConocimientoId(): void {
    let areaConocimientoId: Array<any> = [];
    this.coreService.get('area_conocimiento/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          areaConocimientoId = <Array<AreaConocimiento>>res;
        }
        this.formNucleoBasicoConocimiento.campos[ this.getIndexForm('AreaConocimientoId') ].opciones = areaConocimientoId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.area_conocimiento_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formNucleoBasicoConocimiento.campos.length; index++) {
      const element = this.formNucleoBasicoConocimiento.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadNucleoBasicoConocimiento(): void {
    if (this.nucleo_basico_conocimiento_id !== undefined && this.nucleo_basico_conocimiento_id !== 0) {
      this.coreService.get('nucleo_basico_conocimiento/?query=Id:' + this.nucleo_basico_conocimiento_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <NucleoBasicoConocimiento>res[0];
            this.coreService.get('area_conocimiento/' + this.element.AreaConocimientoId.Id).subscribe(res2 => {
              if (res2 != null) {
                this.element.AreaConocimientoId = <any>res2;
              }
              this.info_nucleo_basico_conocimiento = this.element;
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.area_conocimiento_id'),
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
                this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_nucleo_basico_conocimiento = undefined;
      this.clean = !this.clean;
    }
  }

  updateNucleoBasicoConocimiento(nucleoBasicoConocimiento: any): void {
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
        this.info_nucleo_basico_conocimiento = <any>nucleoBasicoConocimiento;
        this.coreService.put('nucleo_basico_conocimiento', this.info_nucleo_basico_conocimiento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.nucleo_basico_conocimiento') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_nucleo_basico_conocimiento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createNucleoBasicoConocimiento(grupoLineaInvestigacion: any): void {
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
        this.info_nucleo_basico_conocimiento = <any>grupoLineaInvestigacion;
        this.coreService.post('nucleo_basico_conocimiento', this.info_nucleo_basico_conocimiento)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.nucleo_basico_conocimiento') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_nucleo_basico_conocimiento = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadNucleoBasicoConocimiento();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_nucleo_basico_conocimiento === undefined) {
        this.createNucleoBasicoConocimiento(event.data.NucleoBasicoConocimiento);
      } else {
        this.updateNucleoBasicoConocimiento(event.data.NucleoBasicoConocimiento);
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
