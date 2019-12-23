import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConceptoAcademicoComponent } from './concepto_academico.component';
import { ListConceptoAcademicoComponent } from './list-concepto_academico/list-concepto_academico.component';
import { CrudConceptoAcademicoComponent } from './crud-concepto_academico/crud-concepto_academico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ConceptoAcademicoComponent,
  children: [{
    path: 'list-concepto_academico',
    component: ListConceptoAcademicoComponent,
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

export class ConceptoAcademicoRoutingModule { }

export const routedComponents = [
  ConceptoAcademicoComponent,
  ListConceptoAcademicoComponent,
  CrudConceptoAcademicoComponent,
];
