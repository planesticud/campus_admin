import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-relacion-organizacion',
  templateUrl: './list-relacion_organizacion.component.html',
  styleUrls: ['./list-relacion_organizacion.component.scss'],
})
export class ListRelacionOrganizacionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private translate: TranslateService,
    private organizacionService: OrganizacionService,
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
        OrganizacionPadre: {
          title: this.translate.instant('GLOBAL.organizacion_padre'),
          width: '35%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TipoRelacionOrganizaciones: {
          title: this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
          width: '25%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        OrganizacionHija: {
          title: this.translate.instant('GLOBAL.organizacion_hija'),
          width: '35%',
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
    this.organizacionService.get('relacion_organizaciones/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          console.info(JSON.stringify(element));
          this.organizacionService.get('organizacion/?query=Id:' + element.OrganizacionPadre)
            .subscribe(resOrganizacionPadre => {
              if (resOrganizacionPadre !== null && JSON.stringify(resOrganizacionPadre).toString() !== '[{}]') {
                element.OrganizacionPadre = <any>resOrganizacionPadre[0];
                this.organizacionService.get('organizacion/?query=Id:' + element.OrganizacionHija)
                  .subscribe(resOrganizacionHija => {
                    if (resOrganizacionHija !== null && JSON.stringify(resOrganizacionHija).toString() !== '[{}]') {
                      element.OrganizacionHija = <any>resOrganizacionHija[0];
                      this.organizacionService.get('tipo_relacion_organizaciones/?query=Id:' + element.TipoRelacionOrganizaciones.Id)
                        .subscribe(resTipoRelacionOrganizacion => {
                          if (resTipoRelacionOrganizacion !== null && JSON.stringify(resTipoRelacionOrganizacion).toString() !== '[{}]') {
                            element.TipoRelacionOrganizaciones = <any>resTipoRelacionOrganizacion[0];
                          }
                          this.source.load(this.data);
                        },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.tipo_relacion_organizacion'),
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
                          this.translate.instant('GLOBAL.organizacion_hijo'),
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
                    this.translate.instant('GLOBAL.organizacion_padre'),
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
            this.translate.instant('GLOBAL.relacion_organizacion'),
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
        this.organizacionService.delete('relacion_organizaciones', event.data).subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.relacion_organizacion') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.relacion_organizacion'),
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
