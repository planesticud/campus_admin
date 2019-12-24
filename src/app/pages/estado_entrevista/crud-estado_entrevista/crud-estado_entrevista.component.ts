import { EstadoEntrevista } from './../../../@core/data/models/estado_entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { FORM_ESTADO_ENTREVISTA } from './form-estado_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-estado-entrevista',
  templateUrl: './crud-estado_entrevista.component.html',
  styleUrls: ['./crud-estado_entrevista.component.scss'],
})
export class CrudEstadoEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  estado_entrevista_id: number;

  @Input('estado_entrevista_id')
  set name(estado_entrevista_id: number) {
    this.estado_entrevista_id = estado_entrevista_id;
    this.loadEstadoEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_estado_entrevista: EstadoEntrevista;
  formEstadoEntrevista: any;
  regEstadoEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private evaluacionInscripcionService: EvaluacionInscripcionService,
    private toasterService: ToasterService) {
    this.formEstadoEntrevista = FORM_ESTADO_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formEstadoEntrevista.titulo = this.translate.instant('GLOBAL.estado_entrevista');
    this.formEstadoEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEstadoEntrevista.campos.length; i++) {
      this.formEstadoEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formEstadoEntrevista.campos[i].label_i18n);
      this.formEstadoEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEstadoEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEstadoEntrevista.campos.length; index++) {
      const element = this.formEstadoEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadEstadoEntrevista(): void {
    if (this.estado_entrevista_id !== undefined && this.estado_entrevista_id !== 0) {
      this.evaluacionInscripcionService.get('estado_entrevista/?query=Id:' + this.estado_entrevista_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_estado_entrevista = <EstadoEntrevista>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.estado_entrevista'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_estado_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateEstadoEntrevista(estadoEntrevista: any): void {
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
        this.info_estado_entrevista = <EstadoEntrevista>estadoEntrevista;
        this.evaluacionInscripcionService.put('estado_entrevista', this.info_estado_entrevista)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.estado_entrevista') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_estado_entrevista = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.estado_entrevista'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createEstadoEntrevista(estadoEntrevista: any): void {
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
        this.info_estado_entrevista = <EstadoEntrevista>estadoEntrevista;
        this.evaluacionInscripcionService.post('estado_entrevista', this.info_estado_entrevista)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.estado_entrevista') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_estado_entrevista = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.estado_entrevista'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadEstadoEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_estado_entrevista === undefined) {
        this.createEstadoEntrevista(event.data.EstadoEntrevista);
      } else {
        this.updateEstadoEntrevista(event.data.EstadoEntrevista);
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
