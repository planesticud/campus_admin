import { Component, OnInit } from '@angular/core';
 import { LocalDataSource } from 'ng2-smart-table';
import { RequisitoService } from '../../../@core/data/requisito.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import * as XLSX from 'ts-xlsx';
import { RequisitoProgramaAcademico } from './../../../@core/data/models/requisito_programa_academico';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
// import { EnteService } from '../../../@core/data/ente.service';
// import { PersonaService } from '../../../@core/data/persona.service';

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
  file: File;
  excel = [];
  arrayBuffer: any;
  selectedValueRequisitoProgramaAcademico: any;
  listRequisitoProgramaAcademico: any = [];
  busqueda: boolean; // se usa en la seccion de subir las notas, para saber si es entrevista o idioma
  resultados_notas = [];
  modelRequisitoProgramaAcademico: any;
  progAcadId = '2';
  perId = '1';
  // carga = 'false';
  constructor(private translate: TranslateService,
    private requisitoService: RequisitoService,
    private inscripcionService: InscripcionService,
    private campusMidService: CampusMidService,
   // private enteService: EnteService,
   // private personaService: PersonaService,
    private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.cargarCampos(); });
    this.loadRequisitoProgramaAcademico();
}

  public loadRequisitoProgramaAcademico(): void {
    this.requisitoService.get('requisito_programa_academico/?query=ProgramaAcademicoId:' +
    this.progAcadId + '&PeriodoId:' + this.perId)
      .subscribe(res => {
        const requisitoProgramaAcademico = <Array<RequisitoProgramaAcademico>>res;
        if (res !== null) {
          this.listRequisitoProgramaAcademico = requisitoProgramaAcademico;
        }
      });
  }

  cargarCampos() {
    this.settings = {
      actions: {
        add: true,
      delete: false,
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
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        identificacionP: {
          title: this.translate.instant('GLOBAL.persona_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        nombreCompleto: {
          title: this.translate.instant('GLOBAL.persona_id'),
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
        /* EntrevistaId: {
          title: this.translate.instant('GLOBAL.entrevista_id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        }, */
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
        let i = 0;
        this.data.forEach(ind => {
          if (ind.EntrevistaId !== null) {
            this.data.splice(i, 1);
          }
          i = i + 1;
        });
      this.source.load(this.data);
      this.data.forEach(element => {
          this.inscripcionService.get('inscripcion/' + element.InscripcionId)
          .subscribe(res2 => {
            if (res2 !== null) {
              const objIns = <any>res2;
              element.PersonaId = objIns.PersonaId;
              this.campusMidService.get('persona/ConsultaPersona/?id=' + element.PersonaId)
              .subscribe(res3 => {
                if (res3 !== null) {
                  element.nombreCompleto = `${res3['PrimerApellido']} ${res3['SegundoApellido']}
                  ${res3['PrimerNombre']} ${res3['SegundoNombre']}`
                  element.nombreCompleto = element.nombreCompleto.toUpperCase();
                  element.identificacionP = res3['NumeroDocumento'];
                  this.source.load(this.data);
                }
              });
            }
          });
        });
       }
    });
  }

  loadData2(): void {
    this.requisitoService.get('evaluacion_inscripcion/?query=RequisitoProgramaAcademicoId.RequisitoId.Id:' +
    this.modelRequisitoProgramaAcademico +
    '&RequisitoProgramaAcademicoId.ProgramaAcademicoId:' + this.progAcadId +
    '&RequisitoProgramaAcademicoId.PeriodoId:' + this.perId)
    .subscribe(res => {
      if (res !== null) {
        this.data = <Array<any>>res;
       // console.info("lala");
        let i = 0;
        this.data.forEach(ind => {
          if (ind.EntrevistaId !== null) {
            this.data.splice(i, 1);
          }
          i = i + 1;
        });
      this.source.load(this.data);
      this.data.forEach(element => {
          this.inscripcionService.get('inscripcion/' + element.InscripcionId)
          .subscribe(res2 => {
            if (res2 !== null) {
              const objIns = <any>res2;
              element.PersonaId = objIns.PersonaId;
              this.campusMidService.get('persona/ConsultaPersona/?id=' + element.PersonaId)
              .subscribe(res3 => {
                if (res3 !== null) {
                  element.nombreCompleto = `${res3['PrimerApellido']} ${res3['SegundoApellido']}
                  ${res3['PrimerNombre']} ${res3['SegundoNombre']}`
                  element.nombreCompleto = element.nombreCompleto.toUpperCase();
                  element.identificacionP = res3['NumeroDocumento'];
                  this.source.load(this.data);
                }
              });
              }
          });
        });
       }
    });
  }

  // btn cargur notas
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      // console.info(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.excel = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      // console.info(this.excel);
     // console.info("Entro a upload");
      this.AsignarNotasExcel();
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  AsignarNotasExcel() {
    for (let index = 0; index < this.excel.length; index++) {
      const carga = this.excel[index];
     // console.info("Entro for 1");
      this.data.forEach(element => {
               if ((carga['Documento'].toString() === element.identificacionP) &&
          (element.RequisitoProgramaAcademicoId.RequisitoId.Id.toString() ===
          this.modelRequisitoProgramaAcademico.toString())) {
                     element.NotaFinal = carga['Nota'];
             delete(element.identificacionP);
             delete(element.nombreCompleto);
            // console.info(JSON.stringify(element));
             this.requisitoService.put('evaluacion_inscripcion', element)
             .subscribe(res4 => {
                this.loadData2();
              });
            }
        });
      }
  }

  // fin btn cargue notas
  ngOnInit() {
  }
 onExito(reqId) {
    // console.info('CambioComboBox: '+ reqId);
    this.modelRequisitoProgramaAcademico = reqId;
    this.loadData2();
    // ... do other stuff here ...
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
