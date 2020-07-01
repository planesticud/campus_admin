import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoProgramaAcademicoComponent } from './requisito_programa_academico.component';
import { ListRequisitoProgramaAcademicoComponent } from './list-requisito_programa_academico/list-requisito_programa_academico.component';
import { CrudRequisitoProgramaAcademicoComponent } from './crud-requisito_programa_academico/crud-requisito_programa_academico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RequisitoProgramaAcademicoComponent,
  children: [{
    path: 'list-requisito_programa_academico',
    component: ListRequisitoProgramaAcademicoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
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
