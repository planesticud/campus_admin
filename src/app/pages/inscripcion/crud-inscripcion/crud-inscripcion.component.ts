import { EstadoInscripcion } from './../../../@core/data/models/estado_inscripcion';
import { TipoInscripcion } from './../../../@core/data/models/tipo_inscripcion';
import { Enfasis } from './../../../@core/data/models/enfasis';
import { Periodo } from './../../../@core/data/models/periodo';
import { Inscripcion } from './../../../@core/data/models/inscripcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { CoreService } from '../../../@core/data/core.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { FORM_INSCRIPCION } from './form-inscripcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-inscripcion',
  templateUrl: './crud-inscripcion.component.html',
  styleUrls: ['./crud-inscripcion.component.scss'],
})
export class CrudInscripcionComponent implements OnInit {
  config: ToasterConfig;
  inscripcion_id: number;

  @Input('inscripcion_id')
  set name(inscripcion_id: number) {
    this.inscripcion_id = inscripcion_id;
    this.loadInscripcion();
  }

  @Output() eventChange = new EventEmitter();

  info_inscripcion: Inscripcion;
  formInscripcion: any;
  regInscripcion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private inscripcionesService: InscripcionService,
    private coreService: CoreService,
    private programaAcademico: ProgramaAcademicoService,
    private toasterService: ToasterService) {
    this.formInscripcion = FORM_INSCRIPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEstadoInscripcion();
    this.loadOptionsTipoInscripcion();
    this.loadOptionsEnfasis();
    this.loadOptionsPeriodo();
   }

  construirForm() {
    this.formInscripcion.titulo = this.translate.instant('GLOBAL.inscripcion');
    this.formInscripcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInscripcion.campos.length; i++) {
      this.formInscripcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formInscripcion.campos[i].label_i18n);
      this.formInscripcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formInscripcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsPeriodo(): void {
    let periodo: Array<any> = [];
      this.coreService.get('periodo/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            periodo = <Array<Periodo>>res;
          }
          this.formInscripcion.campos[ this.getIndexForm('PeriodoId') ].opciones = periodo;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.periodo_academico'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  loadOptionsEstadoInscripcion(): void {
    let estadoInscripcion: Array<any> = [];
      this.inscripcionesService.get('estado_inscripcion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            estadoInscripcion = <Array<EstadoInscripcion>>res;
          }
          this.formInscripcion.campos[ this.getIndexForm('EstadoInscripcionId') ].opciones = estadoInscripcion;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.estado_inscripcion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  loadOptionsTipoInscripcion(): void {
    let tipoInscripcion: Array<any> = [];
      this.inscripcionesService.get('tipo_inscripcion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            tipoInscripcion = <Array<TipoInscripcion>>res;
          }
          this.formInscripcion.campos[ this.getIndexForm('TipoInscripcionId') ].opciones = tipoInscripcion;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.tipo_inscripcion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  loadOptionsEnfasis(): void {
    let enfasis: Array<any> = [];
      this.programaAcademico.get('enfasis/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            enfasis = <Array<Enfasis>>res;
          }
          this.formInscripcion.campos[ this.getIndexForm('EnfasisId') ].opciones = enfasis;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.enfasis'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formInscripcion.campos.length; index++) {
      const element = this.formInscripcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadInscripcion(): void {
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0) {
      this.inscripcionesService.get('inscripcion/?query=id:' + this.inscripcion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_inscripcion = <Inscripcion>res[0];
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.inscripcion'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else  {
      this.info_inscripcion = undefined;
      this.clean = !this.clean;
    }
  }

  updateInscripcion(inscripcion: any): void {
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
        this.info_inscripcion = <Inscripcion>inscripcion;
        this.inscripcionesService.put('inscripcion', this.info_inscripcion)
          .subscribe(res => {
            this.loadInscripcion();
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
              this.translate.instant('GLOBAL.inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarActualizar'));
            this.info_inscripcion = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                  this.translate.instant('GLOBAL.inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  createInscripcion(inscripcion: any): void {
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
        this.info_inscripcion = <Inscripcion>inscripcion;
        this.inscripcionesService.post('inscripcion', this.info_inscripcion)
          .subscribe(res => {
            this.info_inscripcion = <Inscripcion>res;
            this.eventChange.emit(true);
            this.showToast('info', this.translate.instant('GLOBAL.crear'),
              this.translate.instant('GLOBAL.inscripcion') + ' ' +
              this.translate.instant('GLOBAL.confirmarCrear'));
            this.info_inscripcion = undefined;
            this.clean = !this.clean;
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.inscripcion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  ngOnInit() {
    this.loadInscripcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_inscripcion === undefined) {
        this.createInscripcion(event.data.Inscripcion);
      } else {
        this.updateInscripcion(event.data.Inscripcion);
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
