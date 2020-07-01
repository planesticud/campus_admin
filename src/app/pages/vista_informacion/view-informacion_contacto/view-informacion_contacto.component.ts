import { Component, OnInit, Input } from '@angular/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-view-informacion-contacto',
  templateUrl: './view-informacion_contacto.component.html',
  styleUrls: ['./view-informacion_contacto.component.scss'],
})
export class ViewInformacionContactoComponent implements OnInit {

  info_informacion_contacto: any;
  informacion_contacto_id: number;

  @Input('informacion_contacto_id')
  set name(informacion_contacto_id: number) {
    this.informacion_contacto_id = informacion_contacto_id;
    this.loadInformacionContacto();
  }

  constructor(
    private campusMidService: CampusMidService,
    private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  public loadInformacionContacto(): void {
    if (this.informacion_contacto_id !== undefined && this.informacion_contacto_id !== 0 &&
      this.informacion_contacto_id.toString() !== '') {
      this.campusMidService.get('persona/consultar_contacto/' + this.informacion_contacto_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_informacion_contacto = <any>res;
          } else {
            this.info_informacion_contacto = undefined;
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.informacion_contacto'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_informacion_contacto = undefined;
    }
  }

  ngOnInit() {
  }
}
