import { ConfiguracionFechasRoutingModule, routedComponents } from './configuracion_fechas-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { EvaluacionInscripcionService } from '../../@core/data/evaluacion_inscripcion.service';
import { EventoService } from '../../@core/data/evento.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { CrudConfiguracionFechasComponent } from './crud-configuracion_fechas/crud-configuracion_fechas.component';

@NgModule({
  imports: [
    ThemeModule,
    ConfiguracionFechasRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
    EvaluacionInscripcionService,
    EventoService,
    ProgramaOikosService,
  ],
  exports: [
    CrudConfiguracionFechasComponent,
  ],
})
export class ConfiguracionFechasModule { }
