import { EstadoEntrevista } from './../../../@core/data/models/estado_entrevista';
import { TipoEntrevista } from './../../../@core/data/models/tipo_entrevista';
import { Persona } from './../../../@core/data/models/persona';
import { Entrevista } from './../../../@core/data/models/entrevista';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntrevistaService } from '../../../@core/data/entrevista.service';
import { DocenteService } from '../../../@core/data/docente.service';
import { FORM_ASIGNAR_ENTREVISTA } from './form-asignar_entrevista';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-crud-asignar-entrevista',
  templateUrl: './crud-asignar_entrevista.component.html',
  styleUrls: ['./crud-asignar_entrevista.component.scss'],
})
export class CrudAsignarEntrevistaComponent implements OnInit {
  config: ToasterConfig;
  inscripcion_id: number;
  programa_id: number;
  tipoEntrevista: TipoEntrevista;
  estadoEntrevista: EstadoEntrevista;
  fecha_entrevista: string;
  tipo_entrevista_selected: TipoEntrevista;

  @Input('inscripcion_id')
  set name(inscripcion_id: number) {
    this.inscripcion_id = inscripcion_id;
  }

  @Input('programa_id')
  set namep(programa_id: number) {
    this.programa_id = programa_id;
    this.loadAsignarEntrevista();
  }

  @Output() eventChange = new EventEmitter();

  info_entrevista: Entrevista;
  tiposEntrevista: Array<TipoEntrevista>;
  estadosEntrevista: Array<EstadoEntrevista>;
  entrevistadores: Array<any>;
  formAsignarEntrevista: any;
  regEntrevista: any;
  regEntrevistador: any;
  clean: boolean;
  entrevistadorSeleccionado: any;
  source_entrevistadores: Array<any> = [];
  source: LocalDataSource = new LocalDataSource();
  settings_entrevistadores: any;
  cleanEntrevistador: boolean;

