import { CalendarioEventoRoutingModule, routedComponents } from './calendario_evento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { EventoService } from '../../@core/data/evento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudCalendarioEventoComponent } from './crud-calendario_evento/crud-calendario_evento.component';

@NgModule({
  imports: [
    ThemeModule,
    CalendarioEventoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
    EventoService,
  ],
  exports: [
    CrudCalendarioEventoComponent,
  ],
})
export class CalendarioEventoModule { }
