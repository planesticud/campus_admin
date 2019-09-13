import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { CoreService } from '../../../@core/data/core.service';
// import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-asignar-entrevista',
  templateUrl: './list-asignar_entrevista.component.html',
  styleUrls: ['./list-asignar_entrevista.component.scss'],
  })
export class ListAsignarEntrevistaComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    // private entrevistaService: EntrevistaService,
    private coreService: CoreService,
    private inscripcionService: InscripcionService,
    private personaService: PersonaService,
    private entrevistaService: EntrevistaService,
    private programaAcademicoService: ProgramaAcademicoService,
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
      // add: {
      //   addButtonContent: '<i class="nb-plus"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      // },
      edit: {
        // editButtonContent: '<i class="nb-plus-circled" title="Asignar nueva entrevista"></i>',
        editButtonContent: '<i class="nb-plus-circled" title="' + this.translate.instant('GLOBAL.asignar_nueva_entrevista') + '"></i>',
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
        PeriodoId: {
          title: this.translate.instant('GLOBAL.periodo_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Aspirante: {
          title: this.translate.instant('GLOBAL.aspirante'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        EntrevistasAsignadas: {
          title: this.translate.instant('GLOBAL.entrevistas_asignadas'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        // EstadoEntrevista: {
        //   title: this.translate.instant('GLOBAL.estado_entrevista'),
        //   // type: 'estado_entrevista;',
        //   valuePrepareFunction: (value) => {
        //     return value;
        //   },
        // },
        // TipoEntrevista: {
        //   title: this.translate.instant('GLOBAL.tipo_entrevista'),
        //   // type: 'tipo_entrevista;',
        //   valuePrepareFunction: (value) => {
        //     return value;
        //   },
        // },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.inscripcionService.get('inscripcion/?query=estado_inscripcion_id:3').subscribe(res => { // TODO: Cambiar el estado al codigo correspondiente
      if (res !== null) {
        const data = <Array<any>>res;
        const data_info = <Array<any>>[];
        // let cantEntrevistas = 0;
        data.forEach(element => {
            this.entrevistaService.get('entrevista/?query=InscripcionId:' + element.Id).subscribe(entrevista => {
              if (entrevista != null) {
                const dataEntrevista = <Array<any>>entrevista;
                  if (JSON.stringify(entrevista) === '[{}]') {
                    element.EntrevistasAsignadas = 0;
                  } else {
                    element.EntrevistasAsignadas = Object.keys(dataEntrevista).length
                  }
              }
              this.programaAcademicoService.get('programa_academico/' + element.ProgramaAcademicoId).subscribe(programa => {
                if (programa !== null) {
                  const dataPrograma = <any>programa;
                  element.ProgramaAcademicoId = dataPrograma;
                }
              });
              this.coreService.get('periodo/' + element.PeriodoId).subscribe(periodo => {
                if (periodo !== null) {
                  const dataPrograma = <any>periodo;
                  element.PeriodoId = dataPrograma;
                }
              });
              this.personaService.get('persona/' + element.PersonaId).subscribe(persona => {
                if (persona !== null) {
                          const persona2 = <any>persona;
                          // element.Aspirante = JSON.stringify(persona2);
                          element.Aspirante = persona2.PrimerNombre + ' ' + persona2.PrimerApellido;
                          data_info.push(element);
                          this.source.load(data_info);

                }
              });
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
    this.uid = event.data.Id;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Entrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.inscripcionService.delete('entrevista/', event.data).subscribe(res => { // Cambiar por asignar entrevista, no se eliminan
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Entrevista deleted');
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
