import { TipoRelacionPersonasRoutingModule, routedComponents } from './tipo_relacion_personas-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PersonaService } from '../../@core/data/persona.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoRelacionPersonasComponent } from './crud-tipo_relacion_personas/crud-tipo_relacion_personas.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoRelacionPersonasRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    PersonaService,
  ],
  exports: [
    CrudTipoRelacionPersonasComponent,
  ],
})
export class TipoRelacionPersonasModule { }
