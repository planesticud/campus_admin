import { TipoRelacionLugarRoutingModule, routedComponents } from './tipo_relacion_lugar-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoRelacionLugarComponent } from './crud-tipo_relacion_lugar/crud-tipo_relacion_lugar.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoRelacionLugarRoutingModule,
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
    CrudTipoRelacionLugarComponent,
  ],
})
export class TipoRelacionLugarModule { }
