import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoInscripcionComponent } from './estado_inscripcion.component';
import { ListEstadoInscripcionComponent } from './list-estado_inscripcion/list-estado_inscripcion.component';
import { CrudEstadoInscripcionComponent } from './crud-estado_inscripcion/crud-estado_inscripcion.component';

const routes: Routes = [{
  path: '',
  component: EstadoInscripcionComponent,
  children: [{
    path: 'list-estado_inscripcion',
    component: ListEstadoInscripcionComponent,
  }, {
    path: 'crud-estado_inscripcion',
    component: CrudEstadoInscripcionComponent,
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

export class EstadoInscripcionRoutingModule { }

export const routedComponents = [
  EstadoInscripcionComponent,
  ListEstadoInscripcionComponent,
  CrudEstadoInscripcionComponent,
];
