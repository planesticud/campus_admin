import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-organizacion',
  templateUrl: './list-organizacion.component.html',
  styleUrls: ['./list-organizacion.component.scss'],
})
export class ListOrganizacionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private translate: TranslateService, private organizacionService: OrganizacionService,
    private lugarService: UbicacionService, private midService: CampusMidService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      actions: {
        columnTitle: '',
        edit: false,
        delete: false,
      },
      noDataMessage: 'No se encuentran datos (No data found)',
      add: {
        addButtonContent: '<i class="nb-plus" title="' + this.translate.instant('GLOBAL.agregar') + '"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      mode: 'external',
      columns: {
        Id: {
          title: this.translate.instant('GLOBAL.id'),
          width: '3%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Ente: {
          title: this.translate.instant('GLOBAL.ente'),
          width: '3%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoIdentificacion: {
          title: this.translate.instant('GLOBAL.tipo_identificacion'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        NumeroIdentificacion: {
          title: this.translate.instant('GLOBAL.numero_identificacion'),
          width: '11%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre'),
          width: '22%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoOrganizacion: {
          title: this.translate.instant('GLOBAL.tipo_organizacion'),
          width: '12%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Lugar: {
          title: this.translate.instant('GLOBAL.lugar_establecimiento'),
          width: '11%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
        Direccion: {
          title: this.translate.instant('GLOBAL.direccion'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Telefono: {
          title: this.translate.instant('GLOBAL.telefono'),
          width: '8%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Correo: {
          title: this.translate.instant('GLOBAL.correo_electronico'),
          width: '10%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  loadData(): void {
    this.organizacionService.get('organizacion/?limit=0').subscribe(res => {
      if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
        this.data = <Array<any>>res;
        this.data.forEach(element => {
          this.midService.get('organizacion/' + element.Ente)
            .subscribe(info => {
              if (info !== null && JSON.stringify(info).toString() !== '[{}]') {
                const organizacion_info = <any>info;
                element.TipoIdentificacion = organizacion_info.TipoIdentificacion;
                element.NumeroIdentificacion = organizacion_info.NumeroIdentificacion;
                element.Direccion = organizacion_info.Ubicacion.Valor;
                if (organizacion_info.Contacto[0].TipoContacto.Nombre === 'Teléfono') {
                  element.Telefono = organizacion_info.Contacto[0].Valor;
                } else {
                  element.Correo = organizacion_info.Contacto[0].Valor;
                }
                if (organizacion_info.Contacto[1].TipoContacto.Nombre === 'Correo electrónico') {
                  element.Correo = organizacion_info.Contacto[1].Valor;
                } else {
                  element.Telefono = organizacion_info.Contacto[1].Valor;
                }
                element.Lugar = organizacion_info.Ubicacion.UbicacionEnte.Lugar;
                this.lugarService.get('lugar/' + element.Lugar)
                  .subscribe(lugarEst => {
                    if (lugarEst !== null && JSON.stringify(lugarEst).toString() !== '[{}]') {
                      element.Lugar = lugarEst;
                    }
                    this.source.load(this.data);
                  },
                    (error: HttpErrorResponse) => {
                      Swal({
                        type: 'error',
                        title: error.status + '',
                        text: this.translate.instant('ERROR.' + error.status),
                        footer: this.translate.instant('GLOBAL.cargar') + '-' +
                          this.translate.instant('GLOBAL.organizacion') + '|' +
                          this.translate.instant('GLOBAL.lugar_establecimiento'),
                        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                      });
                    });
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.organizacion') + '|' +
                    this.translate.instant('GLOBAL.organizacion'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        });
      }
    },
      (error: HttpErrorResponse) => {
        Swal({
          type: 'error',
          title: error.status + '',
          text: this.translate.instant('ERROR.' + error.status),
          footer: this.translate.instant('GLOBAL.cargar') + '-' +
            this.translate.instant('GLOBAL.organizacion'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }

  itemselec(event): void {
  }
}
