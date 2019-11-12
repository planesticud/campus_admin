import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramaAcademicoComponent } from './programa_academico.component';
import { ListProgramaAcademicoComponent } from './list-programa_academico/list-programa_academico.component';
import { CrudProgramaAcademicoComponent } from './crud-programa_academico/crud-programa_academico.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ProgramaAcademicoComponent,
  children: [{
    path: 'list-programa_academico',
    component: ListProgramaAcademicoComponent,
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

export class ProgramaAcademicoRoutingModule { }

export const routedComponents = [
  ProgramaAcademicoComponent,
  ListProgramaAcademicoComponent,
  CrudProgramaAcademicoComponent,
];
