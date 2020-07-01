import { Lugar } from '../../../@core/data/models/lugar';
import { RelacionLugar } from '../../../@core/data/models/relacion_lugar';
import { TipoRelacionLugar } from '../../../@core/data/models/tipo_relacion_lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_RELACION_LUGAR } from './form-relacion_lugar';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-relacion-lugar',
  templateUrl: './crud-relacion_lugar.component.html',
  styleUrls: ['./crud-relacion_lugar.component.scss'],
})
export class CrudRelacionLugarComponent implements OnInit {
  config: ToasterConfig;
  relacion_lugar_id: number;

  @Input('relacion_lugar_id')
  set name(relacion_lugar_id: number) {
    this.relacion_lugar_id = relacion_lugar_id;
    this.loadRelacionLugar();
  }

  @Output() eventChange = new EventEmitter();

  info_relacion_lugar: any;
  formRelacionLugar: any;
  regRelacionLugar: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private ubicacionService: UbicacionService,
    private toasterService: ToasterService) {
    this.formRelacionLugar = FORM_RELACION_LUGAR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsLugar();
    this.loadOptionsTipoRelacionLugar();
  }

  construirForm() {
    this.formRelacionLugar.titulo = this.translate.instant('GLOBAL.relacion_lugar');
    this.formRelacionLugar.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRelacionLugar.campos.length; i++) {
      this.formRelacionLugar.campos[i].label = this.translate.instant('GLOBAL.' + this.formRelacionLugar.campos[i].label_i18n);
      this.formRelacionLugar.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRelacionLugar.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsLugar(): void {
    let lugar: Array<any> = [];
    this.ubicacionService.get('lugar/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          lugar = <Array<Lugar>>res;
        }
        this.formRelacionLugar.campos[ this.getIndexForm('LugarPadre') ].opciones = lugar;
        this.formRelacionLugar.campos[ this.getIndexForm('LugarHijo') ].opciones = lugar;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.lugar'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoRelacionLugar(): void {
    let tipoRelacionLugar: Array<any> = [];
    this.ubicacionService.get('tipo_relacion_lugar/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoRelacionLugar = <Array<TipoRelacionLugar>>res;
        }
        this.formRelacionLugar.campos[ this.getIndexForm('TipoRelacionLugar') ].opciones = tipoRelacionLugar;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_relacion_lugar'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRelacionLugar.campos.length; index++) {
      const element = this.formRelacionLugar.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRelacionLugar(): void {
    if (this.relacion_lugar_id !== undefined && this.relacion_lugar_id !== 0) {
      this.ubicacionService.get('relacion_lugares/?query=Id:' + this.relacion_lugar_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <RelacionLugar>res[0];
            this.ubicacionService.get('lugar/' + this.element.LugarPadre.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                this.element.LugarPadre = <Lugar>res2;
                this.ubicacionService.get('lugar/' + this.element.LugarHijo.Id).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.element.LugarHijo = <any>res3;
                    this.ubicacionService.get('tipo_relacion_lugar/' + this.element.TipoRelacionLugar.Id).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        this.element.TipoRelacionLugar = <any>res4;
                      }
                      this.info_relacion_lugar = this.element;
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.tipo_relacion_lugar'),
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
                        this.translate.instant('GLOBAL.lugar_hijo'),
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
                    this.translate.instant('GLOBAL.lugar_padre'),
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
                this.translate.instant('GLOBAL.relacion_lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_relacion_lugar = undefined;
      this.clean = !this.clean;
    }
  }

  updateRelacionLugar(relacionLugar: any): void {
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
        this.info_relacion_lugar = <any>relacionLugar;
        this.ubicacionService.put('relacion_lugares', this.info_relacion_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.relacion_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_relacion_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.relacion_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRelacionLugar(relacionLugar: any): void {
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
        this.info_relacion_lugar = <any>relacionLugar;
        this.ubicacionService.post('relacion_lugares', this.info_relacion_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.relacion_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_relacion_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.relacion_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRelacionLugar();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_relacion_lugar === undefined) {
        this.createRelacionLugar(event.data.RelacionLugar);
      } else {
        this.updateRelacionLugar(event.data.RelacionLugar);
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
