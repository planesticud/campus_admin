import { TipoPagoRoutingModule, routedComponents } from './tipo_pago-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ReciboService } from '../../@core/data/recibo.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoPagoComponent } from './crud-tipo_pago/crud-tipo_pago.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoPagoRoutingModule,
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
    CrudTipoPagoComponent,
  ],
})
export class TipoPagoModule { }
