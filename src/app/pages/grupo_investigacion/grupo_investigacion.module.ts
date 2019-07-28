import { GrupoInvestigacionRoutingModule, routedComponents } from './grupo_investigacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudGrupoInvestigacionComponent } from './crud-grupo_investigacion/crud-grupo_investigacion.component';

@NgModule({
  imports: [
    ThemeModule,
    GrupoInvestigacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InscripcionService,
  ],
  exports: [
    CrudGrupoInvestigacionComponent,
  ],
})
export class GrupoInvestigacionModule { }
