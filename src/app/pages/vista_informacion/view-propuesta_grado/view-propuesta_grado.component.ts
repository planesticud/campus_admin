import { Component, OnInit, Input } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { CoreService } from '../../../@core/data/core.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-propuesta-grado',
  templateUrl: './view-propuesta_grado.component.html',
  styleUrls: ['./view-propuesta_grado.component.scss'],
})
export class ViewPropuestaGradoComponent implements OnInit {
  info_propuesta_grado: any;
  ente: number;
  inscripcion_id: number;
  estado_inscripcion: number;
  docPropuesta = [];

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
  }

  @Input('inscripcion_id')
  set info2(info2: number) {
    this.inscripcion_id = info2;
    if (this.inscripcion_id !== null && this.inscripcion_id !== 0 &&
      this.inscripcion_id.toString() !== '') {
      this.loadData();
    }
  }

  constructor(private translate: TranslateService,
    private inscripcionService: InscripcionService,
    private coreService: CoreService,
    private documentoPro: DocumentoService,
    private nuxeoPro: NuxeoService,
    private sanitization: DomSanitizer,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  public cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitization.bypassSecurityTrustUrl(oldURL);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.inscripcionService.get('propuesta/?query=InscripcionId:' + this.inscripcion_id +
      '&limit=0')
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          const propuesta = <any>res[0];
          this.estado_inscripcion = res[0].InscripcionId.EstadoInscripcionId.Id;
          this.info_propuesta_grado = propuesta;
          this.coreService.get('linea_investigacion_grupo_investigacion/' +
            propuesta.GrupoInvestigacionLineaInvestigacionId)
            .subscribe(linea_grupo => {
              if (linea_grupo !== null && JSON.stringify(linea_grupo).toString() !== '[{}]') {
              const linea_grupo_info = <any>linea_grupo;
              this.coreService.get('grupo_investigacion/' +
                linea_grupo_info.GrupoInvestigacionId)
                .subscribe(grupo => {
                  if (grupo !== null && JSON.stringify(grupo).toString() !== '[{}]') {
                  propuesta.GrupoInvestigacion = <any>grupo;
                  this.coreService.get('linea_investigacion/' +
                    linea_grupo_info.LineaInvestigacionId)
                    .subscribe(linea => {
                      if (linea !== null && JSON.stringify(linea).toString() !== '[{}]') {
                      propuesta.LineaInvestigacion = <any>linea;
                      const soportes = [];
                      if (propuesta.DocumentoId + '' !== '0') {
                        soportes.push({ Id: propuesta.DocumentoId, key: 'Propuesta' });
                      }

                      this.nuxeoPro.getDocumentoById$(soportes, this.documentoPro)
                        .subscribe(responsePro => {
                          this.docPropuesta = <Array<any>>responsePro;

                          if (this.docPropuesta['Propuesta'] !== undefined && propuesta.DocumentoId > 0) {
                            propuesta.DocumentoId = this.cleanURL(this.docPropuesta['Propuesta'] + '');
                            this.info_propuesta_grado = propuesta;
                          }
                        },
                          (error: HttpErrorResponse) => {
                            Swal({
                              type: 'error',
                              title: error.status + '',
                              text: this.translate.instant('ERROR.' + error.status),
                              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                this.translate.instant('GLOBAL.propuesta_grado') + '|' +
                                this.translate.instant('GLOBAL.soporte_documento'),
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
                            this.translate.instant('GLOBAL.grupo_investigacion') + '|' +
                            this.translate.instant('GLOBAL.linea_investigacion'),
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
                        this.translate.instant('GLOBAL.grupo_investigacion') + '|' +
                        this.translate.instant('GLOBAL.grupo_investigacion'),
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
                    this.translate.instant('GLOBAL.propuesta_grado') + '|' +
                    this.translate.instant('GLOBAL.grupo_investigacion'),
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
              this.translate.instant('GLOBAL.propuesta_grado'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
