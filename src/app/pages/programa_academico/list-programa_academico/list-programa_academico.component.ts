import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { CoreService } from '../../../@core/data/core.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-programa-academico',
  templateUrl: './list-programa_academico.component.html',
  styleUrls: ['./list-programa_academico.component.scss'],
})
export class ListProgramaAcademicoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  data: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private programaAcademicoService: ProgramaAcademicoService,
    private coreService: CoreService, private organizacionService: OrganizacionService,
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
      noDataMessage: 'No se encuentran datos (No data found)',
      add: {
        addButtonContent: '<i class="nb-plus" title="' + this.translate.instant('GLOBAL.agregar') + '"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit" title="' + this.translate.instant('GLOBAL.editar') + '"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash" title="' + this.translate.instant('GLOBAL.eliminar') + '"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          width: '5%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Codigo: {
          title: this.translate.instant('GLOBAL.codigo_snies'),
          width: '5%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre'),
          width: '18%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Institucion: {
          title: this.translate.instant('GLOBAL.institucion'),
          width: '16%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Titulacion: {
          title: this.translate.instant('GLOBAL.titulacion'),
          width: '16%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Metodologia: {
          title: this.translate.instant('GLOBAL.metodologia'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        NivelFormacion: {
          title: this.translate.instant('GLOBAL.nivel_formacion'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Duracion: {
          title: this.translate.instant('GLOBAL.duracion'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        UnidadTiempo: {
          title: this.translate.instant('GLOBAL.unidad_tiempo'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.programaAcademicoService.get('programa_academico/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.coreService.get('nucleo_basico_conocimiento/' + element.NucleoBasicoConocimiento)
            .subscribe(nucleo => {
              if (nucleo !== null && JSON.stringify(nucleo).toString() !== '[{}]') {
                element.NucleoBasicoConocimiento = <any>nucleo;
                this.coreService.get('unidad_tiempo/' + element.UnidadTiempo)
                  .subscribe(tiempo => {
                    if (tiempo !== null && JSON.stringify(tiempo).toString() !== '[{}]') {
                      element.UnidadTiempo = <any>tiempo;
                      this.organizacionService.get('organizacion/' +  element.Institucion)
                        .subscribe(institucion => {
                          if (institucion !== null && JSON.stringify(institucion).toString() !== '[{}]') {
                            element.Institucion = <any>institucion;
                          }
                          this.source.load(this.data);
                        },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                              this.translate.instant('GLOBAL.programa_academico') + '|' +
                              this.translate.instant('GLOBAL.institucion'),
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
                          this.translate.instant('GLOBAL.programa_academico') + '|' +
                          this.translate.instant('GLOBAL.unidad_tiempo'),
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
                    this.translate.instant('GLOBAL.programa_academico') + '|' +
                    this.translate.instant('GLOBAL.nucleo_basico_conocimiento'),
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
          this.translate.instant('GLOBAL.programa_academico'),
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
        this.programaAcademicoService.delete('programa_academico', event.data).subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.programa_academico') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
         },
           (error: HttpErrorResponse) => {
             Swal({
               type: 'error',
               title: error.status + '',
               text: this.translate.instant('ERROR.' + error.status),
               footer: this.translate.instant('GLOBAL.eliminar') + '-' +
               this.translate.instant('GLOBAL.programa_academico'),
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
    // console.log("afssaf");
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
