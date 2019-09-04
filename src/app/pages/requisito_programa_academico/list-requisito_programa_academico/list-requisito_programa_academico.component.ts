import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RequisitoService } from '../../../@core/data/requisito.service';
import { CoreService } from '../../../@core/data/core.service';
import { ProgramaAcademicoService } from './../../../@core/data/programa_academico.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-requisito-programa-academico',
  templateUrl: './list-requisito_programa_academico.component.html',
  styleUrls: ['./list-requisito_programa_academico.component.scss'],
  })
export class ListRequisitoProgramaAcademicoComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private translate: TranslateService,
    private requisitoService: RequisitoService,
    private coreService: CoreService,
    private programaAcademico: ProgramaAcademicoService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.cargarCampos();
    });
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
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        RequisitoId: {
          title: this.translate.instant('GLOBAL.requisito_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Porcentaje: {
          title: this.translate.instant('GLOBAL.porcentaje'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Activo: {
          title: this.translate.instant('GLOBAL.activo'),
          // type: 'boolean;',
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
    this.requisitoService.get('requisito_programa_academico/?limit=0')
    .subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.coreService.get('periodo/' + element.PeriodoId)
          .subscribe(res2 => {
            if (res2 !== null) {
              element.PeriodoId = <any>res2;
              this.programaAcademico.get('programa_academico/' + element.ProgramaAcademicoId)
              .subscribe(res3 => {
                if (res3 !== null) {
                  element.ProgramaAcademicoId = <any>res3;
                  this.source.load(this.data);
                }
              });
            }
          });
        });
      }
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
      title: 'Deleting?',
      text: 'Delete RequisitoProgramaAcademico!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.requisitoService.delete('requisito_programa_academico/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'RequisitoProgramaAcademico deleted');
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
