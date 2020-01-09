import { RequisitoProgramaRoutingModule, routedComponents } from './requisito_programa-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EvaluacionInscripcionService } from '../../@core/data/evaluacion_inscripcion.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRequisitoProgramaComponent } from './crud-requisito_programa/crud-requisito_programa.component';

@NgModule({
  imports: [
    ThemeModule,
    RequisitoProgramaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EvaluacionInscripcionService,
    ProgramaOikosService,
    CoreService,
  ],
  exports: [
    CrudRequisitoProgramaComponent,
  ],
})
export class RequisitoProgramaModule { }
