import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluacionInscripcionComponent } from './evaluacion_inscripcion.component';
import { ListEvaluacionInscripcionComponent } from './list-evaluacion_inscripcion/list-evaluacion_inscripcion.component';
import { CrudEvaluacionInscripcionComponent } from './crud-evaluacion_inscripcion/crud-evaluacion_inscripcion.component';

const routes: Routes = [{
  path: '',
  component: EvaluacionInscripcionComponent,
  children: [{
    path: 'list-evaluacion_inscripcion',
    component: ListEvaluacionInscripcionComponent,
  }, {
    path: 'crud-evaluacion_inscripcion',
    component: CrudEvaluacionInscripcionComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class EvaluacionInscripcionRoutingModule { }

export const routedComponents = [
  EvaluacionInscripcionComponent,
  ListEvaluacionInscripcionComponent,
  CrudEvaluacionInscripcionComponent,
];
