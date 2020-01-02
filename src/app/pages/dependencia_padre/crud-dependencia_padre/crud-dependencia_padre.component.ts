import { Dependencia } from '../../../@core/data/models/dependencia';
import { DependenciaPadre } from './../../../@core/data/models/dependencia_padre';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_DEPENDENCIA_PADRE } from './form-dependencia_padre';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-dependencia-padre',
  templateUrl: './crud-dependencia_padre.component.html',
  styleUrls: ['./crud-dependencia_padre.component.scss'],
})
export class CrudDependenciaPadreComponent implements OnInit {
  config: ToasterConfig;
  dependencia_padre_id: number;

  @Input('dependencia_padre_id')
  set name(dependencia_padre_id: number) {
    this.dependencia_padre_id = dependencia_padre_id;
    this.loadDependenciaPadre();
  }

  @Output() eventChange = new EventEmitter();

  info_dependencia_padre: any;
  formDependenciaPadre: any;
  regDependenciaPadre: any;
  clean: boolean;
  element: any;

  constructor(private translate: TranslateService,
    private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formDependenciaPadre = FORM_DEPENDENCIA_PADRE;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsPadreId();
    this.loadOptionsHijaId();
  }

  construirForm() {
    this.formDependenciaPadre.titulo = this.translate.instant('GLOBAL.dependencia_padre');
    this.formDependenciaPadre.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDependenciaPadre.campos.length; i++) {
      this.formDependenciaPadre.campos[i].label = this.translate.instant('GLOBAL.' + this.formDependenciaPadre.campos[i].label_i18n);
      this.formDependenciaPadre.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formDependenciaPadre.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsPadreId(): void {
    let padreId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          padreId = <Array<Dependencia>>res;
        }
        this.formDependenciaPadre.campos[ this.getIndexForm('PadreId') ].opciones = padreId;
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

  loadOptionsHijaId(): void {
    let hijaId: Array<any> = [];
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          hijaId = <Array<Dependencia>>res;
        }
        this.formDependenciaPadre.campos[ this.getIndexForm('HijaId') ].opciones = hijaId;
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
    for (let index = 0; index < this.formDependenciaPadre.campos.length; index++) {
      const element = this.formDependenciaPadre.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadDependenciaPadre(): void {
    if (this.dependencia_padre_id !== undefined && this.dependencia_padre_id !== 0) {
      this.programaAcademico.get('dependencia_padre/?query=Id:' + this.dependencia_padre_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.element = <DependenciaPadre>res[0];
            this.element.PadreId = this.element.Padre;
            this.element.HijaId = this.element.Hija;
            this.programaAcademico.get('dependencia/' + this.element.PadreId.Id).subscribe(res2 => {
              if (res2 !== null) {
                this.element.PadreId = <any>res2;
                this.programaAcademico.get('dependencia/' + this.element.HijaId.Id).subscribe(res3 => {
                  if (res3 != null) {
                    this.element.HijaId = <any>res3;
                  }
                  this.info_dependencia_padre = this.element;
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.hija_id'),
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
                    this.translate.instant('GLOBAL.padre_id'),
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
                this.translate.instant('GLOBAL.dependencia_padre'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_dependencia_padre = undefined;
      this.clean = !this.clean;
    }
  }

  updateDependenciaPadre(dependenciaPadre: any): void {
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
        this.info_dependencia_padre = <any>dependenciaPadre;
        this.info_dependencia_padre.PadreId = this.info_dependencia_padre.PadreId.Id;
        this.info_dependencia_padre.HijaId = this.info_dependencia_padre.HijaId.Id;
        this.info_dependencia_padre.Padre = this.info_dependencia_padre.PadreId;
        this.info_dependencia_padre.Hija = this.info_dependencia_padre.HijaId;
        this.programaAcademico.put('dependencia_padre', this.info_dependencia_padre)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.dependencia_padre') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_dependencia_padre = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.dependencia_padre'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createDependenciaPadre(dependenciaPadre: any): void {
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
        this.info_dependencia_padre = <any>dependenciaPadre;
        this.info_dependencia_padre.PadreId = this.info_dependencia_padre.PadreId.Id;
        this.info_dependencia_padre.HijaId = this.info_dependencia_padre.HijaId.Id;
        this.info_dependencia_padre.Padre = this.info_dependencia_padre.PadreId;
        this.info_dependencia_padre.Hija = this.info_dependencia_padre.HijaId;
        this.programaAcademico.post('dependencia_padre', this.info_dependencia_padre)
          .subscribe(res => {
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.dependencia_padre') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_dependencia_padre = undefined;
            this.clean = !this.clean;
            this.eventChange.emit(true);
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.dependencia_padre'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadDependenciaPadre();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_dependencia_padre === undefined) {
        this.createDependenciaPadre(event.data.DependenciaPadre);
      } else {
        this.updateDependenciaPadre(event.data.DependenciaPadre);
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
