import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoreService } from '../../../@core/data/core.service';
import { EventoService } from '../../../@core/data/evento.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-calendario-evento',
  templateUrl: './list-calendario_evento.component.html',
  styleUrls: ['./list-calendario_evento.component.scss'],
})
export class ListCalendarioEventoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  data: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private eventoService: EventoService,
    private coreService: CoreService, private toasterService: ToasterService) {
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
          width: '5%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Descripcion: {
          title: this.translate.instant('GLOBAL.descripcion'),
          width: '18%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TipoEventoId: {
          title: this.translate.instant('GLOBAL.tipo_evento'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        FechaInicio: {
          title: this.translate.instant('GLOBAL.fecha_inicio'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return formatDate(value, 'yyyy-MM-dd', 'en');
          },
        },
        FechaFin: {
          title: this.translate.instant('GLOBAL.fecha_fin'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return formatDate(value, 'yyyy-MM-dd', 'en');
          },
        },
        EventoPadreId: {
          title: this.translate.instant('GLOBAL.evento_padre'),
          width: '22%',
          valuePrepareFunction: (value) => {
            return value.Descripcion;
          },
        },
        Activo: {
          title: this.translate.instant('GLOBAL.activo'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  loadData(): void {
    this.eventoService.get('calendario_evento/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.eventoService.get('tipo_evento/' + element.TipoEventoId.Id)
            .subscribe(tipo => {
              if (tipo !== null && JSON.stringify(tipo).toString() !== '[{}]') {
                element.TipoEventoId = <any>tipo;
                this.coreService.get('periodo/' + element.PeriodoId)
                  .subscribe(periodo => {
                    if (periodo !== null && JSON.stringify(periodo).toString() !== '[{}]') {
                      element.PeriodoId = <any>periodo;
                      if (element.EventoPadreId !== null) {
                        this.eventoService.get('calendario_evento/' + element.EventoPadreId)
                          .subscribe(padre => {
                            if (padre !== null && JSON.stringify(padre).toString() !== '[{}]') {
                              element.EventoPadreId = <any>padre;
                            }
                            this.source.load(this.data);
                          },
                            (error: HttpErrorResponse) => {
                              Swal({
                                type: 'error',
                                title: error.status + '',
                                text: this.translate.instant('ERROR.' + error.status),
                                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                  this.translate.instant('GLOBAL.calendario_evento') + '|' +
                                  this.translate.instant('GLOBAL.evento_padre'),
                                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                              });
                            });
                      } else {
                        element.EventoPadreId = <any>{Descripcion: ''};
                        this.source.load(this.data);
                      }
                    }
                  },
                    (error: HttpErrorResponse) => {
                      Swal({
                        type: 'error',
                        title: error.status + '',
                        text: this.translate.instant('ERROR.' + error.status),
                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                          this.translate.instant('GLOBAL.calendario_evento') + '|' +
                          this.translate.instant('GLOBAL.periodo'),
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
                    this.translate.instant('GLOBAL.calendario_evento') + '|' +
                    this.translate.instant('GLOBAL.tipo_evento'),
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
          this.translate.instant('GLOBAL.calendario_evento'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
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
        this.eventoService.delete('calendario_evento', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.calendario_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
         },
           (error: HttpErrorResponse) => {
             Swal({
               type: 'error',
               title: error.status + '',
               text: this.translate.instant('ERROR.' + error.status),
               footer: this.translate.instant('GLOBAL.eliminar') + '-' +
               this.translate.instant('GLOBAL.calendario_evento'),
               confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
             });
           });
      }
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
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