  constructor(public translate: TranslateService,
     private entrevistaService: EntrevistaService,
     private docenteService: DocenteService,
     private toasterService: ToasterService) {
    this.formAsignarEntrevista = FORM_ASIGNAR_ENTREVISTA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsEstadoEntrevista();
    this.loadOptionsTipoEntrevista();
    this.settings_entrevistadores = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        edit: false,
        add: false,
        position: 'right',
      },
      mode: 'external',
      columns: {
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre_entrevistador'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
          width: '60%',
        },
      },
    };
   }

  construirForm() {
    this.formAsignarEntrevista.titulo = this.translate.instant('GLOBAL.entrevista');
    this.formAsignarEntrevista.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formAsignarEntrevista.campos.length; i++) {
      this.formAsignarEntrevista.campos[i].label = this.translate.instant('GLOBAL.' + this.formAsignarEntrevista.campos[i].label_i18n);
      this.formAsignarEntrevista.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formAsignarEntrevista.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsEstadoEntrevista(): Promise<any> {
    return new Promise ((resolve, reject) => {
      this.entrevistaService.get('estado_entrevista/?limit=0')
      .subscribe(res => {
        if (Object.keys(res[0]).length > 0) {
          this.estadosEntrevista = <Array<EstadoEntrevista>>res;
          resolve(true);
        } else {
          this.estadosEntrevista = [];
          reject({status: 404});
        }
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    });
  }

  loadOptionsTipoEntrevista(): Promise<any> {
    return new Promise ((resolve, reject) => {
      this.entrevistaService.get('tipo_entrevista/?limit=0')
        .subscribe(res => {
          if (Object.keys(res[0]).length > 0) {
            this.tiposEntrevista = <Array<TipoEntrevista>>res;
            resolve(true);
          } else {
            this.tiposEntrevista = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
      });
  }

  loadOptionsEntrevistador(): Promise<any> {
    return new Promise ((resolve, reject) => {
      // let nuevoEntrevistador: Array<any> = [];
      // this.docenteService.get('docentes_por_proyecto/20')
      this.entrevistaService.get('entrevistador/?query=ProgramaAcademicoId:' + this.programa_id)
        .subscribe(res => {
          if (Object.keys(res[0]).length > 0) {
            this.entrevistadores = <Array<any>>res;
            this.entrevistadores.forEach( (entrevistador: any) => {
              this.docenteService.get('docentes_por_proyecto/' + entrevistador.ProgramaAcademicoId)
               .subscribe(res_Docentes => {
                 const docentes = <Array<any>>res_Docentes['docentesCollection']['docentes'];
                 if (Object.keys(docentes).length !== 0) {
                   const arrayFilter = docentes.filter(e => e.identificacion === entrevistador.PersonaId + '');
                   const persona = arrayFilter;
                   entrevistador['Nombre'] = persona[0].nombres + ' ' + persona[0].apellidos;
                 }
                   resolve(true);
                 }, (error: HttpErrorResponse) => {
                   reject(error);
              });


                resolve(true);
            }, (error: HttpErrorResponse) => {
              reject(error);
            });
          } else {
            this.entrevistadores = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
      });
  }

  getNombreEntrevistador(persona: Persona) {
    return persona.PrimerNombre + ' ' + persona.SegundoNombre + ' '
      + persona.PrimerApellido + ' ' + persona.SegundoApellido;
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formAsignarEntrevista.campos.length; index++) {
      const element = this.formAsignarEntrevista.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadAsignarEntrevista(): void {
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0) {
      this.loadOptionsEntrevistador();
    } else  {
      this.info_entrevista = undefined;
      this.clean = !this.clean;
    }
  }

  asignarEntrevistador(entrevistadorEntrevista: any): void {
        this.entrevistaService.post('entrevistador_entrevista', entrevistadorEntrevista)
          .subscribe(res => {
            this.showToast('info', 'created', 'Entrevistador  asignado');
          });
  }

  agregarEntrevistador(mostrarError: boolean, idEntrevistador: number): void {
    if (this.source_entrevistadores.find( entrevistador => entrevistador.IdEntrevistador === this.entrevistadorSeleccionado.Id) ) {
      if (mostrarError) {
        Swal({
          type: 'error',
          title: 'ERROR',
          text: this.translate.instant('GLOBAL.error_entrevistador_ya_existe'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      }
    } else {
      this.source_entrevistadores.push({
        Nombre: this.entrevistadorSeleccionado.Nombre,
        IdPersona: this.entrevistadorSeleccionado.PersonaId,
        IdEntrevistador: this.entrevistadorSeleccionado.Id,
        PersonaId: this.entrevistadorSeleccionado.PersonaId,
        EntrevistadorId: this.entrevistadorSeleccionado.Id,
      });
      this.entrevistadorSeleccionado = undefined;
      this.source.load(this.source_entrevistadores);
    }
  }

onDeleteEntrevistador(event): void {
  if (event.data) {
    this.source_entrevistadores.splice(this.source_entrevistadores.indexOf(event.data), this.source_entrevistadores.indexOf(event.data));
    this.source.load(this.source_entrevistadores);
  } else {
    Swal({
      type: 'error',
      title: 'ERROR',
      text: this.translate.instant('GLOBAL.error_entrevistador_borrar'),
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
    });
  }
}


  createEntrevista(entrevista: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Entrevista!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_entrevista = <Entrevista>entrevista;
        this.entrevistaService.post('entrevista', this.info_entrevista)
          .subscribe(res => {
            this.info_entrevista = <Entrevista>res;
            this.source_entrevistadores.forEach(element => {
              element.EntrevistaId = this.info_entrevista.Id;
              this.entrevistaService.get('entrevistador/' + element.IdEntrevistador)
                .subscribe(resEntrevistador => {
                    if (resEntrevistador !== null) {

                      element.EntrevistadorId = resEntrevistador;
                      element.EntrevistaId = res;
                      this.asignarEntrevistador(element);
                      // this.clean = !this.clean;
                    }
                });
              // this.asignarEntrevistador(element);
            });
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Entrevista created');
            this.info_entrevista = undefined;
            this.clean = !this.clean;
          });
      }
    });
  }

  ngOnInit() {
    this.loadAsignarEntrevista();
  }

  validarForm() {
      if (this.source_entrevistadores === undefined || Object.keys(this.source_entrevistadores).length < 1) {
        Swal({
          type: 'error',
          title: 'ERROR',
          text: this.translate.instant('GLOBAL.error_agregar_entrevistador'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      } else {
        if (Object.keys(this.tipoEntrevista).length > 0 && Object.keys(this.estadoEntrevista).length > 0 && this.fecha_entrevista !== undefined ) {
          this.info_entrevista = new Entrevista();
          this.info_entrevista.InscripcionId = this.inscripcion_id;
          this.info_entrevista.FechaEntrevista = this.fecha_entrevista;
          this.info_entrevista.EstadoEntrevistaId = this.estadoEntrevista;
          this.info_entrevista.TipoEntrevistaId = this.tipoEntrevista;
          this.info_entrevista.Activo = true;
          this.createEntrevista(this.info_entrevista);
        }else {
        }
      }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
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
