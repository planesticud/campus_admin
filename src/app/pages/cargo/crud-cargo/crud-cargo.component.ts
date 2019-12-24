import { Cargo } from './../../../@core/data/models/cargo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { FORM_CARGO } from './form-cargo';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-cargo',
  templateUrl: './crud-cargo.component.html',
  styleUrls: ['./crud-cargo.component.scss'],
})
export class CrudCargoComponent implements OnInit {
  config: ToasterConfig;
  cargo_id: number;

  @Input('cargo_id')
  set name(cargo_id: number) {
    this.cargo_id = cargo_id;
    this.loadCargo();
  }

  @Output() eventChange = new EventEmitter();

  info_cargo: Cargo;
  formCargo: any;
  regCargo: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private experienciaService: ExperienciaService,
    private toasterService: ToasterService) {
    this.formCargo = FORM_CARGO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
  }

  construirForm() {
    this.formCargo.titulo = this.translate.instant('GLOBAL.cargo');
    this.formCargo.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formCargo.campos.length; i++) {
      this.formCargo.campos[i].label = this.translate.instant('GLOBAL.' + this.formCargo.campos[i].label_i18n);
      this.formCargo.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formCargo.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formCargo.campos.length; index++) {
      const element = this.formCargo.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadCargo(): void {
    if (this.cargo_id !== undefined && this.cargo_id !== 0) {
      this.experienciaService.get('cargo/?query=Id:' + this.cargo_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_cargo = <Cargo>res[0];
          }
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
    } else  {
      this.info_cargo = undefined;
      this.clean = !this.clean;
    }
  }

  updateCargo(cargo: any): void {
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
        this.info_cargo = <Cargo>cargo;
        this.experienciaService.put('cargo', this.info_cargo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.cargo') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_cargo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.cargo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createCargo(cargo: any): void {
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
        this.info_cargo = <Cargo>cargo;
        this.experienciaService.post('cargo', this.info_cargo)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.cargo') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_cargo = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.cargo'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadCargo();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_cargo === undefined) {
        this.createCargo(event.data.Cargo);
      } else {
        this.updateCargo(event.data.Cargo);
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
