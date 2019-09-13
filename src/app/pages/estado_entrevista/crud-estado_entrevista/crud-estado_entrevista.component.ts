
import { EstadoEntrevista } from './../../../@core/data/models/estado_entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { FORM_ESTADO_ENTREVISTA } from './form-estado_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-estado-entrevista',
  templateUrl: './crud-estado_entrevista.component.html',
  styleUrls: ['./crud-estado_entrevista.component.scss'],
})
export class CrudEstadoEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  estado_entrevista_id: number;

  @Input('estado_entrevista_id')
  set name(estado_entrevista_id: number) {
    this.estado_entrevista_id = estado_entrevista_id;
    this.loadEstadoEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_estado_entrevista: EstadoEntrevista;
  formEstadoEntrevista: any;
  regEstadoEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService, private entrevistaService: EntrevistaService, private toasterService: ToasterService) {
    this.formEstadoEntrevista = FORM_ESTADO_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formEstadoEntrevista.titulo = this.translate.instant('GLOBAL.estado_entrevista');
    this.formEstadoEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formEstadoEntrevista.campos.length; i++) {
      this.formEstadoEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formEstadoEntrevista.campos[i].label_i18n);
      this.formEstadoEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formEstadoEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formEstadoEntrevista.campos.length; index++) {
      const element = this.formEstadoEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadEstadoEntrevista(): void {
    if (this.estado_entrevista_id !== undefined && this.estado_entrevista_id !== 0) {
      this.entrevistaService.get('estado_entrevista/?query=id:' + this.estado_entrevista_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_estado_entrevista = <EstadoEntrevista>res[0];
          }
        });
    } else  {
      this.info_estado_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateEstadoEntrevista(estadoEntrevista: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update EstadoEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_estado_entrevista = <EstadoEntrevista>estadoEntrevista;
        this.entrevistaService.put('estado_entrevista', this.info_estado_entrevista)
          .subscribe(res => {
            this.loadEstadoEntrevista();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'EstadoEntrevista updated');
          });
      }
    });
  }

  createEstadoEntrevista(estadoEntrevista: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create EstadoEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_estado_entrevista = <EstadoEntrevista>estadoEntrevista;
        this.entrevistaService.post('estado_entrevista', this.info_estado_entrevista)
          .subscribe(res => {
            this.info_estado_entrevista = <EstadoEntrevista>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'EstadoEntrevista created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadEstadoEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_estado_entrevista === undefined) {
        this.createEstadoEntrevista(event.data.EstadoEntrevista);
      } else {
        this.updateEstadoEntrevista(event.data.EstadoEntrevista);
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
