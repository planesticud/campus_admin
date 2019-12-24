import { TipoVinculacionRoutingModule, routedComponents } from './tipo_vinculacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoVinculacionComponent } from './crud-tipo_vinculacion/crud-tipo_vinculacion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoVinculacionRoutingModule,
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
    CrudTipoVinculacionComponent,
  ],
})
export class TipoVinculacionModule { }
