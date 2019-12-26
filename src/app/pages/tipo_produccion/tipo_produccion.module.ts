import { TipoProduccionRoutingModule, routedComponents } from './tipo_produccion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoProduccionComponent } from './crud-tipo_produccion/crud-tipo_produccion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoProduccionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProduccionAcademicaService,
  ],
  exports: [
    CrudTipoProduccionComponent,
  ],
})
export class TipoProduccionModule { }
