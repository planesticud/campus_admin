import { TipoEntrevista } from './../../../@core/data/models/tipo_entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { FORM_TIPO_ENTREVISTA } from './form-tipo_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-tipo-entrevista',
  templateUrl: './crud-tipo_entrevista.component.html',
  styleUrls: ['./crud-tipo_entrevista.component.scss'],
})
export class CrudTipoEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  tipo_entrevista_id: number;

  @Input('tipo_entrevista_id')
  set name(tipo_entrevista_id: number) {
    this.tipo_entrevista_id = tipo_entrevista_id;
    this.loadTipoEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_entrevista: TipoEntrevista;
  formTipoEntrevista: any;
  regTipoEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private evaluacionInscripcionService: EvaluacionInscripcionService,
    private toasterService: ToasterService) {
    this.formTipoEntrevista = FORM_TIPO_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoEntrevista.titulo = this.translate.instant('GLOBAL.tipo_entrevista');
    this.formTipoEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoEntrevista.campos.length; i++) {
      this.formTipoEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoEntrevista.campos[i].label_i18n);
      this.formTipoEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoEntrevista.campos.length; index++) {
      const element = this.formTipoEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoEntrevista(): void {
    if (this.tipo_entrevista_id !== undefined && this.tipo_entrevista_id !== 0) {
      this.evaluacionInscripcionService.get('tipo_entrevista/?query=Id:' + this.tipo_entrevista_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_entrevista = <TipoEntrevista>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_entrevista'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoEntrevista(tipoEntrevista: any): void {
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
        this.info_tipo_entrevista = <TipoEntrevista>tipoEntrevista;
        this.evaluacionInscripcionService.put('tipo_entrevista', this.info_tipo_entrevista)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_entrevista') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_entrevista = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_entrevista'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoEntrevista(tipoEntrevista: any): void {
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
        this.info_tipo_entrevista = <TipoEntrevista>tipoEntrevista;
        this.evaluacionInscripcionService.post('tipo_entrevista', this.info_tipo_entrevista)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_entrevista') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_entrevista = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_entrevista'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_entrevista === undefined) {
        this.createTipoEntrevista(event.data.TipoEntrevista);
      } else {
        this.updateTipoEntrevista(event.data.TipoEntrevista);
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
