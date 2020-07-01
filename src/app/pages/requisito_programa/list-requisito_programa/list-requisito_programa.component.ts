import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluacionInscripcionService } from '../../../@core/data/evaluacion_inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { CoreService } from '../../../@core/data/core.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-requisito-programa',
  templateUrl: './list-requisito_programa.component.html',
  styleUrls: ['./list-requisito_programa.component.scss'],
})
export class ListRequisitoProgramaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private translate: TranslateService,
    private requisitoService: EvaluacionInscripcionService,
    private programaAcademico: ProgramaOikosService,
    private core: CoreService,
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
        RequisitoId: {
          title: this.translate.instant('GLOBAL.requisito_academico'),
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
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          width: '30%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Porcentaje: {
          title: this.translate.instant('GLOBAL.porcentaje'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
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

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.requisitoService.get('requisito_programa_academico/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.requisitoService.get('requisito/' + element.RequisitoId.Id).subscribe(res2 => {
            if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
              element.TipoRequisitoProgramaId = <any>res2;
              this.programaAcademico.get('dependencia/' + element.ProgramaAcademicoId).subscribe(res3 => {
                if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                  element.ProgramaId = <any>res3;
                    this.core.get('periodo/' + element.PeriodoId).subscribe(res4 => {
                      if (res4 !== null && JSON.stringify(res4).toString() !== '[{}]') {
                        element.PeriodoId = <any>res4;
                      }
                      this.source.load(this.data);
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
                  this.translate.instant('GLOBAL.requisito_academico'),
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
            this.translate.instant('GLOBAL.requisito_programa'),
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
        this.requisitoService.delete('requisito_programa_academico', event.data).subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.requisito_programa') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.requisito_programa'),
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
