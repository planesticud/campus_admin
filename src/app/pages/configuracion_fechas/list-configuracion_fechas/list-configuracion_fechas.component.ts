import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoreService } from '../../../@core/data/core.service';
import { EventoService } from '../../../@core/data/evento.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ToasterConfig } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ngx-list-configuracion-fechas',
  templateUrl: './list-configuracion_fechas.component.html',
  styleUrls: ['./list-configuracion_fechas.component.scss'],
})
export class ListConfiguracionFechasComponent implements OnInit {
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
    private coreService: CoreService,
    private eventoService: EventoService,
    private programaService: ProgramaOikosService) {
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
  }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
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

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
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
      noDataMessage: 'No se encuentran datos (No data found)',
      actions: {
        add: true,
        edit: true,
        delete: false,
        columnTitle: '',
      },
      mode: 'external',
      columns: {
        DependenciaId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          width: '50%',
          key: 'Nombre',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        FechaInicio: {
          title: this.translate.instant('GLOBAL.fecha_inicio_inscripcion'),
          width: '20%',
          valuePrepareFunction: (value) => {
            return formatDate(value, 'yyyy-MM-dd', 'en');
          },
        },
        FechaFin: {
          title: this.translate.instant('GLOBAL.fecha_fin_inscripcion'),
          width: '20%',
          valuePrepareFunction: (value) => {
            return formatDate(value, 'yyyy-MM-dd', 'en');
          },
        },
      },
    };
  }

  loadData(query?: string): void {
    if (query) {
      this.eventoService.get(query).subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          const data = <Array<any>>res;
          data.forEach(element => {
            this.eventoService.get('tipo_evento?query=Id:' + element.TipoEventoId.Id)
              .subscribe(tipo => {
                const temp2 = <any>tipo[0];
                element.TipoEventoId = temp2;
                console.info(JSON.stringify(temp2));
                this.programaService.get('dependencia/?query=Id:' + temp2.DependenciaId)
                  .subscribe(prog => {
                    element.DependenciaId = <any>prog[0];
                    this.coreService.get('periodo/?query=Id:' + element.PeriodoId)
                      .subscribe(peri => {
                        element.PeriodoId = <any>peri[0];
                        this.source.load(data);
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
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.tipo_evento'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          });
        } else {
          Swal({
            type: 'warning',
            title: this.translate.instant('GLOBAL.warning'),
            text: this.translate.instant('GLOBAL.no_datos'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          })
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
      this.eventoService.get('calendario_evento?query=TipoEventoId.Nombre:Inscripción&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          const data = <Array<any>>res;
          data.forEach(element => {
            this.eventoService.get('tipo_evento?query=Id:' + element.TipoEventoId.Id)
              .subscribe(tipo => {
                const temp2 = <any>tipo[0];
                element.TipoEventoId = temp2;
                console.info(JSON.stringify(temp2));
                this.programaService.get('dependencia/?query=Id:' + temp2.DependenciaId)
                  .subscribe(prog => {
                    element.DependenciaId = <any>prog[0];
                    this.coreService.get('periodo/?query=Id:' + element.PeriodoId)
                      .subscribe(peri => {
                        element.PeriodoId = <any>peri[0];
                        this.source.load(data);
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
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.tipo_evento'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          });
        } else {
          Swal({
            type: 'warning',
            title: this.translate.instant('GLOBAL.warning'),
            text: this.translate.instant('GLOBAL.no_datos'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          })
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
    }
  }

  Filtrar() {
    console.info(JSON.stringify(this.selectedValuePrograma));
    console.info(JSON.stringify(this.selectedValuePeriodo));
    if (this.selectedValuePrograma && !this.selectedValuePeriodo) {
      console.info('1');

      this.loadData('calendario_evento?query=TipoEventoId.Nombre:Inscripción,TipoEventoId.DependenciaId:' +
        this.selectedValuePrograma.Id);
    } else if ( !this.selectedValuePrograma && this.selectedValuePeriodo ) {
      console.info('2');

      this.loadData('calendario_evento?query=TipoEventoId.Nombre:Inscripción,PeriodoId:' +
        this.selectedValuePeriodo.Id);
    } else if ( (this.selectedValuePrograma !== undefined && this.selectedValuePrograma !== 0 )
    && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0 ) ) {
      console.info('3');

      this.loadData('calendario_evento?query=TipoEventoId.Nombre:Inscripción,TipoEventoId.DependenciaId:' +
        this.selectedValuePrograma.Id + ',PeriodoId:' + this.selectedValuePeriodo.Id);
    } else {
      this.loadData();
    }
  }

  loadInfoSelectFiltro() {
    this.programaService.get('dependencia/?limit=0')
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

  ClearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
  }
}
