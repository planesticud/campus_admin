import { SubtipoProduccion } from './../../../@core/data/models/subtipo_produccion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { TipoProduccion } from '../../../@core/data/models/tipo_produccion';
import { FORM_SUBTIPO_PRODUCCION } from './form-subtipo_produccion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-subtipo-produccion',
  templateUrl: './crud-subtipo_produccion.component.html',
  styleUrls: ['./crud-subtipo_produccion.component.scss'],
})
export class CrudSubtipoProduccionComponent implements OnInit {
  config: ToasterConfig;
  subtipo_produccion_id: number;

  @Input('subtipo_produccion_id')
  set name(subtipo_produccion_id: number) {
    this.subtipo_produccion_id = subtipo_produccion_id;
    this.loadSubtipoProduccion();
  }

  @Output() eventChange = new EventEmitter();

  info_subtipo_produccion: SubtipoProduccion;
  formSubtipoProduccion: any;
  regSubtipoProduccion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private produccionService: ProduccionAcademicaService, private toasterService: ToasterService) {
    this.formSubtipoProduccion = FORM_SUBTIPO_PRODUCCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoProduccionId();
  }

  construirForm() {
    this.formSubtipoProduccion.titulo = this.translate.instant('GLOBAL.subtipo_produccion');
    this.formSubtipoProduccion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formSubtipoProduccion.campos.length; i++) {
      this.formSubtipoProduccion.campos[i].label = this.translate.instant('GLOBAL.' + this.formSubtipoProduccion.campos[i].label_i18n);
      this.formSubtipoProduccion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formSubtipoProduccion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formSubtipoProduccion.campos.length; index++) {
      const element = this.formSubtipoProduccion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsTipoProduccionId(): void {
    let tipoProduccion: Array<any> = [];
    this.produccionService.get('tipo_produccion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoProduccion = <Array<TipoProduccion>>res;
        }
        this.formSubtipoProduccion.campos[ this.getIndexForm('TipoProduccionId') ].opciones = tipoProduccion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.tipo_produccion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }


  public loadSubtipoProduccion(): void {
    if (this.subtipo_produccion_id !== undefined && this.subtipo_produccion_id !== 0) {
      this.produccionService.get('subtipo_produccion/?query=Id:' + this.subtipo_produccion_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            const subtipo = <SubtipoProduccion>res[0];
            this.produccionService.get('tipo_produccion/' + subtipo.TipoProduccionId.Id)
            .subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                subtipo.TipoProduccionId = <TipoProduccion>res2;
                this.info_subtipo_produccion = <SubtipoProduccion>subtipo;
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.tipo_produccion'),
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
    } else  {
      this.info_subtipo_produccion = undefined;
      this.clean = !this.clean;
    }
  }

  updateSubtipoProduccion(subtipoProduccion: any): void {
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
        this.info_subtipo_produccion = <SubtipoProduccion>subtipoProduccion;
        this.produccionService.put('subtipo_produccion', this.info_subtipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.subtipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_subtipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.subtipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createSubtipoProduccion(subtipoProduccion: any): void {
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
        this.info_subtipo_produccion = <SubtipoProduccion>subtipoProduccion;
        this.produccionService.post('subtipo_produccion', this.info_subtipo_produccion)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.subtipo_produccion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_subtipo_produccion = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.subtipo_produccion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadSubtipoProduccion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_subtipo_produccion === undefined) {
        this.createSubtipoProduccion(event.data.SubtipoProduccion);
      } else {
        this.updateSubtipoProduccion(event.data.SubtipoProduccion);
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
