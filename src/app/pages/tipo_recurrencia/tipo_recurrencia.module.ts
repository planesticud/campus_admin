import { TipoRecurrenciaRoutingModule, routedComponents } from './tipo_recurrencia-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../@core/data/evento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoRecurrenciaComponent } from './crud-tipo_recurrencia/crud-tipo_recurrencia.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoRecurrenciaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EventoService,
  ],
  exports: [
    CrudTipoRecurrenciaComponent,
  ],
})
export class TipoRecurrenciaModule { }
