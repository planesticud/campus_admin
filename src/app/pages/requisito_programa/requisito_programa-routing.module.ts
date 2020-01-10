import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoProgramaComponent } from './requisito_programa.component';
import { ListRequisitoProgramaComponent } from './list-requisito_programa/list-requisito_programa.component';
import { CrudRequisitoProgramaComponent } from './crud-requisito_programa/crud-requisito_programa.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: RequisitoProgramaComponent,
  children: [{
    path: 'list-requisito_programa',
    component: ListRequisitoProgramaComponent,
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

export class RequisitoProgramaRoutingModule { }

export const routedComponents = [
  RequisitoProgramaComponent,
  ListRequisitoProgramaComponent,
  CrudRequisitoProgramaComponent,
];
