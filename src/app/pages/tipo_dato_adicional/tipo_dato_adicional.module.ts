import { TipoDatoAdicionalRoutingModule, routedComponents } from './tipo_dato_adicional-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDatoAdicionalComponent } from './crud-tipo_dato_adicional/crud-tipo_dato_adicional.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDatoAdicionalRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
  ],
  exports: [
    CrudTipoDatoAdicionalComponent,
  ],
})
export class TipoDatoAdicionalModule { }
