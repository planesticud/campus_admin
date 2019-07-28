import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
// import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-list-validacion-descuento',
  templateUrl: './list-validacion_descuento.component.html',
  styleUrls: ['./list-validacion_descuento.component.scss'],
  })
export class ListValidacionDescuentoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private translate: TranslateService,
    private personas: PersonaService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaAcademicoService,
    // private programaAcademico: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      actions: {
        columnTitle: '',
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ReciboMatriculaId: {
          title: this.translate.instant('GLOBAL.recibo_matricula_id'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        SolicitudDescuentoId: {
          title: this.translate.instant('GLOBAL.solicitud_descuento_id'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TipoDuracionId: {
          title: this.translate.instant('GLOBAL.tipo_duracion_id'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        ValorBase: {
          title: this.translate.instant('GLOBAL.valor_base'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ValorConDescuento: {
          title: this.translate.instant('GLOBAL.valor_con_descuento'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Autorizado: {
          title: this.translate.instant('GLOBAL.autorizado'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Activo: {
          title: this.translate.instant('GLOBAL.activo'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.descuentosService.get('validacion_descuento/?limit=0').subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.descuentosService.get('solicitud_descuento/' + element.SolicitudDescuentoId.Id)
            .subscribe(res2 => {
              if (res2 !== null) {
                element.SolicitudDescuentoId = <any>res2;
                this.descuentosService.get('descuentos_dependencia/' + element.SolicitudDescuentoId.DescuentosDependenciaId.Id)
                  .subscribe(res3 => {
                    if (res3 !== null) {
                      element.SolicitudDescuentoId.DescuentosDependenciaId = <any>res3;
                      const dependenciaId = <any>res3;
                      this.programaAcademico.get('programa_academico/' + dependenciaId.DependenciaId).subscribe(res4 => {
                        if (res4 != null) {
                          element.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId = <any>res4;
                          this.descuentosService.get('tipo_descuento/' + dependenciaId.TipoDescuentoId.Id).subscribe(res5 => {
                            if (res5 !== null) {
                              element.SolicitudDescuentoId.DescuentosDependenciaId.TipoDescuentoId = <any>res5;
                              const duracion = element.TipoDuracionId;
                              this.descuentosService.get('tipo_duracion/' + duracion.Id).subscribe(res6 => {
                                if (res6 !== null) {
                                  element.TipoDuracionId = <any>res6;
                                  const persona = element.SolicitudDescuentoId.PersonaId;
                                  this.personas.get('persona/' + persona).subscribe(res7 => {
                                    if (res7 !== null) {
                                      element.SolicitudDescuentoId.PersonaId = <any>res7;
                                      element.SolicitudDescuentoId.Nombre = element.SolicitudDescuentoId.PeriodoId + '-' +
                                        element.SolicitudDescuentoId.PersonaId.PrimerNombre + ' ' +
                                        element.SolicitudDescuentoId.PersonaId.SegundoNombre + ' ' +
                                        element.SolicitudDescuentoId.PersonaId.PrimerApellido + ' ' +
                                        element.SolicitudDescuentoId.PersonaId.SegundoApellido + '-' +
                                        element.SolicitudDescuentoId.DescuentosDependenciaId.DependenciaId.Nombre + '-' +
                                        element.SolicitudDescuentoId.DescuentosDependenciaId.TipoDescuentoId.Nombre;
                                    }
                                    this.source.load(this.data);
                                  },
                                    (error: HttpErrorResponse) => {
                                      Swal({
                                        type: 'error',
                                        title: error.status + '',
                                        text: this.translate.instant('ERROR.' + error.status),
                                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                          this.translate.instant('GLOBAL.persona_id'),
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
                                      this.translate.instant('GLOBAL.tipo_duracion_id'),
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
                                  this.translate.instant('GLOBAL.tipo_descuento'),
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
                              this.translate.instant('GLOBAL.dependencia_id'),
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
                          this.translate.instant('GLOBAL.tipo_descuento'),
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
                    this.translate.instant('GLOBAL.solicitud_descuento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
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
            this.translate.instant('GLOBAL.validacion_descuento'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.eliminar'),
      text: this.translate.instant('GLOBAL.eliminar') + '?',
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
        this.descuentosService.delete('validacion_descuento/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.validacion_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
         },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.validacion_descuento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }

  itemselec(event): void {
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
