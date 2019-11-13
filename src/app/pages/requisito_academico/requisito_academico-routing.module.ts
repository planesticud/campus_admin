import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoAcademicoComponent } from './requisito_academico.component';
import { ListRequisitoAcademicoComponent } from './list-requisito_academico/list-requisito_academico.component';
import { CrudRequisitoAcademicoComponent } from './crud-requisito_academico/crud-requisito_academico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RequisitoAcademicoComponent,
  children: [{
    path: 'list-requisito_academico',
    component: ListRequisitoAcademicoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
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

export class RequisitoAcademicoRoutingModule { }

export const routedComponents = [
  RequisitoAcademicoComponent,
  ListRequisitoAcademicoComponent,
  CrudRequisitoAcademicoComponent,
];
