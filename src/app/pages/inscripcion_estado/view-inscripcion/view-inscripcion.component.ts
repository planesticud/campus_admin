import { OnInit, Input, Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CoreService } from '../../../@core/data/core.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-inscripcion-listado',
  templateUrl: './view-inscripcion.component.html',
  styleUrls: ['./view-inscripcion.component.scss'],
})
export class ViewInscripcionComponent implements OnInit {
  info_inscripcion_id: number;
  info_persona_id: number;
  info_periodo: any;
  info_programa: any;
  info_estado: any;

  @Input('inscripcion_id')
  set dato(info_inscripcion_id: number) {
    this.info_inscripcion_id = info_inscripcion_id;
    if (this.info_inscripcion_id !== undefined && this.info_inscripcion_id !== null &&
      this.info_inscripcion_id !== 0 && this.info_inscripcion_id.toString() !== '') {
        this.loadInformacion();
    }
  }

  constructor(private translate: TranslateService,
    private coreService: CoreService,
    private inscripcionService: InscripcionService,
    private programaService: ProgramaOikosService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

  loadInformacion() {
    this.inscripcionService.get('inscripcion?query=Id:' + this.info_inscripcion_id)
      .subscribe(res => {
        if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
          const inscripcion = <any>res[0];
          this.programaService.get('dependencia/' + inscripcion.ProgramaAcademicoId)
          .subscribe(res2 => {
            if (res2 !== null && JSON.stringify(res2).toString() !== '[{}]') {
              this.info_programa = <any>res2;
              this.coreService.get('periodo/' + inscripcion.PeriodoId).subscribe(res3 => {
                  if (res3 !== null && JSON.stringify(res3).toString() !== '[{}]') {
                    this.info_periodo = <any>res3;
                    this.info_persona_id = inscripcion.PersonaId;
                    this.info_estado = inscripcion.EstadoInscripcionId;
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.periodo_id'),
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
                  this.translate.instant('GLOBAL.programa_academico'),
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
              this.translate.instant('GLOBAL.inscripcion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }
}
