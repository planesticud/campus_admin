import { Cargo } from '../../../@core/data/models/cargo';
import { RelacionCargo } from '../../../@core/data/models/relacion_cargo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_RELACION_CARGO } from './form-relacion_cargo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-relacion-cargo',
  templateUrl: './crud-relacion_cargo.component.html',
  styleUrls: ['./crud-relacion_cargo.component.scss'],
})
export class CrudRelacionCargoComponent implements OnInit {
  config: ToasterConfig;
  relacion_cargo_id: number;

  @Input('relacion_cargo_id')
  set name(relacion_cargo_id: number) {
    this.relacion_cargo_id = relacion_cargo_id;
    this.loadRelacionCargo();
  }

  @Output() eventChange = new EventEmitter();

  info_relacion_cargo: any;
  formRelacionCargo: any;
  regRelacionCargo: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private experienciaService: ExperienciaService,
    private toasterService: ToasterService) {
    this.formRelacionCargo = FORM_RELACION_CARGO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsCargo();
  }

  construirForm() {
    this.formRelacionCargo.titulo = this.translate.instant('GLOBAL.relacion_cargo');
    this.formRelacionCargo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRelacionCargo.campos.length; i++) {
      this.formRelacionCargo.campos[i].label = this.translate.instant('GLOBAL.' + this.formRelacionCargo.campos[i].label_i18n);
      this.formRelacionCargo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formRelacionCargo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsCargo(): void {
    let cargo: Array<any> = [];
    this.experienciaService.get('cargo/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          cargo = <Array<Cargo>>res;
        }
        this.formRelacionCargo.campos[ this.getIndexForm('CargoPadre') ].opciones = cargo;
        this.formRelacionCargo.campos[ this.getIndexForm('CargoHijo') ].opciones = cargo;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.cargo'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRelacionCargo.campos.length; index++) {
      const element = this.formRelacionCargo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRelacionCargo(): void {
    if (this.relacion_cargo_id !== undefined && this.relacion_cargo_id !== 0) {
      this.experienciaService.get('relacion_cargos/?query=Id:' + this.relacion_cargo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <RelacionCargo>res[0];
            this.experienciaService.get('cargo/' + this.element.CargoPadre.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.CargoPadre = <Cargo>res2;
                this.experienciaService.get('cargo/' + this.element.CargoHijo.Id).subscribe(res3 => {
                  if (res3 !== null) {
                    this.element.CargoHijo = <any>res3;
                  }
                  this.info_relacion_cargo = this.element;
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.cargo_hijo'),
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
                    this.translate.instant('GLOBAL.cargo_padre'),
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
                this.translate.instant('GLOBAL.relacion_cargo'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_relacion_cargo = undefined;
      this.clean = !this.clean;
    }
  }

  updateRelacionCargo(relacionCargo: any): void {
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
        this.info_relacion_cargo = <any>relacionCargo;
        this.experienciaService.put('relacion_cargos', this.info_relacion_cargo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.relacion_cargo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_relacion_cargo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.relacion_cargo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createRelacionCargo(relacionCargo: any): void {
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
        this.info_relacion_cargo = <any>relacionCargo;
        this.experienciaService.post('relacion_cargos', this.info_relacion_cargo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.relacion_cargo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_relacion_cargo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.relacion_cargo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadRelacionCargo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_relacion_cargo === undefined) {
        this.createRelacionCargo(event.data.RelacionCargo);
      } else {
        this.updateRelacionCargo(event.data.RelacionCargo);
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
