import { TipoRelacionUbicacionEnteRoutingModule, routedComponents } from './tipo_relacion_ubicacion_ente-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnteService } from '../../@core/data/ente.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoRelacionUbicacionEnteComponent } from './crud-tipo_relacion_ubicacion_ente/crud-tipo_relacion_ubicacion_ente.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoRelacionUbicacionEnteRoutingModule,
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
    CrudTipoRelacionUbicacionEnteComponent,
  ],
})
export class TipoRelacionUbicacionEnteModule { }
