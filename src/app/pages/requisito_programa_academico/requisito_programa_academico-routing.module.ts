import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoProgramaAcademicoComponent } from './requisito_programa_academico.component';
import { ListRequisitoProgramaAcademicoComponent } from './list-requisito_programa_academico/list-requisito_programa_academico.component';
import { CrudRequisitoProgramaAcademicoComponent } from './crud-requisito_programa_academico/crud-requisito_programa_academico.component';

const routes: Routes = [{
  path: '',
  component: RequisitoProgramaAcademicoComponent,
  children: [{
    path: 'list-requisito_programa_academico',
    component: ListRequisitoProgramaAcademicoComponent,
  }, {
    path: 'crud-requisito_programa_academico',
    component: CrudRequisitoProgramaAcademicoComponent,
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

export class RequisitoProgramaAcademicoRoutingModule { }

export const routedComponents = [
  RequisitoProgramaAcademicoComponent,
  ListRequisitoProgramaAcademicoComponent,
  CrudRequisitoProgramaAcademicoComponent,
];
