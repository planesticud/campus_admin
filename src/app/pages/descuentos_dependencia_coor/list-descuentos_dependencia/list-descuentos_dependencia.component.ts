import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CoreService } from '../../../@core/data/core.service';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ToasterConfig } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-list-descuentos-coordinacion',
  templateUrl: './list-descuentos_dependencia.component.html',
  styleUrls: ['./list-descuentos_dependencia.component.scss'],
})
export class ListDescuentosDependenciaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;
  posgrados = [];
  periodo = [];
  selectedValuePrograma: any;
  selectedValuePeriodo: any;

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaOikosService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
    this.loadInfoSelectFiltro();
  }

  cargarCampos() {
    this.settings = {
      actions: {
        add: true,
        edit: true,
        delete: false,
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
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          width: '5%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoDescuentoId: {
          title: this.translate.instant('GLOBAL.tipo_descuento_id'),
          width: '30%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          width: '15%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        DependenciaId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          width: '45%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Activo: {
          title: this.translate.instant('GLOBAL.activo'),
          width: '5%',
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
      this.descuentosService.get(query).subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          this.data = <Array<any>>res;
          this.data.forEach(element => {
            this.descuentosService.get('tipo_descuento/' + element.TipoDescuentoId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                element.TipoDescuentoId = <any>res2;
                this.coreService.get('periodo/' + element.PeriodoId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    element.PeriodoId = <any>res3;
                    this.programaAcademico.get('dependencia/' + element.DependenciaId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        element.DependenciaId = <any>res4;
                      }
                      this.source.load(this.data);
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
                    this.translate.instant('GLOBAL.tipo_descuento'),
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
              this.translate.instant('GLOBAL.descuentos_dependencia'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else {
      this.descuentosService.get('descuentos_dependencia/?limit=0').subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          this.data = <Array<any>>res;
          this.data.forEach(element => {
            this.descuentosService.get('tipo_descuento/' + element.TipoDescuentoId.Id).subscribe(res2 => {
              if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
                element.TipoDescuentoId = <any>res2;
                this.coreService.get('periodo/' + element.PeriodoId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    element.PeriodoId = <any>res3;
                    this.programaAcademico.get('dependencia/' + element.DependenciaId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        element.DependenciaId = <any>res4;
                      }
                      this.source.load(this.data);
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
                    this.translate.instant('GLOBAL.tipo_descuento'),
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
              this.translate.instant('GLOBAL.descuentos_dependencia'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    }
  }

  loadInfoSelectFiltro() {
    this.programaAcademico.get('dependencia/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
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
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
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

  filtrar() {
    if (this.selectedValuePrograma && !this.selectedValuePeriodo) {
      this.loadData('descuentos_dependencia?query=DependenciaId:' + this.selectedValuePrograma.Id +
        '&limit=0');
    } else if ( !this.selectedValuePrograma && this.selectedValuePeriodo ) {
      this.loadData('descuentos_dependencia?query=PeriodoId:' + this.selectedValuePeriodo.Id +
      '&limit=0');
    } else if ( (this.selectedValuePrograma !== undefined && this.selectedValuePrograma !== 0 )
    && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0 ) ) {
      this.loadData('descuentos_dependencia?query=DependenciaId:' + this.selectedValuePrograma.Id +
        ',PeriodoId:' + this.selectedValuePeriodo.Id + '&limit=0');
    } else {
      this.loadData();
    }
  }

  clearFiltro() {
    this.loadData();
    this.selectedValuePrograma = '--Seleccionar--'
    this.selectedValuePrograma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
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
  }
}
