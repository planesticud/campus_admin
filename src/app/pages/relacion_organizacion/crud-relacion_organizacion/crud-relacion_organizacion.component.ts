import { Organizacion } from '../../../@core/data/models/organizacion';
import { RelacionOrganizacion } from '../../../@core/data/models/relacion_organizacion';
import { TipoRelacionOrganizacion } from '../../../@core/data/models/tipo_relacion_organizacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_RELACION_ORGANIZACION } from './form-relacion_organizacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-relacion-organizacion',
  templateUrl: './crud-relacion_organizacion.component.html',
  styleUrls: ['./crud-relacion_organizacion.component.scss'],
})
export class CrudRelacionOrganizacionComponent implements OnInit {
  config: ToasterConfig;
  relacion_organizacion_id: number;

  @Input('relacion_organizacion_id')
  set name(relacion_organizacion_id: number) {
    this.relacion_organizacion_id = relacion_organizacion_id;
    this.loadRelacionOrganizacion();
  }

  @Output() eventChange = new EventEmitter();

  info_relacion_organizacion: any;
  formRelacionOrganizacion: any;
  regRelacionOrganizacion: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private organizacionService: OrganizacionService,
    private toasterService: ToasterService) {
    this.formRelacionOrganizacion = FORM_RELACION_ORGANIZACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsOrganizacion();
    this.loadOptionsTipoRelacionOrganizacion();
  }

  construirForm() {
    this.formRelacionOrganizacion.titulo = this.translate.instant('GLOBAL.relacion_organizacion');
    this.formRelacionOrganizacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRelacionOrganizacion.campos.length; i++) {
      this.formRelacionOrganizacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formRelacionOrganizacion.campos[i].label_i18n);
      this.formRelacionOrganizacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRelacionOrganizacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsOrganizacion(): void {
    let organizacion: Array<any> = [];
    this.organizacionService.get('organizacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          organizacion = <Array<Organizacion>>res;
        }
        this.formRelacionOrganizacion.campos[ this.getIndexForm('OrganizacionPadre') ].opciones = organizacion;
        this.formRelacionOrganizacion.campos[ this.getIndexForm('OrganizacionHija') ].opciones = organizacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.organizacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoRelacionOrganizacion(): void {
    let tipoRelacionOrganizacion: Array<any> = [];
    this.organizacionService.get('tipo_relacion_organizaciones/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoRelacionOrganizacion = <Array<TipoRelacionOrganizacion>>res;
        }
        this.formRelacionOrganizacion.campos[ this.getIndexForm('TipoRelacionOrganizaciones') ].opciones = tipoRelacionOrganizacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRelacionOrganizacion.campos.length; index++) {
      const element = this.formRelacionOrganizacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRelacionOrganizacion(): void {
    if (this.relacion_organizacion_id !== undefined && this.relacion_organizacion_id !== 0) {
      this.organizacionService.get('relacion_organizaciones/?query=Id:' + this.relacion_organizacion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <RelacionOrganizacion>res[0];
            this.organizacionService.get('organizacion/' + this.element.OrganizacionPadre).subscribe(res2 => {
              if (res2 !== null) {
                this.element.OrganizacionPadre = <Organizacion>res2;
                this.organizacionService.get('organizacion/' + this.element.OrganizacionHija).subscribe(res3 => {
                  if (res3 !== null) {
                    this.element.OrganizacionHija = <any>res3;
                    this.organizacionService.get('tipo_relacion_organizaciones/' + this.element.TipoRelacionOrganizaciones.Id).subscribe(res4 => {
                      if (res4 != null) {
                        this.element.TipoRelacionOrganizaciones = <any>res4;
                      }
                      this.info_relacion_organizacion = this.element;
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
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
                        this.translate.instant('GLOBAL.organizacion_hijo'),
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
                    this.translate.instant('GLOBAL.organizacion_padre'),
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
                this.translate.instant('GLOBAL.relacion_organizacion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_relacion_organizacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateRelacionOrganizacion(relacionOrganizacion: any): void {
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
        this.info_relacion_organizacion = <any>relacionOrganizacion;
        this.organizacionService.put('relacion_organizaciones', this.info_relacion_organizacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.relacion_organizacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_relacion_organizacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.relacion_organizacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRelacionOrganizacion(relacionOrganizacion: any): void {
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
        this.info_relacion_organizacion = <any>relacionOrganizacion;
        this.organizacionService.post('relacion_organizaciones', this.info_relacion_organizacion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.relacion_organizacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_relacion_organizacion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.relacion_organizacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRelacionOrganizacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_relacion_organizacion === undefined) {
        this.createRelacionOrganizacion(event.data.RelacionOrganizacion);
      } else {
        this.updateRelacionOrganizacion(event.data.RelacionOrganizacion);
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
