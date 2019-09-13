import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignarEntrevistaComponent } from './asignar_entrevista.component';
import { ListAsignarEntrevistaComponent } from './list-asignar_entrevista/list-asignar_entrevista.component';
import { CrudAsignarEntrevistaComponent } from './crud-asignar_entrevista/crud-asignar_entrevista.component';



const routes: Routes = [{
  path: '',
  component: AsignarEntrevistaComponent,
  children: [{
    path: 'list-asignar_entrevista',
    component: ListAsignarEntrevistaComponent,
  }, {
    path: 'crud-asignar_entrevista',
    component: CrudAsignarEntrevistaComponent,
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

export class AsignarEntrevistaRoutingModule { }

export const routedComponents = [
  AsignarEntrevistaComponent,
  ListAsignarEntrevistaComponent,
  CrudAsignarEntrevistaComponent,
];
