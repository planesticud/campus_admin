import { LineaInvestigacionRoutingModule, routedComponents } from './linea_investigacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudLineaInvestigacionComponent } from './crud-linea_investigacion/crud-linea_investigacion.component';

@NgModule({
  imports: [
    ThemeModule,
    LineaInvestigacionRoutingModule,
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
    CrudLineaInvestigacionComponent,
  ],
})
export class LineaInvestigacionModule { }
