import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { EnteService } from '../../../@core/data/ente.service';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { FORM_ORGANIZACION } from './form-organizacion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Lugar } from '../../../@core/data/models/lugar';
import { TipoIdentificacion } from '../../../@core/data/models/tipo_identificacion';
import { TipoOrganizacion } from '../../../@core/data/models/tipo_organizacion';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-organizacion',
  templateUrl: './crud-organizacion.component.html',
  styleUrls: ['./crud-organizacion.component.scss'],
})
export class CrudOrganizacionComponent implements OnInit {
  config: ToasterConfig;
  organizacion_id: number;
  info_organizacion: any;
  formOrganizacion: any;
  regOrganizacion: any;
  clean: boolean;
  paisSeleccionado: any;
  departamentoSeleccionado: any;
  loading: boolean;

  @Input('organizacion_id')
  set name(organizacion_id: number) {
    this.organizacion_id = organizacion_id;
  }

  @Output() eventChange = new EventEmitter();

  ngOnInit() {
  }

  constructor(private translate: TranslateService, private organizacionService: OrganizacionService,
    private lugarService: UbicacionService, private midService: CampusMidService, private enteService: EnteService,
    private toasterService: ToasterService) {
    this.formOrganizacion = FORM_ORGANIZACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipoOrganizacion();
    this.loadOptionsTipoIdentificacion();
    this.loadOptionsPais();
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formOrganizacion.campos.length; index++) {
      const element = this.formOrganizacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  construirForm() {
    this.formOrganizacion.titulo = this.translate.instant('GLOBAL.organizacion');
    this.formOrganizacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formOrganizacion.campos.length; i++) {
      this.formOrganizacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formOrganizacion.campos[i].label_i18n);
      this.formOrganizacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formOrganizacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsTipoOrganizacion(): void {
    let tipoOrganizacion: Array<any> = [];
    this.organizacionService.get('tipo_organizacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoOrganizacion = <Array<TipoOrganizacion>>res;
        }
        this.formOrganizacion.campos[ this.getIndexForm('TipoOrganizacion') ].opciones = tipoOrganizacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.organizacion') + '|' +
              this.translate.instant('GLOBAL.tipo_organizacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsTipoIdentificacion(): void {
    let tipoIdentificacion: Array<any> = [];
    this.enteService.get('tipo_identificacion/?limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          tipoIdentificacion = <Array<TipoIdentificacion>>res;
        }
        this.formOrganizacion.campos[ this.getIndexForm('TipoIdentificacion') ].opciones = tipoIdentificacion;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.organizacion') + '|' +
              this.translate.instant('GLOBAL.tipo_identificacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  loadOptionsPais(): void {
    let pais: Array<any> = [];
    this.lugarService.get('lugar/?query=TipoLugar.Nombre:PAIS,Activo:true&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          pais = <Array<Lugar>>res;
        }
        this.formOrganizacion.campos[ this.getIndexForm('Pais') ].opciones = pais;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.organizacion') + '|' +
              this.translate.instant('GLOBAL.pais'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  getSeleccion(event) {
    if (event.nombre === 'Pais') {
      this.paisSeleccionado = event.valor;
      this.loadOptionsDepartamento();
    } else if (event.nombre === 'Departamento') {
      this.departamentoSeleccionado = event.valor;
      this.loadOptionsCiudad();
    }
  }

  loadOptionsDepartamento(): void {
    let consultaHijos: Array<any> = [];
    const departamento: Array<any> = [];
    console.info(this.paisSeleccionado);
    if (this.paisSeleccionado) {
      this.lugarService.get('relacion_lugares/?query=LugarPadre.Id:' + this.paisSeleccionado.Id + ',LugarHijo.Activo:true&limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            consultaHijos = <Array<Lugar>>res;
            for (let i = 0; i < consultaHijos.length; i++) {
              departamento.push(consultaHijos[i].LugarHijo);
            }
          }
          this.formOrganizacion.campos[this.getIndexForm('Departamento')].opciones = departamento;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.organizacion') + '|' +
                this.translate.instant('GLOBAL.departamento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  loadOptionsCiudad(): void {
    let consultaHijos: Array<any> = [];
    const ciudad: Array<any> = [];
    if (this.departamentoSeleccionado) {
      this.lugarService.get('relacion_lugares/?query=LugarPadre.Id:' + this.departamentoSeleccionado.Id + ',LugarHijo.Activo:true&limit=0')
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            consultaHijos = <Array<Lugar>>res;
            for (let i = 0; i < consultaHijos.length; i++) {
              ciudad.push(consultaHijos[i].LugarHijo);
            }
          }
          this.formOrganizacion.campos[this.getIndexForm('Ciudad')].opciones = ciudad;
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.organizacion') + '|' +
                this.translate.instant('GLOBAL.ciudad'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  addUbicacionOrganizacion(ubicacion: any): void {
    this.midService.post('organizacion/registar_ubicacion', ubicacion)
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          this.showToast('info', this.translate.instant('GLOBAL.crear'),
            this.translate.instant('GLOBAL.organizacion') + ' ' +
            this.translate.instant('GLOBAL.confirmarCrear'));
          this.info_organizacion = undefined;
          this.clean = !this.clean;
          this.eventChange.emit(true);
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.crear') + '-' +
              this.translate.instant('GLOBAL.organizacion') + '|' +
              this.translate.instant('GLOBAL.lugar_establecimiento'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  createOrganizacion(organizacion: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.crear') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_organizacion = <any>organizacion;
        this.info_organizacion.Contacto = [];
        if (this.info_organizacion.Telefono) {
          this.info_organizacion.Contacto.push({
            TipoContacto: { Id: 1 }, // corresponde al tipo telefono
            Valor: this.info_organizacion.Telefono,
          });
        }
        if (this.info_organizacion.Correo) {
          this.info_organizacion.Contacto.push({
            TipoContacto: { Id: 3 }, // corresponde al tipo correo
            Valor: this.info_organizacion.Correo,
          });
        }
        this.midService.post('organizacion/', this.info_organizacion)
          .subscribe(res => {
            const identificacion = <any>res;
            if (identificacion !== null && identificacion.Type !== 'error') {
              const ubicacion = {
                Ente: identificacion.Ente ? identificacion.Id : null,
                Lugar: this.info_organizacion.Ciudad,
                TipoRelacionUbicacionEnte: 3,
                Atributos: [{
                  AtributoUbicacion: {Id: 1},
                  Valor: this.info_organizacion.Direccion,
                }],
              };
              this.addUbicacionOrganizacion(ubicacion);
              this.showToast('info', this.translate.instant('GLOBAL.crear'),
                this.translate.instant('GLOBAL.organizacion') + ' ' +
                this.translate.instant('GLOBAL.confirmarCrear'));
              this.info_organizacion = undefined;
              this.clean = !this.clean;
              this.eventChange.emit(true);
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.organizacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      }
    });
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_organizacion === undefined) {
        this.createOrganizacion(event.data.InfoOrganizacion);
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
