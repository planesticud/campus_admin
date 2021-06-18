import { AdmitidosOpcionadosRoutingModule, routedComponents } from './admitidos_opcionados-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ThemeModule,
    AdmitidosOpcionadosRoutingModule,
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

  ],
})
export class AdmitidosOpcionadosModule { }
