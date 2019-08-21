
import { Periodo } from './../../../@core/data/models/periodo';
import { Requisito } from './../../../@core/data/models/requisito';
import { RequisitoProgramaAcademico } from './../../../@core/data/models/requisito_programa_academico';
import { ProgramaAcademico } from './../../../@core/data/models/programa.academico';
import { ProgramaAcademicoService } from './../../../@core/data/programa.academico.service';
import { CoreService } from '../../../@core/data/core.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequisitoService } from '../../../@core/data/requisito.service';
import { FORM_REQUISITO_PROGRAMA_ACADEMICO } from './form-requisito_programa_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-requisito-programa-academico',
  templateUrl: './crud-requisito_programa_academico.component.html',
  styleUrls: ['./crud-requisito_programa_academico.component.scss'],
})
export class CrudRequisitoProgramaAcademicoComponent implements OnInit {
  config: ToasterConfig;
  requisito_programa_academico_id: number;
  @Input('requisito_programa_academico_id')
  set name(requisito_programa_academico_id: number) {
    this.requisito_programa_academico_id = requisito_programa_academico_id;
    this.loadRequisitoProgramaAcademico();
  }

  @Output() eventChange = new EventEmitter();

  info_requisito_programa_academico: RequisitoProgramaAcademico;
  formRequisitoProgramaAcademico: any;
  regRequisitoProgramaAcademico: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private requisitoService: RequisitoService,
    private coreService: CoreService,
    private programaAcademicoService: ProgramaAcademicoService,
    private toasterService: ToasterService) {
    this.formRequisitoProgramaAcademico = FORM_REQUISITO_PROGRAMA_ACADEMICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.construirForm();
    });
    this.loadPeriodo();
    this.loadRequisito();
    this.loadProgramaAcademico();
   }

  construirForm() {
    this.formRequisitoProgramaAcademico.titulo = this.translate.instant('GLOBAL.requisito_programa_academico');
    this.formRequisitoProgramaAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formRequisitoProgramaAcademico.campos.length; i++) {
      this.formRequisitoProgramaAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formRequisitoProgramaAcademico.campos[i].label_i18n);
      this.formRequisitoProgramaAcademico.campos[i]
      .placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formRequisitoProgramaAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formRequisitoProgramaAcademico.campos.length; index++) {
      const element = this.formRequisitoProgramaAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public loadPeriodo(): void {
    this.coreService.get('periodo/?limit=0')
      .subscribe(res => {
        const periodo = <Array<Periodo>>res;
        if (res !== null) {
          this.formRequisitoProgramaAcademico.campos[this.getIndexForm('PeriodoId')].opciones = periodo;
        }
      });
  }

  public loadRequisito(): void {
    this.requisitoService.get('requisito/?limit=0')
      .subscribe(res => {
        const requisito = <Array<Requisito>>res;
        if (res !== null) {
          this.formRequisitoProgramaAcademico.campos[this.getIndexForm('RequisitoId')].opciones = requisito;
        }
      });
  }

  public loadProgramaAcademico(): void {
    this.programaAcademicoService.get('programa_academico/?limit=0')
      .subscribe(res => {
        const programaAcademico = <Array<ProgramaAcademico>>res;
        if (res !== null) {
          this.formRequisitoProgramaAcademico.campos[this.getIndexForm('ProgramaAcademicoId')].opciones = programaAcademico;
        }
      });
  }

  public loadRequisitoProgramaAcademico(): void {
    if (this.requisito_programa_academico_id !== undefined && this.requisito_programa_academico_id !== 0) {
      this.requisitoService.get('requisito_programa_academico/?query=id:' + this.requisito_programa_academico_id)
        .subscribe(res => {
          if (res !== null) {
            const info = <RequisitoProgramaAcademico>res[0];
            this.coreService.get('periodo/' + info.PeriodoId)
              .subscribe(res2 => {
                const periodo = <Periodo>res2;
                if (res2 !== null) {
                  info.PeriodoId = periodo;
                  this.requisitoService.get('requisito/' + info.RequisitoId.Id)
                  .subscribe(res3 => {
                    const requisito = <Requisito>res3;
                    if (res3 !== null) {
                      info.RequisitoId = requisito;
                      this.programaAcademicoService.get('programa_academico/' + info.ProgramaAcademicoId)
                      .subscribe(res4 => {
                        const programaAcademico = <ProgramaAcademico>res4;
                        if (res4 !== null) {
                          info.ProgramaAcademicoId = programaAcademico;
                          this.info_requisito_programa_academico = info;
                        }
                      });
                    }
                   });
                }
              });
          }
        });
    } else  {
      this.info_requisito_programa_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updateRequisitoProgramaAcademico(requisitoProgramaAcademico: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update RequisitoProgramaAcademico!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_requisito_programa_academico = <RequisitoProgramaAcademico>requisitoProgramaAcademico;
        const periodo = this.info_requisito_programa_academico.PeriodoId.Id;
        const programa_academico = this.info_requisito_programa_academico.ProgramaAcademicoId.Id;
        this.info_requisito_programa_academico.PeriodoId = <any>periodo;
        this.info_requisito_programa_academico.ProgramaAcademicoId = <any>programa_academico;
        this.requisitoService.put('requisito_programa_academico', this.info_requisito_programa_academico)
          .subscribe(res => {
            this.loadRequisitoProgramaAcademico();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'RequisitoProgramaAcademico updated');
          });
      }
    });
  }

  createRequisitoProgramaAcademico(requisitoProgramaAcademico: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create RequisitoProgramaAcademico!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_requisito_programa_academico = <RequisitoProgramaAcademico>requisitoProgramaAcademico;
        const periodo = this.info_requisito_programa_academico.PeriodoId.Id;
        const programa_academico = this.info_requisito_programa_academico.ProgramaAcademicoId.Id;
        this.info_requisito_programa_academico.PeriodoId = <any>periodo;
        this.info_requisito_programa_academico.ProgramaAcademicoId = <any>programa_academico;
        this.requisitoService.post('requisito_programa_academico', this.info_requisito_programa_academico)
          .subscribe(res => {
            this.info_requisito_programa_academico = <RequisitoProgramaAcademico>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'RequisitoProgramaAcademico created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadRequisitoProgramaAcademico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_requisito_programa_academico === undefined) {
        this.createRequisitoProgramaAcademico(event.data.RequisitoProgramaAcademico);
      } else {
        this.updateRequisitoProgramaAcademico(event.data.RequisitoProgramaAcademico);
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
