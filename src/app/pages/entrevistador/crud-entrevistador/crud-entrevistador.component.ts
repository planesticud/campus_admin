
import { Entrevistador } from './../../../@core/data/models/entrevistador';
import { Persona } from './../../../@core/data/models/persona';
import { ProgramaAcademico } from './../../../@core/data/models/programa_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { FORM_ENTREVISTADOR } from './form-entrevistador';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
// import { MatLabe } from '@angular/material/label_i18n';

@Component({
  selector: 'ngx-crud-entrevistador',
  templateUrl: './crud-entrevistador.component.html',
  styleUrls: ['./crud-entrevistador.component.scss'],
})
export class CrudEntrevistadorComponent implements OnInit {
  config: ToasterConfig;
  entrevistador_id: number;

  @Input('entrevistador_id')
  set name(entrevistador_id: number) {
    this.entrevistador_id = entrevistador_id;
    this.loadEntrevistador();
  }

  @Output() eventChange = new EventEmitter();

  info_entrevistador: any;
  info_persona: any;
  info_progarama: ProgramaAcademico;
  formEntrevistador: any;
  regEntrevistador: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private entrevistaService: EntrevistaService,
    private personaService: PersonaService,
    private programaAcademicoService: ProgramaAcademicoService,
    private toasterService: ToasterService) {
    this.formEntrevistador = FORM_ENTREVISTADOR;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEntrevistador();
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

  loadOptionsProgramaAcademico(): void {
    let programa: Array<any> = [];
    this.programaAcademicoService.get('programa_academico/?limit=10')
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
              this.translate.instant('GLOBAL.descuento_matricula') + '|' +
              this.translate.instant('GLOBAL.tipo_descuento_matricula'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }
  loadOptionsEntrevistador(): void {
    let entrevistador: Array<any> = [];
    const data_entrevistador = <Array<any>>[];
    this.personaService.get('persona/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          entrevistador = <Array<Persona>>res;
          entrevistador.forEach ( element => {
            // data_entrevistador = element
            element.NombreCompleto = (element.PrimerNombre).toUpperCase() + ' ' + (element.PrimerApellido).toUpperCase();
            element.NombreCompleto = element.PrimerApellido + ' ' + element.SegundoApellido
            + ' ' + element.PrimerNombre + ' ' + element.SegundoNombre;

            data_entrevistador.push(element);
            // console.info ('Datos: ' + JSON.stringify(data_entrevistador));
          });
        }
        this.formEntrevistador.campos[this.getIndexForm('Persona')].opciones = data_entrevistador;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.descuento_matricula') + '|' +
              this.translate.instant('GLOBAL.tipo_descuento_matricula'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadEntrevistador(): void {
    if (this.entrevistador_id !== undefined && this.entrevistador_id !== 0) {
      this.entrevistaService.get('entrevistador/?query=id:' + this.entrevistador_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_entrevistador = <any>res[0];
            // console.info ('InfoEntrevistador: ' + JSON.stringify(res[0]));
           this.programaAcademicoService.get('programa_academico/' + res[0].ProgramaAcademicoId)
            .subscribe(res_Programa => {
              if (res_Programa !== null) {
                const dataPrograma = <any>res_Programa;
                this.info_entrevistador.ProgramaAcademico = dataPrograma
                // console.info ('InfoEntrevistador2: ' + JSON.stringify(res[0]));
              }
            });
            this.personaService.get('persona/' + res[0].PersonaId)
             .subscribe(res_Persona => {
               if (res_Persona !== null) {
                 // console.info ('PrePersonita:' + JSON.stringify(res_Persona) );
                 const dataPersona = <any>res_Persona;
                 // console.info ('Personita:' + JSON.stringify(this.info_persona) );
                 dataPersona.NombreCompleto = dataPersona['PrimerNombre'] + ' ' + dataPersona['PrimerApellido']
                 this.info_entrevistador.Persona = dataPersona;
                 // this.info_programa.Nombre = 'Prog'
                 // console.info ('Personita2:' + JSON.stringify(this.info_entrevistador) );
               }
             })
          }
        });
        console.info ('INFOPER:' + JSON.stringify(this.info_entrevistador) );
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
        // console.info('MiGaurdar: ' + JSON.stringify(this.info_entrevistador))
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
        // console.info('AntesCrear: ' + JSON.stringify(entrevistador))
        this.info_entrevistador.Persona = entrevistador.Persona.Id
        this.info_entrevistador.ProgramaAcademico = entrevistador.ProgramaAcademico.Id
        this.info_entrevistador.Activo = entrevistador.Activo
        // console.info('MiCrear: ' + JSON.stringify(this.info_entrevistador))
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
