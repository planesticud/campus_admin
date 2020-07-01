import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FORM_EXAMEN_IDIOMAS } from './form-idioma';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { CoreService } from '../../../@core/data/core.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
import { Idioma } from '../../../@core/data/models/idioma';

@Component({
  selector: 'ngx-crud-idioma-listado',
  templateUrl: './crud-idioma.component.html',
  styleUrls: ['./crud-idioma.component.scss'],
})
export class CrudIdiomaComponent implements OnInit {
  config: ToasterConfig;
  inscripcion_id: number;
  info_idioma: any;
  formInfoIdioma: any;
  regInfoIdioma: any;
  clean: boolean;
  temp: any;
  loading: boolean;

  @Input('inscripcion_id')
  set admision(inscripcion_id: number) {
    if (inscripcion_id !== undefined && inscripcion_id !== 0 && inscripcion_id.toString() !== '') {
      this.inscripcion_id = inscripcion_id;
      this.cargarIdiomaExamen();
    }
  }

  @Output() eventChange = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private idiomaService: IdiomaService,
    private inscripcionService: InscripcionService,
    private coreService: CoreService,
    private personaService: CampusMidService,
    private programaService: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formInfoIdioma = FORM_EXAMEN_IDIOMAS;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsIdiomas();
    this.loading = false;
  }

  construirForm() {
    this.formInfoIdioma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInfoIdioma.campos.length; i++) {
      this.formInfoIdioma.campos[i].label = this.translate.instant('GLOBAL.' + this.formInfoIdioma.campos[i].label_i18n);
      this.formInfoIdioma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formInfoIdioma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsIdiomas(): void {
    let idioma: Array<any> = [];
    this.idiomaService.get('idioma/?query=Activo:true&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          idioma = <Array<Idioma>>res;
        }
        this.formInfoIdioma.campos[this.getIndexForm('Idioma')].opciones = idioma;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.idiomas') + '|' +
              this.translate.instant('GLOBAL.idioma'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formInfoIdioma.campos.length; index++) {
      const element = this.formInfoIdioma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public cargarIdiomaExamen(): void {
    this.loading = true;
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0 &&
      this.inscripcion_id.toString() !== '') {
      this.inscripcionService.get('inscripcion_posgrado?query=Id:' + this.inscripcion_id)
      .subscribe(ins_pos => {
        if (ins_pos !== null && JSON.stringify(ins_pos).toString() !== '[{}]') {
          const posgrado = <any>ins_pos[0];
          this.personaService.get('inscripcion/' + posgrado.InscripcionId.Id).subscribe(persona => {
            if (persona !== null && JSON.stringify(persona).toString() !== '[{}]') {
              const personadata = <any>persona;
              posgrado.PersonaId = personadata.PersonaId.PrimerApellido.toUpperCase() + ' ' +
                personadata.PersonaId.SegundoApellido.toUpperCase() + ' ' +
                personadata.PersonaId.PrimerNombre.toUpperCase() + ' ' +
                personadata.PersonaId.SegundoNombre.toUpperCase();
              posgrado.IdentificacionId = personadata.PersonaId.TipoIdentificacion.CodigoAbreviacion +
                ' ' + personadata.PersonaId.NumeroDocumento;
              this.programaService.get('dependencia/' + posgrado.InscripcionId.ProgramaAcademicoId)
                .subscribe(res3 => {
                if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                  const programa = <any>res3;
                  posgrado.ProgramaAcademicoId = programa.Nombre;
                  this.coreService.get('periodo/' + posgrado.InscripcionId.PeriodoId)
                    .subscribe(res4 => {
                    if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                      const periodo = <any>res4;
                      posgrado.PeriodoId = periodo.Nombre;
                      if (periodo.Activo.toString() !== 'true') {
                        for (let i = 0; i < this.formInfoIdioma.campos.length; i++) {
                          this.formInfoIdioma.campos[i].deshabilitar = true;
                        }
                      }

                      this.idiomaService.get('idioma/' + posgrado.Idioma)
                        .subscribe(res5 => {
                        if (res5 !== null && JSON.stringify(res5).toString() !== '[{}]') {
                          posgrado.Idioma = <Idioma>res5;
                          this.info_idioma = posgrado;
                          this.loading = false;
                        }
                      },
                        (error: HttpErrorResponse) => {
                          Swal({
                            type: 'error',
                            title: error.status + '',
                            text: this.translate.instant('ERROR.' + error.status),
                            footer: this.translate.instant('GLOBAL.cargar') + '-' +
                              this.translate.instant('GLOBAL.idioma'),
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
                          this.translate.instant('GLOBAL.periodo_id'),
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
                      this.translate.instant('GLOBAL.programa_academico'),
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
                  this.translate.instant('GLOBAL.inscripcion') + '|' +
                  this.translate.instant('GLOBAL.aspirante'),
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
              this.translate.instant('GLOBAL.inscripcion') + '|' +
              this.translate.instant('GLOBAL.idioma'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else {
      this.info_idioma = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateInfoIdioma(infoIdioma: any): void {
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
          this.loading = true;
          const datoPut = <any>{
            'Id': 1 * infoIdioma.Id,
            'Idioma': infoIdioma.Idioma.Id,
            'InscripcionId': infoIdioma.InscripcionId,
            'Activo': infoIdioma.Activo,
          };

          this.inscripcionService.put('inscripcion_posgrado', datoPut)
            .subscribe(resexamen => {
              const rex = <any>resexamen;
              if (resexamen !== null && JSON.stringify(rex).toString() !== '[{}]') {
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                  this.translate.instant('GLOBAL.idioma') + ' ' +
                  this.translate.instant('GLOBAL.confirmarActualizar'));
                this.inscripcion_id = 0;
                this.info_idioma = undefined;
                this.clean = !this.clean;
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.idioma_examen'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_idioma !== undefined) {
        this.updateInfoIdioma(event.data.InfoIdioma);
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
