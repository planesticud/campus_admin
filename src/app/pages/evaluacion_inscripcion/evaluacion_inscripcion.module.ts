import { EvaluacionInscripcionRoutingModule, routedComponents } from './evaluacion_inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RequisitoService } from '../../@core/data/requisito.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEvaluacionInscripcionComponent } from './crud-evaluacion_inscripcion/crud-evaluacion_inscripcion.component';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { EnteService } from '../../@core/data/ente.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { PersonaService } from '../../@core/data/persona.service';

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
    InscripcionService,
    CampusMidService,
    EnteService,
    PersonaService,
  ],
  exports: [
    CrudEvaluacionInscripcionComponent,
  ],
})
export class EvaluacionInscripcionModule { }
