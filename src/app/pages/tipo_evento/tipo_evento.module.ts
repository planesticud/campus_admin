import { TipoEventoRoutingModule, routedComponents } from './tipo_evento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../@core/data/evento.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoEventoComponent } from './crud-tipo_evento/crud-tipo_evento.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoEventoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EventoService,
    ProgramaOikosService,
  ],
  exports: [
    CrudTipoEventoComponent,
  ],
})
export class TipoEventoModule { }
