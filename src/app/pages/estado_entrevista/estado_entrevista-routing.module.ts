import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoEntrevistaComponent } from './estado_entrevista.component';
import { ListEstadoEntrevistaComponent } from './list-estado_entrevista/list-estado_entrevista.component';
import { CrudEstadoEntrevistaComponent } from './crud-estado_entrevista/crud-estado_entrevista.component';



const routes: Routes = [{
  path: '',
  component: EstadoEntrevistaComponent,
  children: [{
    path: 'list-estado_entrevista',
    component: ListEstadoEntrevistaComponent,
  }, {
    path: 'crud-estado_entrevista',
    component: CrudEstadoEntrevistaComponent,
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

export class EstadoEntrevistaRoutingModule { }

export const routedComponents = [
  EstadoEntrevistaComponent,
  ListEstadoEntrevistaComponent,
  CrudEstadoEntrevistaComponent,
];
