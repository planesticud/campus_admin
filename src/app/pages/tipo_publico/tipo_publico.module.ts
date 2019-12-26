import { TipoPublicoRoutingModule, routedComponents } from './tipo_publico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../@core/data/evento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoPublicoComponent } from './crud-tipo_publico/crud-tipo_publico.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoPublicoRoutingModule,
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
    CrudTipoPublicoComponent,
  ],
})
export class TipoPublicoModule { }
