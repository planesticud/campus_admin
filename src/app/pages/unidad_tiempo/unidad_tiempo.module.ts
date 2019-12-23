import { UnidadTiempoRoutingModule, routedComponents } from './unidad_tiempo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudUnidadTiempoComponent } from './crud-unidad_tiempo/crud-unidad_tiempo.component';

@NgModule({
  imports: [
    ThemeModule,
    UnidadTiempoRoutingModule,
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
    CrudUnidadTiempoComponent,
  ],
})
export class UnidadTiempoModule { }
