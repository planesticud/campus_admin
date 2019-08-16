import { EvaluacionInscripcionRoutingModule, routedComponents } from './evaluacion_inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RequisitoService } from '../../@core/data/requisito.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEvaluacionInscripcionComponent } from './crud-evaluacion_inscripcion/crud-evaluacion_inscripcion.component';

@NgModule({
  imports: [
    ThemeModule,
    EvaluacionInscripcionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    RequisitoService,
  ],
  exports: [
    CrudEvaluacionInscripcionComponent,
  ],
})
export class EvaluacionInscripcionModule { }
