import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodoAcademicoComponent } from './periodo_academico.component';
import { ListPeriodoAcademicoComponent } from './list-periodo_academico/list-periodo_academico.component';
import { CrudPeriodoAcademicoComponent } from './crud-periodo_academico/crud-periodo_academico.component';



const routes: Routes = [{
  path: '',
  component: PeriodoAcademicoComponent,
  children: [{
    path: 'list-periodo_academico',
    component: ListPeriodoAcademicoComponent,
  }, {
    path: 'crud-periodo_academico',
    component: CrudPeriodoAcademicoComponent,
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

export class PeriodoAcademicoRoutingModule { }

export const routedComponents = [
  PeriodoAcademicoComponent,
  ListPeriodoAcademicoComponent,
  CrudPeriodoAcademicoComponent,
];
