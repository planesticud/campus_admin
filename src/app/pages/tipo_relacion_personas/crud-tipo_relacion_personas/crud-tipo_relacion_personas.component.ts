import { TipoRelacionPersonas } from './../../../@core/data/models/tipo_relacion_personas';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { FORM_TIPO_RELACION_PERSONAS } from './form-tipo_relacion_personas';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-relacion-personas',
  templateUrl: './crud-tipo_relacion_personas.component.html',
  styleUrls: ['./crud-tipo_relacion_personas.component.scss'],
})
export class CrudTipoRelacionPersonasComponent implements OnInit {
  config: ToasterConfig;
  tipo_relacion_personas_id: number;

  @Input('tipo_relacion_personas_id')
  set name(tipo_relacion_personas_id: number) {
    this.tipo_relacion_personas_id = tipo_relacion_personas_id;
    this.loadTipoRelacionPersonas();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_relacion_personas: TipoRelacionPersonas;
  formTipoRelacionPersonas: any;
  regTipoRelacionPersonas: any;
  clean: boolean;

  constructor(private translate: TranslateService, private personaService: PersonaService, private toasterService: ToasterService) {
    this.formTipoRelacionPersonas = FORM_TIPO_RELACION_PERSONAS;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formTipoRelacionPersonas.titulo = this.translate.instant('GLOBAL.tipo_relacion_personas');
    this.formTipoRelacionPersonas.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoRelacionPersonas.campos.length; i++) {
      this.formTipoRelacionPersonas.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoRelacionPersonas.campos[i].label_i18n);
      this.formTipoRelacionPersonas.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoRelacionPersonas.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoRelacionPersonas.campos.length; index++) {
      const element = this.formTipoRelacionPersonas.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadTipoRelacionPersonas(): void {
    if (this.tipo_relacion_personas_id !== undefined && this.tipo_relacion_personas_id !== 0) {
      this.personaService.get('tipo_relacion_personas/?query=Id:' + this.tipo_relacion_personas_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_tipo_relacion_personas = <TipoRelacionPersonas>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_relacion_personas'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_tipo_relacion_personas = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoRelacionPersonas(tipoRelacionPersonas: any): void {
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
        this.info_tipo_relacion_personas = <TipoRelacionPersonas>tipoRelacionPersonas;
        this.personaService.put('tipo_relacion_personas', this.info_tipo_relacion_personas)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.tipo_relacion_personas') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_tipo_relacion_personas = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_personas'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createTipoRelacionPersonas(tipoRelacionPersonas: any): void {
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
        this.info_tipo_relacion_personas = <TipoRelacionPersonas>tipoRelacionPersonas;
        this.personaService.post('tipo_relacion_personas', this.info_tipo_relacion_personas)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.tipo_relacion_personas') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_tipo_relacion_personas = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.tipo_relacion_personas'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadTipoRelacionPersonas();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_relacion_personas === undefined) {
        this.createTipoRelacionPersonas(event.data.TipoRelacionPersonas);
      } else {
        this.updateTipoRelacionPersonas(event.data.TipoRelacionPersonas);
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
