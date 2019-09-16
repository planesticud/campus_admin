
import { Periodo } from './../../../@core/data/models/periodo';
import { Inscripcion } from './../../../@core/data/models/inscripcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelecadmitidosService } from '../../../@core/data/selecadmitidos.service';
import { CoreService } from '../../../@core/data/core.service';
import { FORM_INSCRIPCION } from './form-inscripcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { EstadoInscripcion } from '../../../@core/data/models/estado_inscripcion';
import { TipoInscripcion } from '../../../@core/data/models/tipo_inscripcion';

@Component({
  selector: 'ngx-crud-inscripcion',
  templateUrl: './crud-inscripcion.component.html',
  styleUrls: ['./crud-inscripcion.component.scss'],
})
export class CrudInscripcionComponent implements OnInit {
  config: ToasterConfig;
  inscripcion_id: number;

  @Input('inscripcion_id')
  set name(inscripcion_id: number) {
    this.inscripcion_id = inscripcion_id;
    this.loadInscripcion();
  }

  @Output() eventChange = new EventEmitter();

  info_inscripcion: Inscripcion;
  formInscripcion: any;
  regInscripcion: any;
  clean: boolean;

  constructor(private translate: TranslateService,
    private selecadmitidosService: SelecadmitidosService,
    private coreService: CoreService,
    private toasterService: ToasterService) {
    this.formInscripcion = FORM_INSCRIPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadPeriodo();
    this.loadEstadoInscripcion();
    this.loadTipoInscripcion();
   }

  construirForm() {
    this.formInscripcion.titulo = this.translate.instant('GLOBAL.inscripcion');
    this.formInscripcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInscripcion.campos.length; i++) {
      this.formInscripcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formInscripcion.campos[i].label_i18n);
      this.formInscripcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formInscripcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formInscripcion.campos.length; index++) {
      const element = this.formInscripcion.campos[index];
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
          this.formInscripcion.campos[this.getIndexForm('PeriodoId')].opciones = periodo;
        }
      });
  }

  public loadEstadoInscripcion(): void {
    this.selecadmitidosService.get('estado_inscripcion/?limit=0')
      .subscribe(res => {
        const estadoInscripcion = <Array<EstadoInscripcion>>res;
        if (res !== null) {
          this.formInscripcion.campos[this.getIndexForm('EstadoInscripcionId')].opciones = estadoInscripcion;
        }
      });
  }

  public loadTipoInscripcion(): void {
    this.selecadmitidosService.get('tipo_inscripcion/?limit=0')
      .subscribe(res6 => {
        const tipoInscripcion = <Array<TipoInscripcion>>res6;
        if (res6 !== null) {
          this.formInscripcion.campos[this.getIndexForm('TipoInscripcionId')].opciones = tipoInscripcion;
        }
      });
  }

  public loadInscripcion(): void {
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0) {
      this.selecadmitidosService.get('inscripcion/?query=id:' + this.inscripcion_id)
        .subscribe(res => {
          if (res !== null) {
           const info = <Inscripcion>res[0];
            this.coreService.get('periodo/' + info.PeriodoId)
              .subscribe(res2 => {
                const periodo = <Periodo>res2;
                if (res2 !== null) {
                  info.PeriodoId = periodo;
                  this.selecadmitidosService.get('estado_inscripcion/' + info.EstadoInscripcionId)
                  .subscribe(res3 => {
                    const estadoInscripcion = <EstadoInscripcion>res3;
                    if (res3 !== null) {
                      info.EstadoInscripcionId = estadoInscripcion;
                      this.selecadmitidosService.get('tipo_inscripcion/' + info.TipoInscripcionId.Id)
                  .subscribe(res4 => {
                    const tipoInscripcion = <TipoInscripcion>res4;
                    if (res4 !== null) {
                      info.TipoInscripcionId = tipoInscripcion;
                    this.info_inscripcion = info;
                }
              });
            }
              });
            }
          });
          }
        });
    } else  {
      this.info_inscripcion = undefined;
      this.clean = !this.clean;
    }
  }

  updateInscripcion(inscripcion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Inscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_inscripcion = <Inscripcion>inscripcion;
        this.selecadmitidosService.put('inscripcion', this.info_inscripcion)
          .subscribe(res => {
            this.loadInscripcion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Inscripcion updated');
          });
      }
    });
  }

  createInscripcion(inscripcion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Inscripcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_inscripcion = <Inscripcion>inscripcion;
        this.selecadmitidosService.post('inscripcion', this.info_inscripcion)
          .subscribe(res => {
            this.info_inscripcion = <Inscripcion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Inscripcion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadInscripcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_inscripcion === undefined) {
        this.createInscripcion(event.data.Inscripcion);
      } else {
        this.updateInscripcion(event.data.Inscripcion);
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
