import { GrupoInvestigacion } from '../../../@core/data/models/grupo_investigacion';
import { LineaInvestigacion } from '../../../@core/data/models/linea_investigacion';
import { GrupoLineaInvestigacion } from './../../../@core/data/models/grupo_linea_investigacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreService } from '../../../@core/data/core.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_GRUPO_LINEA_INVESTIGACION } from './form-grupo_linea_investigacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-grupo-linea-investigacion',
  templateUrl: './crud-grupo_linea_investigacion.component.html',
  styleUrls: ['./crud-grupo_linea_investigacion.component.scss'],
})
export class CrudGrupoLineaInvestigacionComponent implements OnInit {
  config: ToasterConfig;
  grupo_linea_investigacion_id: number;

  @Input('grupo_linea_investigacion_id')
  set name(grupo_linea_investigacion_id: number) {
    this.grupo_linea_investigacion_id = grupo_linea_investigacion_id;
    this.loadGrupoLineaInvestigacion();
  }

  @Output() eventChange = new EventEmitter();

  info_grupo_linea_investigacion: any;
  formGrupoLineaInvestigacion: any;
  regGrupoLineaInvestigacion: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formGrupoLineaInvestigacion = FORM_GRUPO_LINEA_INVESTIGACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsGrupoInvestigacionId();
    this.loadOptionsLineaInvestigacionId();
  }

  construirForm() {
    this.formGrupoLineaInvestigacion.titulo = this.translate.instant('GLOBAL.grupo_linea_investigacion');
    this.formGrupoLineaInvestigacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formGrupoLineaInvestigacion.campos.length; i++) {
      this.formGrupoLineaInvestigacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formGrupoLineaInvestigacion.campos[i].label_i18n);
      this.formGrupoLineaInvestigacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formGrupoLineaInvestigacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsGrupoInvestigacionId(): void {
    let grupoInvestigacionId: Array<any> = [];
    this.coreService.get('grupo_investigacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          grupoInvestigacionId = <Array<GrupoInvestigacion>>res;
        }
        this.formGrupoLineaInvestigacion.campos[ this.getIndexForm('GrupoInvestigacionId') ].opciones = grupoInvestigacionId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.grupo_investigacion_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsLineaInvestigacionId(): void {
    let lineaInvestigacionId: Array<any> = [];
    this.coreService.get('linea_investigacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          lineaInvestigacionId = <Array<LineaInvestigacion>>res;
        }
        this.formGrupoLineaInvestigacion.campos[ this.getIndexForm('LineaInvestigacionId') ].opciones = lineaInvestigacionId;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.linea_investigacion_id'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formGrupoLineaInvestigacion.campos.length; index++) {
      const element = this.formGrupoLineaInvestigacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadGrupoLineaInvestigacion(): void {
    if (this.grupo_linea_investigacion_id !== undefined && this.grupo_linea_investigacion_id !== 0) {
      this.coreService.get('linea_investigacion_grupo_investigacion/?query=Id:' + this.grupo_linea_investigacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <GrupoLineaInvestigacion>res[0];
            this.coreService.get('grupo_investigacion/' + this.element.GrupoInvestigacionId).subscribe(res2 => {
              if (res2 !== null) {
                this.element.GrupoInvestigacionId = <any>res2;
                this.coreService.get('linea_investigacion/' + this.element.LineaInvestigacionId).subscribe(res3 => {
                  if (res3 != null) {
                    this.element.LineaInvestigacionId = <any>res3;
                  }
                  this.info_grupo_linea_investigacion = this.element;
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.linea_investigacion_id'),
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
                    this.translate.instant('GLOBAL.grupo_investigacion_id'),
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
                this.translate.instant('GLOBAL.grupo_linea_investigacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_grupo_linea_investigacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateGrupoLineaInvestigacion(grupoLineaInvestigacion: any): void {
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
        this.info_grupo_linea_investigacion = <any>grupoLineaInvestigacion;
        this.coreService.put('linea_investigacion_grupo_investigacion', this.info_grupo_linea_investigacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.grupo_linea_investigacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_grupo_linea_investigacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.grupo_linea_investigacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createGrupoLineaInvestigacion(grupoLineaInvestigacion: any): void {
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
        this.info_grupo_linea_investigacion = <any>grupoLineaInvestigacion;
        this.coreService.post('linea_investigacion_grupo_investigacion', this.info_grupo_linea_investigacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.grupo_linea_investigacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_grupo_linea_investigacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.grupo_linea_investigacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadGrupoLineaInvestigacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_grupo_linea_investigacion === undefined) {
        this.createGrupoLineaInvestigacion(event.data.GrupoLineaInvestigacion);
      } else {
        this.updateGrupoLineaInvestigacion(event.data.GrupoLineaInvestigacion);
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
