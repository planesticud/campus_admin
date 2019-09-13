import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
// import { Inscripcion } from './../../../@core/data/models/inscripcion';

// import { ListadoAdmitidosService } from '../../../@core/data/listado_admitidos.service';
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
  selectedValuePrograma: any;
  selectedValuePeriodo: any;
  selectedValueEstado: any;

  source: LocalDataSource = new LocalDataSource();
  dataExcel: any;

  constructor(private translate: TranslateService,
    private admisionesService: InscripcionService,
    private personaService: PersonaService,
    private programaAcademicoService: ProgramaAcademicoService,
    private campusMidService: CampusMidService,
    private coreService: CoreService,
    private excelService: ExcelService,
    private toasterService: ToasterService) {
    this.loadData();
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
        Persona: {
          title: this.translate.instant('GLOBAL.personaid'),
          // type: 'persona;',
          valuePrepareFunction: (value) => {
            return value.PrimerNombre;
          },
        },
        ProgramaAcademico: {
          title: this.translate.instant('GLOBAL.programaacademico'),
          // type: 'dependencia;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo'),
          // type: 'periodo;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        EstadoInscripcionId: {
          title: this.translate.instant('GLOBAL.estadoinscripcion'),
          // type: 'estado_inscripcion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PuntajeTotal: {
          title: this.translate.instant('GLOBAL.puntajetotal'),
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
     this.admisionesService.get('inscripcion/?query=EstadoInscripcionId:3' ).subscribe(res => {
       if (res !== null) {
         // const data = <Array<any>>res;
         const data = <Array<any>>res;
         const data_info = <Array<any>>[];
         data.forEach(element => {
           // console.info('ELEMENT: ', JSON.stringify(element.ProgramaAcademicoId));
           this.programaAcademicoService.get('programa_academico/?query=Id:' + element.ProgramaAcademicoId)
             .subscribe(programa => {
             if (programa !== null) {
               // console.info('PROGAMA: ', JSON.stringify(programa));
               const programa_info = <any>programa[0];
               element.ProgramaAcademico = programa_info;
               // element.Metodologia = programa_info.Metodologia;
               // element.NivelFormacion = programa_info.NivelFormacion;
               this.personaService.get('persona/?query=Id:' + element.PersonaId)
                .subscribe(persona => {
                  if (persona !== null) {
                    // console.info('PERSONA: ', JSON.stringify(persona));
                    const persona_info = <any>persona[0];
                    element.Persona = persona_info;
                    // this.coreService.get('perido/' + element.PeriodoId)
                    //   .subscribe(periodo => {
                    //     if (periodo !== null) {
                    //       const periodo_info = <any>periodo;
                    //       element.PaisUniversidad = periodo_info.Nombre;
                    //       data_info.push(element);
                    //       this.source.load(data_info);
                    //     }
                    // });
                    data_info.push(element);
                    this.dataExcel = data_info;
                    this.source.load(data_info);
                  }
                });
              }
            });

           // console.info('DATOS: ', JSON.stringify(data_info));
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
            this.loadData();
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
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log("afssaf");
  }

  loadInfoSelectFiltro() {
    // TODO: Cambiar por OIKOS
    this.programaAcademicoService.get('programa_academico/?limit=10')
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
        this.admisionesService.get('estado_inscripcion/?limit=0')
          .subscribe(res => {
            const r = <any>res;
            if (res !== null && r.Type !== 'error') {
              this.estados = <any>res;
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
  }

  Filtrar() {
    if (this.selectedValuePeriodo && this.selectedValuePrograma) {
      // if (this.selectedValuePrograma) {
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
      } else {
      // TODO: Mensaje solicitando periodo;
        console.info ('Solicitar Programa y periodo');
      }
    // } else {
    //   // TODO: Mensaje solicitando periodo;
    //     console.info ('Solicitar Periodo');
    // }
  }

  ClearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
    // TODO: Borrar
    this.calcularNotas();
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
   this.excelService.exportAsExcelFile(this.dataExcel, 'sample')
  }

  private calcularNotas(): void {
    this.admisionesService.get('inscripcion/' ).subscribe(res => {
      const inscripciones = <Array<any>>res;
      inscripciones.forEach(element => {
          this.campusMidService.get('evaluacion_inscripcion/' + element.id).subscribe(resNota => {
            resNota;
          });
      })
    });
  }

}
