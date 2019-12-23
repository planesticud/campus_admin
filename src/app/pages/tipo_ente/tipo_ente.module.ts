import { EnteService } from './../../@core/data/ente.service';
import { TipoEnteRoutingModule, routedComponents } from './tipo_ente-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoEnteComponent } from './crud-tipo_ente/crud-tipo_ente.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoEnteRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EnteService,
  ],
  exports: [
    CrudTipoEnteComponent,
  ],
})
export class TipoEnteModule { }
