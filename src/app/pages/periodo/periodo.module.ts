import { PeriodoRoutingModule, routedComponents } from './periodo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudPeriodoComponent } from './crud-periodo/crud-periodo.component';
import { CoreService } from '../../@core/data/core.service';

@NgModule({
  imports: [
    ThemeModule,
    PeriodoRoutingModule,
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
    CrudPeriodoComponent,
  ],
})
export class PeriodoModule { }
