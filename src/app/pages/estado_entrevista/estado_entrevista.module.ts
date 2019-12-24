import { EstadoEntrevistaRoutingModule, routedComponents } from './estado_entrevista-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EvaluacionInscripcionService } from '../../@core/data/evaluacion_inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEstadoEntrevistaComponent } from './crud-estado_entrevista/crud-estado_entrevista.component';

@NgModule({
  imports: [
    ThemeModule,
    EstadoEntrevistaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EvaluacionInscripcionService,
  ],
  exports: [
    CrudEstadoEntrevistaComponent,
  ],
})
export class EstadoEntrevistaModule { }
