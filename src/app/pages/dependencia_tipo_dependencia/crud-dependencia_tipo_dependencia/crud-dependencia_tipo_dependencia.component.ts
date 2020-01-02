import { Dependencia } from '../../../@core/data/models/dependencia';
import { TipoDependencia } from '../../../@core/data/models/tipo_dependencia';
import { DependenciaTipoDependencia } from './../../../@core/data/models/dependencia_tipo_dependencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_DEPENDENCIA_TIPO_DEPENDENCIA } from './form-dependencia_tipo_dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-dependencia-tipo-dependencia',
  templateUrl: './crud-dependencia_tipo_dependencia.component.html',
  styleUrls: ['./crud-dependencia_tipo_dependencia.component.scss'],
})
export class CrudDependenciaTipoDependenciaComponent implements OnInit {
  config: ToasterConfig;
  dependencia_tipo_dependencia_id: number;

  @Input('dependencia_tipo_dependencia_id')
  set name(dependencia_tipo_dependencia_id: number) {
    this.dependencia_tipo_dependencia_id = dependencia_tipo_dependencia_id;
    this.loadDependenciaTipoDependencia();
  }

  @Output() eventChange = new EventEmitter();

  info_dependencia_tipo_dependencia: any;
  formDependenciaTipoDependencia: any;
  regDependenciaTipoDependencia: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formDependenciaTipoDependencia = FORM_DEPENDENCIA_TIPO_DEPENDENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsDependenciaId();
    this.loadOptionsTipoDependenciaId();
  }

  construirForm() {
    this.formDependenciaTipoDependencia.titulo = this.translate.instant('GLOBAL.dependencia_tipo_dependencia');
    this.formDependenciaTipoDependencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDependenciaTipoDependencia.campos.length; i++) {
      this.formDependenciaTipoDependencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formDependenciaTipoDependencia.campos[i].label_i18n);
      this.formDependenciaTipoDependencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formDependenciaTipoDependencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          dependenciaId = <Array<Dependencia>>res;
        }
        this.formDependenciaTipoDependencia.campos[ this.getIndexForm('DependenciaId') ].opciones = dependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_descuento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoDependenciaId(): void {
    let tipoDependenciaId: Array<any> = [];
    this.programaAcademico.get('tipo_dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoDependenciaId = <Array<TipoDependencia>>res;
        }
        this.formDependenciaTipoDependencia.campos[ this.getIndexForm('TipoDependenciaId') ].opciones = tipoDependenciaId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_descuento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDependenciaTipoDependencia.campos.length; index++) {
      const element = this.formDependenciaTipoDependencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDependenciaTipoDependencia(): void {
    if (this.dependencia_tipo_dependencia_id !== undefined && this.dependencia_tipo_dependencia_id !== 0) {
      this.programaAcademico.get('dependencia_tipo_dependencia/?query=Id:' + this.dependencia_tipo_dependencia_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <DependenciaTipoDependencia>res[0];
            this.programaAcademico.get('dependencia/' + this.element.DependenciaId.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.DependenciaId = <any>res2;
                this.programaAcademico.get('tipo_dependencia/' + this.element.TipoDependenciaId.Id).subscribe(res3 => {
                  if (res3 != null) {
                    this.element.TipoDependenciaId = <any>res3;
                  }
                  this.info_dependencia_tipo_dependencia = this.element;
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.tipo_dependencia_id'),
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
                    this.translate.instant('GLOBAL.dependencia_id'),
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
                this.translate.instant('GLOBAL.dependencia_tipo_dependencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_dependencia_tipo_dependencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateDependenciaTipoDependencia(dependenciaTipoDependencia: any): void {
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
        this.info_dependencia_tipo_dependencia = <any>dependenciaTipoDependencia;
        this.programaAcademico.put('dependencia_tipo_dependencia', this.info_dependencia_tipo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.dependencia_tipo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_dependencia_tipo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.dependencia_tipo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createDependenciaTipoDependencia(dependenciaTipoDependencia: any): void {
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
        this.info_dependencia_tipo_dependencia = <any>dependenciaTipoDependencia;
        this.programaAcademico.post('dependencia_tipo_dependencia', this.info_dependencia_tipo_dependencia)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.dependencia_tipo_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_dependencia_tipo_dependencia = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.dependencia_tipo_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadDependenciaTipoDependencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_dependencia_tipo_dependencia === undefined) {
        this.createDependenciaTipoDependencia(event.data.DependenciaTipoDependencia);
      } else {
        this.updateDependenciaTipoDependencia(event.data.DependenciaTipoDependencia);
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
