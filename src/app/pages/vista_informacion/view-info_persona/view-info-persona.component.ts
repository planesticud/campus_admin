import { Component, OnInit, Input } from '@angular/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-view-info-persona',
  templateUrl: './view-info-persona.component.html',
  styleUrls: ['./view-info-persona.component.scss'],
})
export class ViewInfoPersonaComponent implements OnInit {

  info_persona_id: number;
  info_info_persona: any;
  info_persona_user: string;
  foto: any;
  soportePerDocumento: any;

  @Input('info_persona_id')
  set name(info_persona_id: number) {
    this.info_persona_id = info_persona_id;
    this.loadInfoPersona();
  }

  constructor(private campusMidService: CampusMidService,
    private documentoPer: DocumentoService,
    private sanitization: DomSanitizer,
    private nuxeoPer: NuxeoService,
    private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.loadInfoPersona();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  public cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitization.bypassSecurityTrustUrl(oldURL);
  }

  ngOnInit() {
  }

  public loadInfoPersona(): void {
    const id = this.info_persona_id ? this.info_persona_id : this.info_persona_user ? this.info_persona_user : undefined;
    if (id !== undefined && id !== 0 && id.toString() !== '') {
      this.campusMidService.get('persona/consultar_persona/' + id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_info_persona = <any>res;
            const foto = [];
            if (this.info_info_persona.Foto + '' !== '0') {
              foto.push({ Id: this.info_info_persona.Foto, key: 'Foto' });
            }
            if (this.info_info_persona.SoporteDocumento + '' !== '0') {
              foto.push({ Id: this.info_info_persona.SoporteDocumento, key: 'SoporteDocumento' });
            }
            this.nuxeoPer.getDocumentoById$(foto, this.documentoPer)
              .subscribe(responsePer => {
                this.foto = this.cleanURL(responsePer['Foto'] + '');
                this.soportePerDocumento = this.cleanURL(responsePer['SoporteDocumento'] + '');
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.info_persona') + '|' +
                      this.translate.instant('GLOBAL.soporte_documento'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          } else {
            this.info_info_persona = undefined;
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.info_persona'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_info_persona = undefined
    }
  }
}
