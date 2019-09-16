import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SelecadmitidosService } from '../../../@core/data/selecadmitidos.service';
import { CoreService } from '../../../@core/data/core.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { EnteCrudService } from '../../../@core/data/ente.crud.service';
import { Identificacion } from '../../../@core/data/models/identificacion';
import { EvaluacionService } from '../../../@core/data/evaluacion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-inscripcion',
  templateUrl: './list-inscripcion.component.html',
  styleUrls: ['./list-inscripcion.component.scss'],
  })
export class ListInscripcionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;
  nombreCompleto: string = '';
  cupos_adm: any;
  cupos_opc: any;
  selectedValuePrograma = '2';
  selecteValuePeriodo = '1';
  constructor(private translate: TranslateService,
    private selecadmitidosService: SelecadmitidosService,
    private coreService: CoreService,
    private personaService: PersonaService,
    private enteCrudService: EnteCrudService,
    private evalucionService: EvaluacionService,
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
        PersonaId: {
          title: this.translate.instant('GLOBAL.persona_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
           this.nombreCompleto = value.PrimerNombre + ' ' + value.SegundoNombre + ' ' + value.PrimerApellido +
           ' ' + value.SegundoApellido;
            return this.nombreCompleto.toUpperCase();
          },
        },
        IdentificacionId: {
          title: this.translate.instant('identificacion_id'),
          // type: 'number;',
            valuePrepareFunction: (value) => {
            // this.identificacion = value.TipoIdentificacion.CodigoAbreviacion + " " + value.NumeroIdentificacion;
            return value;
           },
        },
        ProgramaAcademicoId: {
          title: this.translate.instant('GLOBAL.programa_academico_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ReciboMatriculaId: {
          title: this.translate.instant('GLOBAL.recibo_matricula_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        ReciboInscripcionId: {
          title: this.translate.instant('GLOBAL.recibo_inscripcion_id'),
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
        EnfasisId: {
          title: this.translate.instant('GLOBAL.enfasis_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        AceptaTerminos: {
          title: this.translate.instant('GLOBAL.acepta_terminos'),
          // type: 'boolean;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaAceptaTerminos: {
          title: this.translate.instant('GLOBAL.fecha_acepta_terminos'),
          // type: 'string;',
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
        EstadoInscripcionId: {
          title: this.translate.instant('GLOBAL.estado_inscripcion_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        TipoInscripcionId: {
          title: this.translate.instant('GLOBAL.tipo_inscripcion_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        PuntajeTotal: {
          title: this.translate.instant('GLOBAL.puntaje_total'),
          // type: 'number;',
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
    this.selecadmitidosService.get('inscripcion/?query=ProgramaAcademicoId:' + this.selectedValuePrograma +
    '&PeriodoId:' + this.selecteValuePeriodo + '&sortby=PuntajeTotal&order=desc')
    .subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.coreService.get('periodo/' + element.PeriodoId)
          .subscribe(res2 => {
            if (res2 !== null) {
              element.PeriodoId = <any>res2;
              this.personaService.get('persona/' + element.PersonaId)
              .subscribe(res3 => {
                if (res3 !== null) {
                  element.PersonaId = <any>res3;
                  this.enteCrudService.get('identificacion/?query=ente:' + element.PersonaId.Ente)
                  .subscribe(res4 => {
                  if (res4 !== null) {
                      const identificacion: Identificacion = <any>res4[0];
                      element.IdentificacionId = identificacion.TipoIdentificacion.CodigoAbreviacion +
                      ' ' + identificacion.NumeroIdentificacion;
                      this.source.load(this.data);
          }
        });
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
      text: 'Delete Inscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.selecadmitidosService.delete('inscripcion/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Inscripcion deleted');
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

  // Marca estados de inscritos a admitidos y inscritos a opcionados
  marcarEstados() {
    this.evalucionService.get('cupos_por_dependencia/?query=DependenciaId:' +
    this.selectedValuePrograma + '&PeriodoId:' + this.selecteValuePeriodo + '&Activo:true')
    .subscribe(res => {
      if (res !== null) {
        this.cupos_adm = <any>res[0].CuposHabilitados;
        this.cupos_opc = <any>res[0].CuposOpcionados;
        }
    });
    this.selecadmitidosService.get('inscripcion/?query=ProgramaAcademicoId:' + this.selectedValuePrograma +
    '&PeriodoId:' + this.selecteValuePeriodo + '&sortby=PuntajeTotal&order=desc')
    .subscribe(res2 => {
      if (res2 !== null) {
        const data2 = <Array<any>>res2;
        let adm1 = this.cupos_adm;
        let opc1 = this.cupos_opc;
        data2.forEach(elemento => {
          if (adm1 > 0) {
              elemento.EstadoInscripcionId.Id = 4;
              adm1 = adm1 - 1;
            }else if (opc1 > 0) {
              elemento.EstadoInscripcionId.Id = 5;
              opc1 = opc1 - 1;
                    }
            this.selecadmitidosService.put('inscripcion', elemento)
            .subscribe(res4 => {
            this.loadData();
            });
         });
       }
    });
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
