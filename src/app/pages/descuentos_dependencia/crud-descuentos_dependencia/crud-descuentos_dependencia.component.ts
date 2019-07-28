import { TipoDescuento } from './../../../@core/data/models/tipo_descuento';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { DescuentosDependencia } from './../../../@core/data/models/descuentos_dependencia';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
// import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_DESCUENTOS_DEPENDENCIA } from './form-descuentos_dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-descuentos-dependencia',
  templateUrl: './crud-descuentos_dependencia.component.html',
  styleUrls: ['./crud-descuentos_dependencia.component.scss'],
})
export class CrudDescuentosDependenciaComponent implements OnInit {
  config: ToasterConfig;
  descuentos_dependencia_id: number;

  @Input('descuentos_dependencia_id')
  set name(descuentos_dependencia_id: number) {
    this.descuentos_dependencia_id = descuentos_dependencia_id;
    this.loadDescuentosDependencia();
  }

  @Output() eventChange = new EventEmitter();

  info_descuentos_dependencia: DescuentosDependencia;
  formDescuentosDependencia: any;
  regDescuentosDependencia: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaAcademicoService,
    // private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formDescuentosDependencia = FORM_DESCUENTOS_DEPENDENCIA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoDescuentoId();
    this.loadOptionsDependenciaId();
  }

  construirForm() {
    this.formDescuentosDependencia.titulo = this.translate.instant('GLOBAL.descuentos_dependencia');
    this.formDescuentosDependencia.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDescuentosDependencia.campos.length; i++) {
      this.formDescuentosDependencia.campos[i].label = this.translate.instant('GLOBAL.' + this.formDescuentosDependencia.campos[i].label_i18n);
      this.formDescuentosDependencia.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formDescuentosDependencia.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoDescuentoId(): void {
    let tipoDescuentoId: Array<any> = [];
      this.descuentosService.get('tipo_descuento/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipoDescuentoId = <Array<TipoDescuento>>res;
          }
          this.formDescuentosDependencia.campos[ this.getIndexForm('TipoDescuentoId') ].opciones = tipoDescuentoId;
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

  loadOptionsDependenciaId(): void {
    let dependenciaId: Array<any> = [];
    this.programaAcademico.get('programa_academico/?limit=9')
      .subscribe(res => {
        if (res !== null) {
          dependenciaId = <Array<ProgramaAcademico>>res;
        }
        this.formDescuentosDependencia.campos[ this.getIndexForm('DependenciaId') ].opciones = dependenciaId;
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
    for (let index = 0; index < this.formDescuentosDependencia.campos.length; index++) {
      const element = this.formDescuentosDependencia.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDescuentosDependencia(): void {
    if (this.descuentos_dependencia_id !== undefined && this.descuentos_dependencia_id !== 0) {
      this.descuentosService.get('descuentos_dependencia/?query=id:' + this.descuentos_dependencia_id)
        .subscribe(res => {
          if (res !== null) {
            this.element = <DescuentosDependencia>res[0];
            this.descuentosService.get('tipo_descuento/' + this.element.TipoDescuentoId.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.TipoDescuentoId = <any>res2;
                this.programaAcademico.get('programa_academico/' + this.element.DependenciaId).subscribe(res3 => {
                  if (res3 != null) {
                    this.element.DependenciaId = <any>res3;
                  }
                  this.info_descuentos_dependencia = this.element;
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
                    this.translate.instant('GLOBAL.tipo_descuento'),
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
                this.translate.instant('GLOBAL.descuentos_dependencia'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_descuentos_dependencia = undefined;
      this.clean = !this.clean;
    }
  }

  updateDescuentosDependencia(descuentosDependencia: any): void {
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
        this.info_descuentos_dependencia = <DescuentosDependencia>descuentosDependencia;
        this.info_descuentos_dependencia.DependenciaId = this.info_descuentos_dependencia.DependenciaId.Id;
        this.descuentosService.put('descuentos_dependencia', this.info_descuentos_dependencia)
          .subscribe(res => {
            this.loadDescuentosDependencia();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.descuentos_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_descuentos_dependencia = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.descuentos_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createDescuentosDependencia(descuentosDependencia: any): void {
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
        this.info_descuentos_dependencia = <DescuentosDependencia>descuentosDependencia;
        this.info_descuentos_dependencia.DependenciaId = this.info_descuentos_dependencia.DependenciaId.Id;
        this.descuentosService.post('descuentos_dependencia', this.info_descuentos_dependencia)
          .subscribe(res => {
            this.info_descuentos_dependencia = <DescuentosDependencia>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.descuentos_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_descuentos_dependencia = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.descuentos_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadDescuentosDependencia();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_descuentos_dependencia === undefined) {
        this.createDescuentosDependencia(event.data.DescuentosDependencia);
      } else {
        this.updateDescuentosDependencia(event.data.DescuentosDependencia);
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
