import { Lugar } from '../../../@core/data/models/lugar';
import { AtributoLugar } from '../../../@core/data/models/atributo_lugar';
import { ValorAtributoLugar } from './../../../@core/data/models/valor_atributo_lugar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_VALOR_ATRIBUTO_LUGAR } from './form-valor_atributo_lugar';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-valor-atributo-lugar',
  templateUrl: './crud-valor_atributo_lugar.component.html',
  styleUrls: ['./crud-valor_atributo_lugar.component.scss'],
})
export class CrudValorAtributoLugarComponent implements OnInit {
  config: ToasterConfig;
  valor_atributo_lugar_id: number;

  @Input('valor_atributo_lugar_id')
  set name(valor_atributo_lugar_id: number) {
    this.valor_atributo_lugar_id = valor_atributo_lugar_id;
    this.loadValorAtributoLugar();
  }

  @Output() eventChange = new EventEmitter();

  info_valor_atributo_lugar: any;
  formValorAtributoLugar: any;
  regValorAtributoLugar: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private ubicacionService: UbicacionService,
    private toasterService: ToasterService) {
    this.formValorAtributoLugar = FORM_VALOR_ATRIBUTO_LUGAR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsLugar();
    this.loadOptionsAtributoLugar();
  }

  construirForm() {
    this.formValorAtributoLugar.titulo = this.translate.instant('GLOBAL.valor_atributo_lugar');
    this.formValorAtributoLugar.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formValorAtributoLugar.campos.length; i++) {
      this.formValorAtributoLugar.campos[i].label = this.translate.instant('GLOBAL.' + this.formValorAtributoLugar.campos[i].label_i18n);
      this.formValorAtributoLugar.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formValorAtributoLugar.campos[i].label_i18n);
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
        this.formValorAtributoLugar.campos[ this.getIndexForm('Lugar') ].opciones = lugar;
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

  loadOptionsAtributoLugar(): void {
    let atributoLugar: Array<any> = [];
    this.ubicacionService.get('atributo_lugar/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          atributoLugar = <Array<AtributoLugar>>res;
        }
        this.formValorAtributoLugar.campos[ this.getIndexForm('AtributoLugar') ].opciones = atributoLugar;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.atributo_lugar'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formValorAtributoLugar.campos.length; index++) {
      const element = this.formValorAtributoLugar.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadValorAtributoLugar(): void {
    if (this.valor_atributo_lugar_id !== undefined && this.valor_atributo_lugar_id !== 0) {
      this.ubicacionService.get('valor_atributo_lugar/?query=Id:' + this.valor_atributo_lugar_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <ValorAtributoLugar>res[0];
            this.ubicacionService.get('atributo_lugar/' + this.element.AtributoLugar.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.AtributoLugar = <any>res2;
                this.ubicacionService.get('lugar/' + this.element.Lugar.Id).subscribe(res3 => {
                  if (res3 != null) {
                    this.element.Lugar = <any>res3;
                  }
                  this.info_valor_atributo_lugar = this.element;
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
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.atributo_lugar'),
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
                this.translate.instant('GLOBAL.valor_atributo_lugar'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_valor_atributo_lugar = undefined;
      this.clean = !this.clean;
    }
  }

  updateValorAtributoLugar(valorAtributoLugar: any): void {
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
        this.info_valor_atributo_lugar = <any>valorAtributoLugar;
        this.ubicacionService.put('valor_atributo_lugar', this.info_valor_atributo_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.valor_atributo_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_valor_atributo_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.valor_atributo_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createValorAtributoLugar(valorAtributoLugar: any): void {
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
        this.info_valor_atributo_lugar = <any>valorAtributoLugar;
        this.ubicacionService.post('valor_atributo_lugar', this.info_valor_atributo_lugar)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.valor_atributo_lugar') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_valor_atributo_lugar = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.valor_atributo_lugar'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadValorAtributoLugar();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_valor_atributo_lugar === undefined) {
        this.createValorAtributoLugar(event.data.ValorAtributoLugar);
      } else {
        this.updateValorAtributoLugar(event.data.ValorAtributoLugar);
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
