import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { TipoDescuento } from '../../../@core/data/models/tipo_descuento';
import { TipoDependencia } from '../../../@core/data/models/tipo_dependencia';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-tipo-dependencia-descuento',
  templateUrl: './list-tipo_dependencia_descuento.component.html',
  styleUrls: ['./list-tipo_dependencia_descuento.component.scss'],
})
export class ListTipoDependenciaDescuentoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private programaOikosService: ProgramaOikosService,
    private descuentosService: DescuentoAcademicoService,
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
        TipoDependenciaId: {
          title: this.translate.instant('GLOBAL.tipo_dependencia_id'),
          width: '30%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TipoDescuentoId: {
          title: this.translate.instant('GLOBAL.tipo_descuento_id'),
          width: '25%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PorcentajeDescuento: {
          title: this.translate.instant('GLOBAL.porcentaje_descuento'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaInicio: {
          title: this.translate.instant('GLOBAL.fecha_inicio'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaFin: {
          title: this.translate.instant('GLOBAL.fecha_fin'),
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
    this.descuentosService.get('tipo_dependencia_descuento/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        const data = <Array<any>>res;
        data.forEach(element => {
          this.descuentosService.get('tipo_descuento/' + element.TipoDescuentoId.Id)
          .subscribe(res2 => {
            if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
              element.TipoDescuentoId = <TipoDescuento>res2;
              this.programaOikosService.get('tipo_dependencia/?query=Id' + element.TipoDependenciaId)
              .subscribe(res3 => {
                if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                  element.TipoDependenciaId = <TipoDependencia>res3[0];
                }
                this.source.load(data);
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.tipo_dependencia'),
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
            this.translate.instant('GLOBAL.tipo_dependencia_descuento'),
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
        this.descuentosService.delete('tipo_dependencia_descuento', event.data).subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.loadData();
            this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
              this.translate.instant('GLOBAL.tipo_dependencia_descuento') + ' ' +
              this.translate.instant('GLOBAL.confirmarEliminar'));
          }
         },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.eliminar') + '-' +
                this.translate.instant('GLOBAL.tipo_dependencia_descuento'),
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
