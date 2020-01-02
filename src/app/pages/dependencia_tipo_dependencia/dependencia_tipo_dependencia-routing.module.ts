import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DependenciaTipoDependenciaComponent } from './dependencia_tipo_dependencia.component';
import { ListDependenciaTipoDependenciaComponent } from './list-dependencia_tipo_dependencia/list-dependencia_tipo_dependencia.component';
import { CrudDependenciaTipoDependenciaComponent } from './crud-dependencia_tipo_dependencia/crud-dependencia_tipo_dependencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: DependenciaTipoDependenciaComponent,
  children: [{
    path: 'list-dependencia_tipo_dependencia',
    component: ListDependenciaTipoDependenciaComponent,
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

export class DependenciaTipoDependenciaRoutingModule { }

export const routedComponents = [
  DependenciaTipoDependenciaComponent,
  ListDependenciaTipoDependenciaComponent,
  CrudDependenciaTipoDependenciaComponent,
];
