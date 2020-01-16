import { EncargadoEventoRoutingModule, routedComponents } from './encargado_evento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PersonaService } from '../../@core/data/persona.service';
import { EventoService } from '../../@core/data/evento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEncargadoEventoComponent } from './crud-encargado_evento/crud-encargado_evento.component';

@NgModule({
  imports: [
    ThemeModule,
    EncargadoEventoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    PersonaService,
    EventoService,
  ],
  exports: [
    CrudEncargadoEventoComponent,
  ],
})
export class EncargadoEventoModule { }
