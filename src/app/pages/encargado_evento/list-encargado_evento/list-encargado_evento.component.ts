import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PersonaService } from '../../../@core/data/persona.service';
import { EventoService } from '../../../@core/data/evento.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-encargado-evento',
  templateUrl: './list-encargado_evento.component.html',
  styleUrls: ['./list-encargado_evento.component.scss'],
})
export class ListEncargadoEventoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  data: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private eventoService: EventoService,
    private personaService: PersonaService, private toasterService: ToasterService) {
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
        CalendarioEventoId: {
          title: this.translate.instant('GLOBAL.calendario_evento'),
          width: '28%',
          valuePrepareFunction: (value) => {
            return value.Descripcion;
          },
        },
        EncargadoId: {
          title: this.translate.instant('GLOBAL.encargado_id'),
          width: '28%',
          valuePrepareFunction: (value) => {
            return value.PrimerNombre + ' ' + value.SegundoNombre + ' ' +
              value.PrimerApellido + ' ' + value.SegundoApellido;
          },
        },
        RolEncargadoId: {
          title: this.translate.instant('GLOBAL.rol_encargado_evento'),
          width: '29%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
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
    this.eventoService.get('encargado_evento/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.eventoService.get('calendario_evento/' + element.CalendarioEventoId.Id)
            .subscribe(calendario => {
              if (calendario !== null && JSON.stringify(calendario).toString() !== '[{}]') {
                element.CalendarioEventoId = <any>calendario;
                this.eventoService.get('rol_encargado_evento/' + element.RolEncargadoId)
                  .subscribe(rol => {
                    if (rol !== null && JSON.stringify(rol).toString() !== '[{}]') {
                      element.RolEncargadoId = <any>rol;
                      this.personaService.get('persona/' + element.EncargadoId)
                        .subscribe(encargado => {
                          if (encargado !== null && JSON.stringify(encargado).toString() !== '[{}]') {
                            element.EncargadoId = <any>encargado;
                          }
                          this.source.load(this.data);
                        },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.encargado_evento') + '|' +
                                this.translate.instant('GLOBAL.encargado_id'),
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
                          this.translate.instant('GLOBAL.encargado_evento') + '|' +
                          this.translate.instant('GLOBAL.rol_encargado_evento'),
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
                    this.translate.instant('GLOBAL.encargado_evento') + '|' +
                    this.translate.instant('GLOBAL.calendario_evento'),
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
          this.translate.instant('GLOBAL.encargado_evento'),
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
        this.eventoService.delete('encargado_evento', event.data).subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.encargado_evento') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
         },
           (error: HttpErrorResponse) => {
             Swal({
               type: 'error',
               title: error.status + '',
               text: this.translate.instant('ERROR.' + error.status),
               footer: this.translate.instant('GLOBAL.eliminar') + '-' +
               this.translate.instant('GLOBAL.encargado_evento'),
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
