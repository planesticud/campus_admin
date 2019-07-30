import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { CoreService } from '../../../@core/data/core.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-list-inscripcion',
  templateUrl: './list-inscripcion.component.html',
  styleUrls: ['./list-inscripcion.component.scss'],
})
export class ListInscripcionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  posgrados = [];
  periodo = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private inscripcionesService: InscripcionService,
    private toasterService: ToasterService,
    private personaService: PersonaService,
    private coreService: CoreService,
    private router: Router,
    private programaService: ProgramaAcademicoService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
  }

  cargarCampos() {
    this.settings = {
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
        deleteButtonContent: '<i class="nb-person"></i>', // este boton no elimina, sera usado para informacion
        // confirmDelete: true,
      },
      actions: {
        add: false,
        edit: false,
        delete: true,
        columnTitle: '',
      },
      mode: 'external',
      columns: {
        Aspirante: {
          title: this.translate.instant('GLOBAL.aspirante'),
          width: '30%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          width: '20%',
          valuePrepareFunction: (value) => {
            const num = parseInt(value, 10);
            return this.posgrados[num - 1].Nombre.toString();
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo'),
          width: '20%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EstadoInscripcionId: {
          title: this.translate.instant('GLOBAL.estado_inscripcion'),
          width: '20%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EnfasisId: {
          title: this.translate.instant('GLOBAL.enfasis'),
          width: '20%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        AceptaTerminos: {
          title: this.translate.instant('GLOBAL.acepta_terminos'),
          width: '10%',
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

  loadData(query?: string): void {
    if (query) {
      this.inscripcionesService.get(query).subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          for (let index = 0; index < data.length; index++) {
            const datos = data[index];
            this.personaService.get(`persona?query=Ente:${datos.Aspirante}`)
                    .subscribe(res_aspirante => {
                      if (res_aspirante !== null) {
                        const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                        ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
                        data[index].Aspirante = aspirante;
                        if ( index === (data.length - 1 ) ) {
                          this.source.load(data);
                        }
                      }
                    },
                    (error_aspirante: HttpErrorResponse) => {
                      Swal({
                        type: 'error',
                        title: error_aspirante.status + '',
                        text: this.translate.instant('ERROR.' + error_aspirante.status),
                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                          this.translate.instant('GLOBAL.aspirante'),
                        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                      });
                    });
          }
            } else {
              Swal({
                type: 'error',
                title: this.translate.instant('GLOBAL.warning'),
                text: `no se encontraron resultados`,
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
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
    } else {
      this.inscripcionesService.get('inscripcion/?limit=0').subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          // data.forEach(function persona (dato): void {
          //   console.info(dato.Aspirante)
          // });
          for (let index = 0; index < data.length; index++) {
            const datos = data[index];
            this.personaService.get(`persona?query=Ente:${datos.Aspirante}`)
                    .subscribe(res_aspirante => {
                      if (res_aspirante !== null) {
                        const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                        ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
                        data[index].Aspirante = aspirante;
                        if ( index === (data.length - 1 ) ) {
                          this.source.load(data);
                        }
                      }
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.cargar') + '-' +
                            this.translate.instant('GLOBAL.aspirante'),
                          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                        });
                      });
          }
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
    }
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    console.info(event.data)
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onVerInfo(event): void {
    console.info('info chida')
    this.router.navigate( ['/pages/detalle_inscripcion/list-detalle_inscripcion', event.data.Id] )
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
        this.inscripcionesService.delete('inscripcion/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
            this.translate.instant('GLOBAL.inscripcion') + ' ' +
            this.translate.instant('GLOBAL.confirmarEliminar'));
            }
         },
           (error: HttpErrorResponse) => {
             Swal({
               type: 'error',
               title: error.status + '',
               text: this.translate.instant('ERROR.' + error.status),
               footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                 this.translate.instant('GLOBAL.inscripcion'),
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

  loadInfoSelectFiltro() {
    this.programaService.get('programa_academico/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
          this.loadData();
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
      this.coreService.get('periodo/?limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.periodo = <any>res;
          this.loadData();
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.periodo'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  Filtrar() {
    if (this.selectedValuePrograma && !this.selectedValuePeriodo) {
      this.loadData(`inscripcion/?query=ProgramaAcademico:${this.selectedValuePrograma.Id}`);
    } else if ( !this.selectedValuePrograma && this.selectedValuePeriodo ) {
      this.loadData(`inscripcion/?query=Periodo:${this.selectedValuePeriodo.Id}`);
    } else if ( (this.selectedValuePrograma !== undefined && this.selectedValuePrograma !== 0 )
    && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0 ) ) {
      this.loadData(`inscripcion/?query=ProgramaAcademico:${this.selectedValuePeriodo.Id},Periodo:${this.selectedValuePeriodo.Id}`);
    } else {
      this.loadData();
    }
  }

  ClearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
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
