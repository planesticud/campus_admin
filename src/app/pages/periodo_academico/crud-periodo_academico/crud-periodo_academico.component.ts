
import { PeriodoAcademico } from './../../../@core/data/models/periodo_academico';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { FORM_PERIODO_ACADEMICO } from './form-periodo_academico';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-periodo-academico',
  templateUrl: './crud-periodo_academico.component.html',
  styleUrls: ['./crud-periodo_academico.component.scss'],
})
export class CrudPeriodoAcademicoComponent implements OnInit {
  config: ToasterConfig;
  periodo_academico_id: number;

  @Input('periodo_academico_id')
  set name(periodo_academico_id: number) {
    this.periodo_academico_id = periodo_academico_id;
    this.loadPeriodoAcademico();
  }

  @Output() eventChange = new EventEmitter();

  info_periodo_academico: PeriodoAcademico;
  formPeriodoAcademico: any;
  regPeriodoAcademico: any;
  clean: boolean;

  constructor(private translate: TranslateService, private admisionesService: AdmisionesService, private toasterService: ToasterService) {
    this.formPeriodoAcademico = FORM_PERIODO_ACADEMICO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formPeriodoAcademico.titulo = this.translate.instant('GLOBAL.periodo_academico');
    this.formPeriodoAcademico.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPeriodoAcademico.campos.length; i++) {
      this.formPeriodoAcademico.campos[i].label = this.translate.instant('GLOBAL.' + this.formPeriodoAcademico.campos[i].label_i18n);
      this.formPeriodoAcademico.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPeriodoAcademico.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPeriodoAcademico.campos.length; index++) {
      const element = this.formPeriodoAcademico.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadPeriodoAcademico(): void {
    if (this.periodo_academico_id !== undefined && this.periodo_academico_id !== 0) {
      this.admisionesService.get('periodo_academico/?query=id:' + this.periodo_academico_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_periodo_academico = <PeriodoAcademico>res[0];
          }
        });
    } else  {
      this.info_periodo_academico = undefined;
      this.clean = !this.clean;
    }
  }

  updatePeriodoAcademico(periodoAcademico: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update PeriodoAcademico!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_periodo_academico = <PeriodoAcademico>periodoAcademico;
        this.admisionesService.put('periodo_academico', this.info_periodo_academico)
          .subscribe(res => {
            this.loadPeriodoAcademico();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'PeriodoAcademico updated');
          });
      }
    });
  }

  createPeriodoAcademico(periodoAcademico: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create PeriodoAcademico!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_periodo_academico = <PeriodoAcademico>periodoAcademico;
        this.admisionesService.post('periodo_academico', this.info_periodo_academico)
          .subscribe(res => {
            this.info_periodo_academico = <PeriodoAcademico>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'PeriodoAcademico created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadPeriodoAcademico();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_periodo_academico === undefined) {
        this.createPeriodoAcademico(event.data.PeriodoAcademico);
      } else {
        this.updatePeriodoAcademico(event.data.PeriodoAcademico);
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
