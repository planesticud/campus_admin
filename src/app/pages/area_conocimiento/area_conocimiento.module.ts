import { AreaConocimientoRoutingModule, routedComponents } from './area_conocimiento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAreaConocimientoComponent } from './crud-area_conocimiento/crud-area_conocimiento.component';

@NgModule({
  imports: [
    ThemeModule,
    AreaConocimientoRoutingModule,
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
    CrudAreaConocimientoComponent,
  ],
})
export class AreaConocimientoModule { }
