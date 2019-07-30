import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionComponent } from './inscripcion.component';
import { ListInscripcionComponent } from './list-inscripcion/list-inscripcion.component';
import { CrudInscripcionComponent } from './crud-inscripcion/crud-inscripcion.component';

const routes: Routes = [{
  path: '',
  component: InscripcionComponent,
  children: [{
    path: 'list-inscripcion',
    component: ListInscripcionComponent,
  }, {
    path: 'crud-inscripcion',
    component: CrudInscripcionComponent,
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

export class InscripcionRoutingModule { }

export const routedComponents = [
  InscripcionComponent,
  ListInscripcionComponent,
  CrudInscripcionComponent,
];
