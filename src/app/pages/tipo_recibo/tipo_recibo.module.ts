import { TipoReciboRoutingModule, routedComponents } from './tipo_recibo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ReciboService } from '../../@core/data/recibo.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoReciboComponent } from './crud-tipo_recibo/crud-tipo_recibo.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoReciboRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ReciboService,
  ],
  exports: [
    CrudTipoReciboComponent,
  ],
})
export class TipoReciboModule { }
