import { TipoLugarRoutingModule, routedComponents } from './tipo_lugar-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoLugarComponent } from './crud-tipo_lugar/crud-tipo_lugar.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoLugarRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UbicacionService,
  ],
  exports: [
    CrudTipoLugarComponent,
  ],
})
export class TipoLugarModule { }
