import { GrupoInvestigacion } from './../../../@core/data/models/grupo_investigacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_GRUPO_INVESTIGACION } from './form-grupo_investigacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-grupo-investigacion',
  templateUrl: './crud-grupo_investigacion.component.html',
  styleUrls: ['./crud-grupo_investigacion.component.scss'],
})
export class CrudGrupoInvestigacionComponent implements OnInit {
  config: ToasterConfig;
  grupo_investigacion_id: number;

  @Input('grupo_investigacion_id')
  set name(grupo_investigacion_id: number) {
    this.grupo_investigacion_id = grupo_investigacion_id;
    this.loadGrupoInvestigacion();
  }

  @Output() eventChange = new EventEmitter();

  info_grupo_investigacion: GrupoInvestigacion;
  formGrupoInvestigacion: any;
  regGrupoInvestigacion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private coreService: CoreService, private toasterService: ToasterService) {
    this.formGrupoInvestigacion = FORM_GRUPO_INVESTIGACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formGrupoInvestigacion.titulo = this.translate.instant('GLOBAL.grupo_investigacion');
    this.formGrupoInvestigacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formGrupoInvestigacion.campos.length; i++) {
      this.formGrupoInvestigacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formGrupoInvestigacion.campos[i].label_i18n);
      this.formGrupoInvestigacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formGrupoInvestigacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formGrupoInvestigacion.campos.length; index++) {
      const element = this.formGrupoInvestigacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadGrupoInvestigacion(): void {
    if (this.grupo_investigacion_id !== undefined && this.grupo_investigacion_id !== 0) {
      this.coreService.get('grupo_investigacion/?query=Id:' + this.grupo_investigacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_grupo_investigacion = <GrupoInvestigacion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.grupo_investigacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_grupo_investigacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateGrupoInvestigacion(grupoInvestigacion: any): void {
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
        this.info_grupo_investigacion = <GrupoInvestigacion>grupoInvestigacion;
        this.coreService.put('grupo_investigacion', this.info_grupo_investigacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.grupo_investigacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_grupo_investigacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          });
      }
    });
  }

  createGrupoInvestigacion(grupoInvestigacion: any): void {
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
        this.info_grupo_investigacion = <GrupoInvestigacion>grupoInvestigacion;
        this.coreService.post('grupo_investigacion', this.info_grupo_investigacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.grupo_investigacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_grupo_investigacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.grupo_investigacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadGrupoInvestigacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_grupo_investigacion === undefined) {
        this.createGrupoInvestigacion(event.data.GrupoInvestigacion);
      } else {
        this.updateGrupoInvestigacion(event.data.GrupoInvestigacion);
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
