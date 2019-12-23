import { PerfilProfesional } from './../../../@core/data/models/perfil_profesional';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { FORM_PERFIL_PROFESIONAL } from './form-perfil_profesional';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-perfil-profesional',
  templateUrl: './crud-perfil_profesional.component.html',
  styleUrls: ['./crud-perfil_profesional.component.scss'],
})
export class CrudPerfilProfesionalComponent implements OnInit {
  config: ToasterConfig;
  perfil_profesional_id: number;

  @Input('perfil_profesional_id')
  set name(perfil_profesional_id: number) {
    this.perfil_profesional_id = perfil_profesional_id;
    this.loadPerfilProfesional();
  }

  @Output() eventChange = new EventEmitter();

  info_perfil_profesional: PerfilProfesional;
  formPerfilProfesional: any;
  regPerfilProfesional: any;
  clean: boolean;

  constructor(private translate: TranslateService, private personaService: PersonaService, private toasterService: ToasterService) {
    this.formPerfilProfesional = FORM_PERFIL_PROFESIONAL;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formPerfilProfesional.titulo = this.translate.instant('GLOBAL.perfil_profesional');
    this.formPerfilProfesional.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPerfilProfesional.campos.length; i++) {
      this.formPerfilProfesional.campos[i].label = this.translate.instant('GLOBAL.' + this.formPerfilProfesional.campos[i].label_i18n);
      this.formPerfilProfesional.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPerfilProfesional.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPerfilProfesional.campos.length; index++) {
      const element = this.formPerfilProfesional.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadPerfilProfesional(): void {
    if (this.perfil_profesional_id !== undefined && this.perfil_profesional_id !== 0) {
      this.personaService.get('perfil_profesional/?query=Id:' + this.perfil_profesional_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_perfil_profesional = <PerfilProfesional>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.perfil_profesional'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_perfil_profesional = undefined;
      this.clean = !this.clean;
    }
  }

  updatePerfilProfesional(perfilProfesional: any): void {
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
        this.info_perfil_profesional = <PerfilProfesional>perfilProfesional;
        this.personaService.put('perfil_profesional', this.info_perfil_profesional)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.perfil_profesional') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_perfil_profesional = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.perfil_profesional'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createPerfilProfesional(perfilProfesional: any): void {
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
        this.info_perfil_profesional = <PerfilProfesional>perfilProfesional;
        this.personaService.post('perfil_profesional', this.info_perfil_profesional)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.perfil_profesional') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_perfil_profesional = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.perfil_profesional'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadPerfilProfesional();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_perfil_profesional === undefined) {
        this.createPerfilProfesional(event.data.PerfilProfesional);
      } else {
        this.updatePerfilProfesional(event.data.PerfilProfesional);
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
