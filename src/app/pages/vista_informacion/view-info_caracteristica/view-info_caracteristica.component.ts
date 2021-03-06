import { Component, OnInit, Input } from '@angular/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-view-info-caracteristica',
  templateUrl: './view-info_caracteristica.component.html',
  styleUrls: ['./view-info_caracteristica.component.scss'],
})
export class ViewInfoCaracteristicaComponent implements OnInit {

  info_info_caracteristica: any;
  info_caracteristica_id: number;

  @Input('info_caracteristica_id')
  set info(info: number) {
    this.info_caracteristica_id = info;
    this.loadInfoCaracteristica();
  };

  constructor(
    private campusMidService: CampusMidService,
    private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  public loadInfoCaracteristica(): void {
    if (this.info_caracteristica_id !== undefined && this.info_caracteristica_id !== 0 &&
      this.info_caracteristica_id.toString() !== '') {
      this.campusMidService.get('/persona/consultar_complementarios/' + this.info_caracteristica_id)
        .subscribe(res => {
          if (res !== null && JSON.stringify(res).toString() !== '[{}]') {
            this.info_info_caracteristica = <any>res;
          } else {
            this.info_info_caracteristica = undefined;
          }
        },
          (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              footer: this.translate.instant('GLOBAL.cargar') + '-' +
                this.translate.instant('GLOBAL.info_caracteristica'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_info_caracteristica = undefined;
    }
  }

  ngOnInit() {
  }
}
