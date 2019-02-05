import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import 'style-loader!angular2-toaster/toaster.css';
import { AdmisionesService } from './../../../@core/data/admisiones.service';


@Component({
  selector: 'ngx-list-detalle',
  templateUrl: './list-detalle_admision.component.html',
  styleUrls: ['./list-detalle_admision.component.scss'],
  })
export class ListDetalleAdmisionComponent implements OnInit {
  config: ToasterConfig;

  constructor(private translate: TranslateService,
    private admisionesService: AdmisionesService,
    private toasterService: ToasterService,
    ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  // useLanguage(language: string) {
  //   this.translate.use(language);
  // }

  ngOnInit() {
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
