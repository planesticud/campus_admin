import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { DocenteService } from '../../../@core/data/docente.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-entrevistador-entrevista',
  templateUrl: './list-entrevistador_entrevista.component.html',
  styleUrls: ['./list-entrevistador_entrevista.component.scss'],
  })
export class ListEntrevistadorEntrevistaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private translate: TranslateService,
    private entrevistaService: EntrevistaService,
    private personaService: PersonaService,
    private docenteService: DocenteService,
    private admisionesService: InscripcionService,
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
      },
      // add: {
      //   addButtonContent: '<i class="nb-plus"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      // },
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
        EntrevistaId: {
          title: this.translate.instant('GLOBAL.entrevista'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Id;
          },
        },
        Inscripcion: {
          title: this.translate.instant('GLOBAL.inscripcion'),
          // type: 'entrevista;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Entrevistador: {
          title: this.translate.instant('GLOBAL.entrevistador'),
          // type: 'EntrevistadorId.Id;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Aspirante: {
          title: this.translate.instant('GLOBAL.aspirante'),
          // type: 'EntrevistadorId.Id;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NotaParcial: {
          title: this.translate.instant('GLOBAL.nota_parcial'),
          // type: 'string;',
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
    this.entrevistaService.get('entrevistador_entrevista/?limit=0').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        const data_info = <Array<any>>[];
        data.forEach(element => {
            this.admisionesService.get('inscripcion/' + element.EntrevistaId.InscripcionId).subscribe(inscripcion => {
              if (inscripcion !== null) {
                const datos_inscripcion = <any>inscripcion
                 this.personaService.get('persona/' + datos_inscripcion.PersonaId).subscribe(persona => {
                  if (persona !== null) {
                            const persona2 = <any>persona;
                            element.Aspirante = persona2.PrimerNombre + ' ' + persona2.PrimerApellido;
                            element.Inscripcion = element.EntrevistaId.InscripcionId;
                            data_info.push(element);

                            // this.personaService.get('persona/' + element.EntrevistadorId.PersonaId).subscribe(persona => {
                            this.docenteService.get('docentes_por_proyecto/' + element.EntrevistadorId.ProgramaAcademicoId)
                            .subscribe(res_docente => {
                              const listDocentes = <Array<any>>res_docente['docentesCollection']['docentes'];
                              if (Object.keys(listDocentes).length !== 0) {

                                // const listDocentes = <Array<any>>res_docente["docentesCollection"]["docentes"];
                                if (Object.keys(listDocentes).length !== 0) {
                                      const arrayFilter = listDocentes.filter(e => e.identificacion + '' === element.EntrevistadorId.PersonaId + '');
                                // }

                                       // const entrevistador = <any>res_docente;
                                       const entrevistador = <any>arrayFilter;
                                       element.Entrevistador = entrevistador[0].nombres + ' ' + entrevistador[0].apellidos;
                                       data_info.push(element);
                                       this.source.load(data_info);
                                    }
                             }
                           });
                  }
                });
              }
            });
          });

        this.source.load(data);
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
      text: 'Delete EntrevistadorEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.entrevistaService.delete('entrevistador_entrevista/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'EntrevistadorEntrevista deleted');
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
