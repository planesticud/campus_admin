import { SubtipoProduccion } from './../../../@core/data/models/subtipo_produccion';
import { TipoMetadato } from './../../../@core/data/models/tipo_metadato';
import { MetadatoSubtipoProduccion } from './../../../@core/data/models/metadato_subtipo_produccion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { FORM_METADATO_SUBTIPO_PRODUCCION } from './form-metadato_subtipo_produccion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-metadato-subtipo-produccion',
  templateUrl: './crud-metadato_subtipo_produccion.component.html',
  styleUrls: ['./crud-metadato_subtipo_produccion.component.scss'],
})
export class CrudMetadatoSubtipoProduccionComponent implements OnInit {
  config: ToasterConfig;
  metadato_subtipo_produccion_id: number;

  @Input('metadato_subtipo_produccion_id')
  set name(metadato_subtipo_produccion_id: number) {
    this.metadato_subtipo_produccion_id = metadato_subtipo_produccion_id;
    this.loadMetadatoSubtipoProduccion();
  }

  @Output() eventChange = new EventEmitter();

  info_metadato_subtipo_produccion: MetadatoSubtipoProduccion;
  formMetadatoSubtipoProduccion: any;
  regMetadatoSubtipoProduccion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private produccionService: ProduccionAcademicaService, private toasterService: ToasterService) {
    this.formMetadatoSubtipoProduccion = FORM_METADATO_SUBTIPO_PRODUCCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsSubtipoProduccionId();
    this.loadOptionsTipoMetadatoId();
  }

  construirForm() {
    this.formMetadatoSubtipoProduccion.titulo = this.translate.instant('GLOBAL.metadato_subtipo_produccion');
    this.formMetadatoSubtipoProduccion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formMetadatoSubtipoProduccion.campos.length; i++) {
      this.formMetadatoSubtipoProduccion.campos[i].label = this.translate.instant('GLOBAL.' + this.formMetadatoSubtipoProduccion.campos[i].label_i18n);
      this.formMetadatoSubtipoProduccion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formMetadatoSubtipoProduccion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formMetadatoSubtipoProduccion.campos.length; index++) {
      const element = this.formMetadatoSubtipoProduccion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsSubtipoProduccionId(): void {
    let subtipoProduccion: Array<any> = [];
    this.produccionService.get('subtipo_produccion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          subtipoProduccion = <Array<SubtipoProduccion>>res;
        }
        this.formMetadatoSubtipoProduccion.campos[ this.getIndexForm('SubtipoProduccionId') ].opciones = subtipoProduccion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.subtipo_produccion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoMetadatoId(): void {
    let tipoMetadato: Array<any> = [];
    this.produccionService.get('tipo_metadato/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoMetadato = <Array<TipoMetadato>>res;
        }
        this.formMetadatoSubtipoProduccion.campos[ this.getIndexForm('TipoMetadatoId') ].opciones = tipoMetadato;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_metadato'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadMetadatoSubtipoProduccion(): void {
    if (this.metadato_subtipo_produccion_id !== undefined && this.metadato_subtipo_produccion_id !== 0) {
      this.produccionService.get('metadato_subtipo_produccion/?query=Id:' + this.metadato_subtipo_produccion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const metadato = <MetadatoSubtipoProduccion>res[0];
            this.produccionService.get('subtipo_produccion/' + metadato.SubtipoProduccionId.Id)
              .subscribe(res2 => {
                if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                  metadato.SubtipoProduccionId = <SubtipoProduccion>res2;
                  this.produccionService.get('tipo_metadato/' + metadato.TipoMetadatoId.Id)
                    .subscribe(res3 => {
                      if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                        metadato.TipoMetadatoId = <TipoMetadato>res3;
                        this.info_metadato_subtipo_produccion = <MetadatoSubtipoProduccion>metadato;
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.tipo_metadato'),
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
                    this.translate.instant('GLOBAL.subtipo_produccion'),
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
                this.translate.instant('GLOBAL.metadato_subtipo_produccion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_metadato_subtipo_produccion = undefined;
      this.clean = !this.clean;
    }
  }

  updateMetadatoSubtipoProduccion(metadatoSubtipoProduccion: any): void {
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
        this.info_metadato_subtipo_produccion = <MetadatoSubtipoProduccion>metadatoSubtipoProduccion;
        this.produccionService.put('metadato_subtipo_produccion', this.info_metadato_subtipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.metadato_subtipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_metadato_subtipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.metadato_subtipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createMetadatoSubtipoProduccion(metadatoSubtipoProduccion: any): void {
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
        this.info_metadato_subtipo_produccion = <MetadatoSubtipoProduccion>metadatoSubtipoProduccion;
        this.produccionService.post('metadato_subtipo_produccion', this.info_metadato_subtipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.metadato_subtipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_metadato_subtipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.metadato_subtipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadMetadatoSubtipoProduccion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_metadato_subtipo_produccion === undefined) {
        this.createMetadatoSubtipoProduccion(event.data.MetadatoSubtipoProduccion);
      } else {
        this.updateMetadatoSubtipoProduccion(event.data.MetadatoSubtipoProduccion);
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
