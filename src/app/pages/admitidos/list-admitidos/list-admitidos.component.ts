import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { Inscripcion } from './../../../@core/data/models/inscripcion';

import { InscripcionService } from '../../../@core/data/inscripcion.service';
// import { InscripcionService } from '../../../@core/data/admision.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { CoreService } from '../../../@core/data/core.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from '../../../@core/data/excel.service';

@Component({
  selector: 'ngx-list-admitidos',
  templateUrl: './list-admitidos.component.html',
  styleUrls: ['./list-admitidos.component.scss'],
  })
export class ListAdmitidosComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  posgrados = [];
  periodo = [];
  estados = [];
  dataExcel = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;
  selectedValueEstado: any;

  source: LocalDataSource = new LocalDataSource();
  // dataExcel = [];
  data_export: any;
  constructor(private translate: TranslateService,
    private admisionesService: InscripcionService,
    private personaService: PersonaService,
    private programaAcademicoService: ProgramaAcademicoService,
    private campusMidService: CampusMidService,
    private coreService: CoreService,
    private excelService: ExcelService,
    private toasterService: ToasterService) {
    // this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
    // this.dataExcel = []
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
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoIdentificacion: {
          title: this.translate.instant('GLOBAL.tipo_documento'),
          // type: 'persona;',
          valuePrepareFunction: (value) => {
            return value.CodigoAbreviacion;
          },
        },
        NumeroDocumento: {
          title: this.translate.instant('GLOBAL.documento_id'),
          // type: 'persona;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Persona: {
          title: this.translate.instant('GLOBAL.nombre'),
          // type: 'persona;',
          valuePrepareFunction: (value) => {
            return value.PrimerNombre;
          },
        },
        ProgramaAcademico: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          // type: 'dependencia;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Periodo: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          // type: 'periodo;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EstadoInscripcionId: {
          title: this.translate.instant('GLOBAL.estado_inscripcion'),
          // type: 'estado_inscripcion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PuntajeTotal: {
          title: this.translate.instant('GLOBAL.puntaje_total'),
          // type: 'number;',
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
      console.info('QUERY: ', query);
     this.admisionesService.get(query).subscribe(res => {
       if (res !== null) {
         const data = <Array<any>>res;
         const data_info = <Array<any>>[];
         this.dataExcel = [];
         data.forEach(element => {
           this.programaAcademicoService.get('programa_academico/?query=Id:' + element.ProgramaAcademicoId)
             .subscribe(programa => {
             if (programa !== null) {
               const programa_info = <any>programa[0];
               element.ProgramaAcademico = programa_info;
               this.personaService.get('persona/?query=Id:' + element.PersonaId)
                .subscribe(persona => {
                  if (persona !== null) {
                    const regExcel: any = {
                      Id: 0,
                      ProgramaAcademico: '',
                      TipoDocumento: '',
                      NumeroDocumento: 0,
                      Nombre: '',
                      Estado: '',
                      Puntaje: 0,
                    };
                    const persona_info = <any>persona[0];
                    element.Persona = persona_info;
                    this.coreService.get('periodo/' + element.PeriodoId)
                       .subscribe(periodo => {
                         if (periodo !== null) {

                              this.campusMidService.get('persona/ConsultaPersona/?id=' + element.PersonaId)
                                .subscribe(persona2 => {
                                  if (persona2 !== null) {
                                    const datos_persona = <any>persona2;
                                    element.NumeroDocumento = datos_persona.NumeroDocumento;
                                    element.TipoIdentificacion = datos_persona.TipoIdentificacion
                           const periodo_info = <any>periodo;
                           element.Periodo = periodo_info;
                    // data_info.push(element);
                    regExcel.Id = element.Id;
                    regExcel.ProgramaAcademico = element.ProgramaAcademico.Nombre;
                    regExcel.Nombre = element.Persona.PrimerNombre;
                    regExcel.TipoDocumento = element.TipoIdentificacion.CodigoAbreviacion;
                    regExcel.NumeroDocumento = element.NumeroDocumento;
                    regExcel.Estado = element.EstadoInscripcionId.Nombre
                    regExcel.Puntaje = element.PuntajeTotal
                    this.dataExcel.push(regExcel);
                    // console.info ('DATA_EXCEL: ', JSON.stringify(this.dataExcel));

                    data_info.push(element);
                    data_info.sort(function(a, b){return b.PuntajeTotal - a.PuntajeTotal});
                    // data_info.sort((a, b) => (a.PuntajeTotal < b.PuntajeTotal) ? 1 : -1)
                    this.source.load(data_info);
                  }
             });
           }
         });

                  }
                });
              }
            });


         });
       }
    });
   }
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
      title: 'Deleting?',
      text: 'Delete Admitidos!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.admisionesService.delete('admitidos/', event.data).subscribe(res => {
          if (res !== null) {
            // this.loadData();
            this.showToast('info', 'deleted', 'Admitidos deleted');
            }
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
      // this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
  }

  loadInfoSelectFiltro() {
    // TODO: Cambiar por OIKOS
    this.programaAcademicoService.get('programa_academico/?limit=10')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
          // this.loadData();
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
          // this.loadData();
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
        this.admisionesService.get('estado_inscripcion/?limit=0')
          .subscribe(res => {
            const r = <any>res;
            if (res !== null && r.Type !== 'error') {
              this.estados = <any>res;
              // this.loadData();
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

  private filtrar() {
    if (this.selectedValuePeriodo && this.selectedValuePrograma) {
      this.admisionesService.get('inscripcion/?query=ProgramaAcademicoId:' + this.selectedValuePrograma.Id ).subscribe(res => {
        const inscripciones = <Array<any>>res;
        inscripciones.forEach(element => {
            this.campusMidService.get('evaluacion_inscripcion/' + element.Id).subscribe(resNota => {
              if (resNota) {
              // this.loadData(`inscripcion/?query=ProgramaAcademico:${this.selectedValuePrograma.Id}`);
              if (this.selectedValueEstado !== undefined && this.selectedValueEstado !== 0 ) {
                  // tslint:disable-next-line:max-line-length
                  this.loadData(`inscripcion/?query=ProgramaAcademicoId:${this.selectedValuePrograma.Id},PeriodoId:${this.selectedValuePeriodo.Id},EstadoInscripcionId:${this.selectedValueEstado.Id}`);
              } else {
                this.loadData(`inscripcion/?query=ProgramaAcademicoId:${this.selectedValuePrograma.Id},PeriodoId:${this.selectedValuePeriodo.Id}`);
              }
            }
            });
        })
      });
      } else {
      // TODO: Mensaje solicitando periodo;
        console.info ('Solicitar Programa y periodo');
      }
  }


  ClearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
    // TODO: Borrar
    this.filtrar();
    this.exportAsXLSX();
    // TODO: \Borrar
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

  private exportAsXLSX(): void {
    this.dataExcel.sort(function(a, b){return a - b});
    this.excelService.exportAsExcelFile(this.dataExcel, 'sample')
  }

  // private calcularNotas() {
  //   this.admisionesService.get('inscripcion/?query=ProgramaAcademicoId:' + this.selectedValuePrograma.Id ).subscribe(res => {
  //     const inscripciones = <Array<any>>res;
  //     inscripciones.forEach(element => {
  //         this.campusMidService.get('evaluacion_inscripcion/' + element.Id).subscribe(resNota => {
  //           resNota;
  //         });
  //     })
  //   });
  //   return true;
  // }
}
