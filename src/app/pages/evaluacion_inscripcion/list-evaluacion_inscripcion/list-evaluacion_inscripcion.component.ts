import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RequisitoService } from '../../../@core/data/requisito.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { InfoCaracteristica } from '../../../@core/data/models/info_caracteristica';

@Component({
  selector: 'ngx-list-evaluacion-inscripcion',
  templateUrl: './list-evaluacion_inscripcion.component.html',
  styleUrls: ['./list-evaluacion_inscripcion.component.scss'],
  })
export class ListEvaluacionInscripcionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  data: any;
  source: LocalDataSource = new LocalDataSource();
  requisito: any;


  constructor(private translate: TranslateService, 
    private requisitoService: RequisitoService,
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
        add: false,
        delete: false,
      },
      //add: {
      //  addButtonContent: '<i class="nb-plus"></i>',
      //  createButtonContent: '<i class="nb-checkmark"></i>',
      //  cancelButtonContent: '<i class="nb-close"></i>',
      //},
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      //delete: {
      //  deleteButtonContent: '<i class="nb-trash"></i>',
      //  confirmDelete: true,
      //},
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        InscripcionId: {
          title: this.translate.instant('GLOBAL.inscripcion_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NotaFinal: {
          title: this.translate.instant('GLOBAL.nota_final'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        RequisitoProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.requisito_programa_academico_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.RequisitoId.Nombre;
          },
        },
        //EntrevistaId: {
        //  title: this.translate.instant('GLOBAL.entrevista_id'),
        //  // type: 'number;',
        //  valuePrepareFunction: (value) => {
        //    if(value!==null){
        //    return value.Id;
        //    }else{
        //      return '';
        //    }
        //  },
        //},
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
    this.requisitoService.get('evaluacion_inscripcion/?limit=0')
    .subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
      //console.info(JSON.stringify(this.data));
       var i = 0;
        this.data.forEach(element => {
      // console.info(JSON.stringify(element.RequisitoProgramaAcademicoId.RequisitoId.Nombre));
         if(element.RequisitoProgramaAcademicoId.RequisitoId !== null ){
            this.data.splice(i,1);
          }        
          i=i+1;
        });
        this.source.load(this.data);
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
      text: 'Delete EvaluacionInscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.requisitoService.delete('evaluacion_inscripcion/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'EvaluacionInscripcion deleted');
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
