import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { DocenteService } from '../../../@core/data/docente.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
// import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-entrevistador',
  templateUrl: './list-entrevistador.component.html',
  styleUrls: ['./list-entrevistador.component.scss'],
  })
export class ListEntrevistadorComponent implements OnInit {
  uid: number;
  uprograma: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private entrevistaService: EntrevistaService,
    private docenteService: DocenteService,
    private programaOikosService: ProgramaOikosService,
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
        Persona: {
          title: this.translate.instant('GLOBAL.ente'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.NombreCompleto;
            // return value;
          },
        },
        ProgramaAcademico: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          valuePrepareFunction: (value) => {
            return value.Nombre;
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
    // let docentes: Array<any> = [];
    this.entrevistaService.get('entrevistador/?limit=0').subscribe(res => {
    if (res !== null) {
      const data = <Array<any>>res;
       for (let index = 0; index < data.length; index++) {
         const datos = data[index];
         this.docenteService.get('docentes_por_proyecto/' + datos.ProgramaAcademicoId)
          .subscribe(res_Docentes => {
            const docentes = <Array<any>>res_Docentes['docentesCollection']['docentes'];
            if (Object.keys(docentes).length !== 0) {
              docentes.forEach ( element => {
                if (parseInt(element.identificacion, 10) === datos.PersonaId) {
                  const NombreCompleto = element['nombres'] + ' ' + element['apellidos'];
                  data[index].Persona = element;
                  data[index].Persona.NombreCompleto = NombreCompleto.toUpperCase();
                }
              });
              this.source.load(data);
            }
          });

          this.programaOikosService.get('dependencia/' + datos.ProgramaAcademicoId)
            .subscribe(res_programa => {
              if (res !== null) {
                data[index].ProgramaAcademico = res_programa;
                this.source.load(data);
              }
            });
          }
      }
    });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.uprograma = event.data.ProgramaAcademicoId
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.uprograma = 0;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Entrevistador!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.entrevistaService.get('entrevistador_entrevista/?query=entrevistador_id:' + event.data.Id).subscribe(res => {
          if (Object.keys(res[0]).length === 0) {
            this.entrevistaService.delete('entrevistador', event.data).subscribe(res_del => {
              if (res_del !== null) {
                this.loadData();
                this.showToast('info', 'deleted', 'Entrevistador deleted');
                }
             });
          } else {
            this.showToast('error', 'Error al eliminar', 'Entrevistador ya está asignado a una entrevista');
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
