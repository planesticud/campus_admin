import { TipoDedicacionRoutingModule, routedComponents } from './tipo_dedicacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDedicacionComponent } from './crud-tipo_dedicacion/crud-tipo_dedicacion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDedicacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ExperienciaService,
  ],
  exports: [
    CrudTipoDedicacionComponent,
  ],
})
export class TipoDedicacionModule { }
