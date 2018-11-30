import { TipoDescuentoMatricula } from '../../../@core/data/models/tipo_descuento_matricula';
import { DescuentoMatricula } from '../../../@core/data/models/descuento_matricula';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatriculaDescuentosService } from '../../../@core/data/matricula_descuentos.service';
import { FORM_DESCUENTO_MATRICULA } from './form-descuento_matricula';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-descuento-matricula',
  templateUrl: './crud-descuento_matricula.component.html',
  styleUrls: ['./crud-descuento_matricula.component.scss'],
})
export class CrudDescuentoMatriculaComponent implements OnInit {
  config: ToasterConfig;
  descuento_matricula_id: number;

  @Input('descuento_matricula_id')
  set name(descuento_matricula_id: number) {
    this.descuento_matricula_id = descuento_matricula_id;
    this.loadDescuentoMatricula();
  }

  @Output() eventChange = new EventEmitter();

  info_descuento_matricula: DescuentoMatricula;
  formDescuentoMatricula: any;
  regDescuentoMatricula: any;
  clean: boolean;

  constructor(private translate: TranslateService, private matriculaDescuentosService: MatriculaDescuentosService, private toasterService: ToasterService) {
    this.formDescuentoMatricula = FORM_DESCUENTO_MATRICULA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsIdTipoDescuentoMatricula();
   }

  construirForm() {
    this.formDescuentoMatricula.titulo = this.translate.instant('GLOBAL.descuento_matricula');
    this.formDescuentoMatricula.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDescuentoMatricula.campos.length; i++) {
      this.formDescuentoMatricula.campos[i].label = this.translate.instant('GLOBAL.' + this.formDescuentoMatricula.campos[i].label_i18n);
      this.formDescuentoMatricula.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formDescuentoMatricula.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsIdTipoDescuentoMatricula(): void {
    let idTipoDescuentoMatricula: Array<any> = [];
      this.matriculaDescuentosService.get('tipo_descuento_matricula/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            idTipoDescuentoMatricula = <Array<TipoDescuentoMatricula>>res;
          }
          this.formDescuentoMatricula.campos[ this.getIndexForm('IdTipoDescuentoMatricula') ].opciones = idTipoDescuentoMatricula;
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDescuentoMatricula.campos.length; index++) {
      const element = this.formDescuentoMatricula.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDescuentoMatricula(): void {
    if (this.descuento_matricula_id !== undefined && this.descuento_matricula_id !== 0) {
      this.matriculaDescuentosService.get('descuento_matricula/?query=id:' + this.descuento_matricula_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_descuento_matricula = <DescuentoMatricula>res[0];
          }
        },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else  {
      this.info_descuento_matricula = undefined;
      this.clean = !this.clean;
    }
  }

  updateDescuentoMatricula(descuentoMatricula: any): void {
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
        this.info_descuento_matricula = <DescuentoMatricula>descuentoMatricula;
        this.matriculaDescuentosService.put('descuento_matricula', this.info_descuento_matricula)
          .subscribe(res => {
            this.loadDescuentoMatricula();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
            this.translate.instant('GLOBAL.descuento_matricula') + ' ' +
            this.translate.instant('GLOBAL.confirmarActualizar'));
          },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  createDescuentoMatricula(descuentoMatricula: any): void {
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
        this.info_descuento_matricula = <DescuentoMatricula>descuentoMatricula;
        this.matriculaDescuentosService.post('descuento_matricula', this.info_descuento_matricula)
          .subscribe(res => {
            this.info_descuento_matricula = <DescuentoMatricula>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
            this.translate.instant('GLOBAL.descuento_matricula') + ' ' +
            this.translate.instant('GLOBAL.confirmarCrear'));
          },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  ngOnInit() {
    this.loadDescuentoMatricula();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_descuento_matricula === undefined) {
        this.createDescuentoMatricula(event.data.DescuentoMatricula);
      } else {
        this.updateDescuentoMatricula(event.data.DescuentoMatricula);
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
