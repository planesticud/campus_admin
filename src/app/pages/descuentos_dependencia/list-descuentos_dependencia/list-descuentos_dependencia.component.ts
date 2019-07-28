import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
// import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-list-descuentos-dependencia',
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

  constructor(private translate: TranslateService,
    private descuentosService: DescuentoAcademicoService,
    private programaAcademico: ProgramaAcademicoService,
    // private programaAcademico: ProgramaOikosService,
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
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoDescuentoId: {
          title: this.translate.instant('GLOBAL.tipo_descuento_id'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        DependenciaId: {
          title: this.translate.instant('GLOBAL.dependencia_id'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PorcentajeDescuento: {
          title: this.translate.instant('GLOBAL.porcentaje_descuento'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Activo: {
          title: this.translate.instant('GLOBAL.activo'),
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
    this.descuentosService.get('descuentos_dependencia/?limit=0').subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.descuentosService.get('tipo_descuento/' + element.TipoDescuentoId.Id).subscribe(res2 => {
            if (res2 !== null) {
              element.TipoDescuentoId = <any>res2;
              this.programaAcademico.get('programa_academico/' + element.DependenciaId).subscribe(res3 => {
                if (res3 != null) {
                  element.DependenciaId = <any>res3;
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
        this.descuentosService.delete('descuentos_dependencia/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.descuentos_dependencia') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.descuentos_dependencia'),
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
