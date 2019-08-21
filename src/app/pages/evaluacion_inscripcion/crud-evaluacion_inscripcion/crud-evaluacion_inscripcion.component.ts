import { EvaluacionInscripcion } from './../../../@core/data/models/evaluacion_inscripcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequisitoService } from '../../../@core/data/requisito.service';
import { RequisitoProgramaAcademico } from './../../../@core/data/models/requisito_programa_academico';
import { Entrevista } from './../../../@core/data/models/entrevista';
import { FORM_EVALUACION_INSCRIPCION } from './form-evaluacion_inscripcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-evaluacion-inscripcion',
  templateUrl: './crud-evaluacion_inscripcion.component.html',
  styleUrls: ['./crud-evaluacion_inscripcion.component.scss'],
})
export class CrudEvaluacionInscripcionComponent implements OnInit {
  config: ToasterConfig;
  evaluacion_inscripcion_id: number;

  @Input('evaluacion_inscripcion_id')
  set name(evaluacion_inscripcion_id: number) {
    this.evaluacion_inscripcion_id = evaluacion_inscripcion_id;
    this.loadEvaluacionInscripcion();
  }

  @Output() eventChange = new EventEmitter();

  info_evaluacion_inscripcion: EvaluacionInscripcion;
  formEvaluacionInscripcion: any;
  regEvaluacionInscripcion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private requisitoService: RequisitoService,
    private toasterService: ToasterService) {
    this.formEvaluacionInscripcion = FORM_EVALUACION_INSCRIPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.construirForm();
    });
    this.loadRequisitoProgramaAcademico();
    this.loadEntrevista();
  }

  construirForm() {
    this.formEvaluacionInscripcion.titulo = this.translate.instant('GLOBAL.evaluacion_inscripcion');
    this.formEvaluacionInscripcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEvaluacionInscripcion.campos.length; i++) {
      this.formEvaluacionInscripcion.campos[i].label = this.translate.instant('GLOBAL.' +
      this.formEvaluacionInscripcion.campos[i].label_i18n);
      this.formEvaluacionInscripcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
      this.formEvaluacionInscripcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEvaluacionInscripcion.campos.length; index++) {
      const element = this.formEvaluacionInscripcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadRequisitoProgramaAcademico(): void {
    this.requisitoService.get('requisito_programa_academico/?limit=0')
      .subscribe(res => {
        const requisitoProgramaAcademico = <Array<RequisitoProgramaAcademico>>res;
        if (res !== null) {
          this.formEvaluacionInscripcion.campos[this.getIndexForm('RequisitoProgramaAcademicoId')].opciones = requisitoProgramaAcademico;
        }
      });
  }

  public loadEntrevista(): void {
    this.requisitoService.get('entrevista/?limit=0')
      .subscribe(res => {
        const entrevista = <Array<Entrevista>>res;
        if (res !== null) {
          this.formEvaluacionInscripcion.campos[this.getIndexForm('EntrevistaId')].opciones = entrevista;
        }
      });
  }

  public loadEvaluacionInscripcion(): void {
     if (this.evaluacion_inscripcion_id !== undefined && this.evaluacion_inscripcion_id !== 0) {
       this.requisitoService.get('evaluacion_inscripcion/?query=Id:' + this.evaluacion_inscripcion_id)
         .subscribe(res => {
           if (res !== null) {
             const info = <EvaluacionInscripcion>res[0];
             info.RequisitoProgramaAcademicoId.Nombre = info.RequisitoProgramaAcademicoId.RequisitoId.Nombre;
             this.info_evaluacion_inscripcion = info;
          }
         });
     } else  {
       this.info_evaluacion_inscripcion = undefined;
       this.clean = !this.clean;
     }
  }

  updateEvaluacionInscripcion(evaluacionInscripcion: any): void {
    const opt: any = {
      title: 'Update?',
      text: 'Update EvaluacionInscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_evaluacion_inscripcion = <EvaluacionInscripcion>evaluacionInscripcion;
        const requisito_ProgramaAcademico = this.info_evaluacion_inscripcion.RequisitoProgramaAcademicoId;
        const entrevista2 = this.info_evaluacion_inscripcion.EntrevistaId;
        this.info_evaluacion_inscripcion.RequisitoProgramaAcademicoId = <any>requisito_ProgramaAcademico;
        this.info_evaluacion_inscripcion.EntrevistaId = <any>entrevista2;
        this.requisitoService.put('evaluacion_inscripcion', this.info_evaluacion_inscripcion)
          .subscribe(res => {
            this.loadEvaluacionInscripcion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'EvaluacionInscripcion updated');
          });
      }
    });
  }

  createEvaluacionInscripcion(evaluacionInscripcion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create EvaluacionInscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_evaluacion_inscripcion = <EvaluacionInscripcion>evaluacionInscripcion;
        const requisito_ProgramaAcademico = this.info_evaluacion_inscripcion.RequisitoProgramaAcademicoId;
        const entrevista2 = this.info_evaluacion_inscripcion.EntrevistaId;
        this.info_evaluacion_inscripcion.RequisitoProgramaAcademicoId = <any>requisito_ProgramaAcademico;
        this.info_evaluacion_inscripcion.EntrevistaId = <any>entrevista2;
        this.requisitoService.post('evaluacion_inscripcion', this.info_evaluacion_inscripcion)
          .subscribe(res => {
            this.info_evaluacion_inscripcion = <EvaluacionInscripcion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'EvaluacionInscripcion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadEvaluacionInscripcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_evaluacion_inscripcion === undefined) {
        this.createEvaluacionInscripcion(event.data.EvaluacionInscripcion);
      } else {
        this.updateEvaluacionInscripcion(event.data.EvaluacionInscripcion);
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
