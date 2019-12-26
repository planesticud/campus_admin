import { Dependencia } from './../../../@core/data/models/dependencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_DEPENDENCIA } from './form-dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-dependencia',
  templateUrl: './crud-dependencia.component.html',
  styleUrls: ['./crud-dependencia.component.scss'],
})
export class CrudDependenciaComponent implements OnInit {
  config: ToasterConfig;
  dependencia_id: number;

  @Input('dependencia_id')
  set name(dependencia_id: number) {
    this.dependencia_id = dependencia_id;
    this.loadDependencia();
  }

  @Output() eventChange = new EventEmitter();

  info_dependencia: Dependencia;
  formDependencia: any;
  regDependencia: any;
  clean: boolean;

  constructor(private translate: TranslateService, private programaOikosService: ProgramaOikosService, private toasterService: ToasterService) {
    this.formDependencia = FORM_DEPENDENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formDependencia.titulo = this.translate.instant('GLOBAL.dependencia');
    this.formDependencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDependencia.campos.length; i++) {
      this.formDependencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formDependencia.campos[i].label_i18n);
      this.formDependencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formDependencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDependencia.campos.length; index++) {
      const element = this.formDependencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDependencia(): void {
    if (this.dependencia_id !== undefined && this.dependencia_id !== 0) {
      this.programaOikosService.get('dependencia/?query=Id:' + this.dependencia_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_dependencia = <Dependencia>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.dependencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_dependencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateDependencia(tipoDependencia: any): void {
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
        this.info_dependencia = <Dependencia>tipoDependencia;
        this.programaOikosService.put('dependencia', this.info_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createDependencia(tipoDependencia: any): void {
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
        this.info_dependencia = <Dependencia>tipoDependencia;
        this.programaOikosService.post('dependencia', this.info_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadDependencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_dependencia === undefined) {
        this.createDependencia(event.data.Dependencia);
      } else {
        this.updateDependencia(event.data.Dependencia);
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
