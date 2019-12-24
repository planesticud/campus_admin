import { TipoEntrevistaRoutingModule, routedComponents } from './tipo_entrevista-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EvaluacionInscripcionService } from '../../@core/data/evaluacion_inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoEntrevistaComponent } from './crud-tipo_entrevista/crud-tipo_entrevista.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoEntrevistaRoutingModule,
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
    CrudTipoEntrevistaComponent,
  ],
})
export class TipoEntrevistaModule { }
