
import { Entrevistador } from './../../../@core/data/models/entrevistador';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { DocenteService } from '../../../@core/data/docente.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { FORM_ENTREVISTADOR } from './form-entrevistador';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-entrevistador',
  templateUrl: './crud-entrevistador.component.html',
  styleUrls: ['./crud-entrevistador.component.scss'],
})
export class CrudEntrevistadorComponent implements OnInit {
  config: ToasterConfig;
  entrevistador_id: number;
  programa_id: number;

  @Input('entrevistador_id')
  set name(entrevistador_id: number) {
    this.entrevistador_id = entrevistador_id;
    // this.loadEntrevistador();
  }
  @Input('programa_id')
  set namep(programa_id: number) {
    this.programa_id = programa_id;
    this.loadEntrevistador();
  }

  @Output() eventChange = new EventEmitter();
  // @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_entrevistador: any;
  info_persona: any;
  info_progarama: ProgramaAcademico;
  formEntrevistador: any;
  regEntrevistador: any;
  programaSeleccionado: any;
  clean: boolean;
  // element: any;

  constructor(private translate: TranslateService,
    private entrevistaService: EntrevistaService,
    private docenteService: DocenteService,
    private programaOikosService: ProgramaOikosService,
    private toasterService: ToasterService) {
    this.formEntrevistador = FORM_ENTREVISTADOR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    // this.loadOptionsEntrevistador();
    this.loadOptionsProgramaAcademico();
   }

  construirForm() {
    this.formEntrevistador.titulo = this.translate.instant('GLOBAL.entrevistador');
    this.formEntrevistador.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEntrevistador.campos.length; i++) {
      this.formEntrevistador.campos[i].label = this.translate.instant('GLOBAL.' + this.formEntrevistador.campos[i].label_i18n);
      this.formEntrevistador.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEntrevistador.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEntrevistador.campos.length; index++) {
      const element = this.formEntrevistador.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  getSeleccion(event) {
    if (event.nombre === 'ProgramaAcademico') {
      this.programaSeleccionado = event.valor;
      this.loadOptionsEntrevistador();
    }
  }

  loadOptionsProgramaAcademico(): void {
    let programa: Array<any> = [];
    this.programaOikosService.get('dependencia/?query=DependenciaTipoDependencia.TipoDependenciaId.Id:15')
      .subscribe(res => {
        if (res !== null) {
          programa = <Array<ProgramaAcademico>>res;
        }
        this.formEntrevistador.campos[this.getIndexForm('ProgramaAcademico')].opciones = programa;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.programa_academico') + '|' +
              this.translate.instant('GLOBAL.programa_academico'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
      });
  }

  loadOptionsEntrevistador(): void {
    // const docente: Array<any> = [];
    this.docenteService.get('docentes_por_proyecto/' + this.programaSeleccionado.Id)
      .subscribe(res_docente => {
        if (Object.keys(res_docente['docentesCollection']).length !== 0) {
        const listDocentes = <Array<any>>res_docente['docentesCollection']['docentes'];
        // if (Object.keys(listDocentes).length !== 0) {
          listDocentes.forEach ( (docente: any) => {
            const persona = <any>docente;
            docente['Id'] = parseInt(persona.identificacion, 10);
            docente['Nombre'] = persona.nombres + ' ' + persona.apellidos;
          });
          this.formEntrevistador.campos[this.getIndexForm('EntrevistadorId')].opciones = listDocentes;
        } else {
          Swal({
            type: 'info',
            title: this.translate.instant('GLOBAL.sin_datos'),
            text: this.translate.instant('GLOBAL.info_sin_datos'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
          this.formEntrevistador.campos[this.getIndexForm('EntrevistadorId')].opciones = [];
        }
      });
      // this.formEntrevistadorEntrevista.campos[ this.getIndexForm('EntrevistadorId') ].opciones = entrevistadores;
  }

  public loadEntrevistador(): void {
    // const docente;
    // docente = [];
    if (this.entrevistador_id !== undefined && this.entrevistador_id !== 0) {
      this.entrevistaService.get('entrevistador/?query=id:' + this.entrevistador_id)
        .subscribe(res => {
          if (res !== null) {
            this.regEntrevistador = <any>res[0];
            this.programaOikosService.get('dependencia/' + res[0].ProgramaAcademicoId)
              .subscribe(res_Programa => {
              if (res_Programa !== null) {
                const dataPrograma = <any>res_Programa;
                this.regEntrevistador.ProgramaAcademico = dataPrograma;
                this.docenteService.get('docentes_por_proyecto/' + this.regEntrevistador.ProgramaAcademico.Id)
                  .subscribe(res_docente => {
                    const listDocentes = <Array<any>>res_docente['docentesCollection']['docentes'];
                    if (Object.keys(listDocentes).length !== 0) {
                      const docente: any = listDocentes.filter(e => e.identificacion + '' === this.regEntrevistador.PersonaId + '');
                      const persona = <any>docente[0];
                      docente[0]['Id'] = parseInt(persona.identificacion, 10);
                      docente[0]['Nombre'] = persona.nombres + ' ' + persona.apellidos;
                      this.regEntrevistador.EntrevistadorId = docente[0];
                      this.info_entrevistador = this.regEntrevistador;
                    }
                });
              }
             });
          }
        });
    } else  {
      this.info_entrevistador = undefined;
      this.clean = !this.clean;
    }
  }

  updateEntrevistador(entrevistador: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Entrevistador!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevistador = <Entrevistador>entrevistador;
        this.info_entrevistador.PersonaId = entrevistador.EntrevistadorId.Id;
        this.info_entrevistador.ProgramaAcademicoId = entrevistador.ProgramaAcademico.Id;
        this.entrevistaService.put('entrevistador', this.info_entrevistador)
          .subscribe(res => {
            this.loadEntrevistador();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Entrevistador updated');
          });
      }
    });
  }

  createEntrevistador(entrevistador: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Entrevistador!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevistador = <Entrevistador>entrevistador;
        this.info_entrevistador.PersonaId = entrevistador.EntrevistadorId.Id
        this.info_entrevistador.ProgramaAcademicoId = entrevistador.ProgramaAcademico.Id
        this.info_entrevistador.Activo = entrevistador.Activo
        this.entrevistaService.post('entrevistador', this.info_entrevistador)
          .subscribe(res => {
            this.info_entrevistador = <Entrevistador>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Entrevistador created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadEntrevistador();
  }

  validarForm(event) {
    if (event.valid) {
        // alert("Cambio");
      if (this.info_entrevistador === undefined) {
        this.createEntrevistador(event.data.Entrevistador);
      } else {
        this.updateEntrevistador(event.data.Entrevistador);
      }
    }
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
