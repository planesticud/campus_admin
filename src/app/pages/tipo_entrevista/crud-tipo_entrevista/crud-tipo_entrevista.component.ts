
import { TipoEntrevista } from './../../../@core/data/models/tipo_entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { FORM_TIPO_ENTREVISTA } from './form-tipo_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-tipo-entrevista',
  templateUrl: './crud-tipo_entrevista.component.html',
  styleUrls: ['./crud-tipo_entrevista.component.scss'],
})
export class CrudTipoEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  tipo_entrevista_id: number;

  @Input('tipo_entrevista_id')
  set name(tipo_entrevista_id: number) {
    this.tipo_entrevista_id = tipo_entrevista_id;
    this.loadTipoEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_tipo_entrevista: TipoEntrevista;
  formTipoEntrevista: any;
  regTipoEntrevista: any;
  clean: boolean;

  constructor(private translate: TranslateService, private entrevistaService: EntrevistaService, private toasterService: ToasterService) {
    this.formTipoEntrevista = FORM_TIPO_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  construirForm() {
    this.formTipoEntrevista.titulo = this.translate.instant('GLOBAL.tipo_entrevista');
    this.formTipoEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formTipoEntrevista.campos.length; i++) {
      this.formTipoEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formTipoEntrevista.campos[i].label_i18n);
      this.formTipoEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formTipoEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formTipoEntrevista.campos.length; index++) {
      const element = this.formTipoEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadTipoEntrevista(): void {
    if (this.tipo_entrevista_id !== undefined && this.tipo_entrevista_id !== 0) {
      this.entrevistaService.get('tipo_entrevista/?query=id:' + this.tipo_entrevista_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_tipo_entrevista = <TipoEntrevista>res[0];
          }
        });
    } else  {
      this.info_tipo_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  updateTipoEntrevista(tipoEntrevista: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update TipoEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_entrevista = <TipoEntrevista>tipoEntrevista;
        this.entrevistaService.put('tipo_entrevista', this.info_tipo_entrevista)
          .subscribe(res => {
            this.loadTipoEntrevista();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'TipoEntrevista updated');
          });
      }
    });
  }

  createTipoEntrevista(tipoEntrevista: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create TipoEntrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_tipo_entrevista = <TipoEntrevista>tipoEntrevista;
        // console.info(JSON.stringify(this.info_tipo_entrevista));
        this.entrevistaService.post('tipo_entrevista', this.info_tipo_entrevista)
          .subscribe(res => {
            this.info_tipo_entrevista = <TipoEntrevista>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'TipoEntrevista created');
            this.clean = !this.clean;
            this.info_tipo_entrevista = undefined;
          });
      }
    });
  }

  ngOnInit() {
    this.loadTipoEntrevista();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_tipo_entrevista === undefined) {
        this.createTipoEntrevista(event.data.TipoEntrevista);
      } else {
        this.updateTipoEntrevista(event.data.TipoEntrevista);
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
