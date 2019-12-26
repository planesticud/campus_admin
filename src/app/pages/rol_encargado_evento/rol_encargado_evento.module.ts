import { RolEncargadoEventoRoutingModule, routedComponents } from './rol_encargado_evento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EventoService } from '../../@core/data/evento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRolEncargadoEventoComponent } from './crud-rol_encargado_evento/crud-rol_encargado_evento.component';

@NgModule({
  imports: [
    ThemeModule,
    RolEncargadoEventoRoutingModule,
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
    CrudRolEncargadoEventoComponent,
  ],
})
export class RolEncargadoEventoModule { }
