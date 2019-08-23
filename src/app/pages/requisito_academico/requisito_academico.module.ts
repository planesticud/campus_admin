import { RequisitoAcademicoRoutingModule, routedComponents } from './requisito_academico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EvaluacionInscripcionService } from '../../@core/data/evaluacion_inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRequisitoAcademicoComponent } from './crud-requisito_academico/crud-requisito_academico.component';

@NgModule({
  imports: [
    ThemeModule,
    RequisitoAcademicoRoutingModule,
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
    CrudRequisitoAcademicoComponent,
  ],
})
export class RequisitoAcademicoModule { }
